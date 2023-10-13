import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { ClientUser } from '@/app/types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
	userId: string;
	currentUser?: ClientUser | null;
}

const useFavorite = ({ userId, currentUser }: IUseFavorite) => {
	const router = useRouter();

	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(userId);
	}, [currentUser, userId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/user/favorites/${userId}`);
				} else {
					request = () => axios.post(`/api/user/favorites/${userId}`);
				}

				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong.');
			}
		},
		[currentUser, hasFavorited, userId, loginModal, router]
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
