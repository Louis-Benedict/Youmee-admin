import { FC } from 'react';
import Image from 'next/image';

interface AvatarProps {
	size?: number;
	url?: string;
	semi?: boolean;
}

const Avatar: FC<AvatarProps> = ({ size, url, semi }) => {
	return (
		<div
			className={`overflow-hidden aspect-square object-cover min-w-[35px] min-h-[35px]`}>
			<Image
				className={
					semi
						? 'rounded-md  object-cover h-full aspect-square'
						: 'h-full object-cover rounded-full'
				}
				height={size ? size : 35}
				width={size ? size : 35}
				alt='Avatar'
				src={url ? url : '/images/placeholder.jpg'}
			/>
		</div>
	);
};

export default Avatar;
