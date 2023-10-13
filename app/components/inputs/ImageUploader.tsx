'use client';

import { useState, type ChangeEvent, useEffect, FC, useRef } from 'react';
import { validateFileTypeImage } from '@/app/libs/validation/validateFileType';
import {
	ChangeHandler,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import { concatUrl } from '@/app/config/s3';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Button from '../ui/Button/BaseButton';

interface FileWithUrl {
	name: string;
	getUrl: string;
	size: number;
	error?: boolean | undefined;
}

export interface ImageUploaderProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
	defaultImage: string;
	id: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
	className,
	id,
	defaultImage,
	register,
	setValue,
	...props
}) => {
	const [selectedImage, setSelectedImage] = useState<File>();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { ref, onChange, ...rest } = register(id);

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement>,
		callbackToForm: ChangeHandler
	) => {
		if (e.target.files && e.target.files[0]) {
			const valid = validateFileTypeImage(e.target.files[0]);
			if (!valid) {
				toast('Invalid File Type');
				return;
			}
			setSelectedImage(e.target.files[0]);
		}
		callbackToForm(e);
	};

	useEffect(() => {
		if (selectedImage) {
			setValue(id, selectedImage, {
				shouldDirty: true,
				shouldTouch: true,
				shouldValidate: true,
			});
		}
	}, [selectedImage]);

	const handleClickforInput = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		inputRef.current?.click();
	};

	return (
		<div>
			<div className='flex flex-col gap-2 items-center md:items-start'>
				<div className='bg-cover'>
					<div className=' w-full h-full '>
						<Image
							className='rounded-xl min-w-[180px] aspect-square object-cover'
							width={180}
							height={180}
							src={
								selectedImage
									? URL.createObjectURL(selectedImage)
									: defaultImage
							}
							alt='User Image Preview'
						/>
					</div>
					<input
						id={id}
						{...props}
						{...rest}
						ref={(e) => {
							ref(e);
							inputRef.current = e;
						}}
						onChange={(e) => handleInputChange(e, onChange)}
						accept='image/png, image/jpeg'
						type='file'
						className='hidden'
					/>
				</div>
				<Button
					maxWidth
					small
					outline
					label='Upload'
					onClick={handleClickforInput}
				/>
			</div>
		</div>
	);
};

export default ImageUploader;
