'use client';

import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { Icon, Loader2 } from 'lucide-react';

interface DownloadButtonProps extends HTMLAttributes<HTMLDivElement> {
	downloadLabel: string;
	href: string;
	icon?: Icon;
	isLoading?: boolean;
}

const DownloadButton = forwardRef<HTMLDivElement, DownloadButtonProps>(
	({ downloadLabel, href, isLoading, icon: Icon }, ref) => {
		const [disabled, setDisabled] = useState(false);

		useEffect(() => {
			if (href.length == 0) {
				setDisabled(true);
			} else {
				setDisabled(false);
			}
		}, [href]);

		const download = (content: string) => {
			var element = document.createElement('a');
			element.setAttribute('href', content);
			element.setAttribute(
				'download',
				`${downloadLabel.replace(' ', '_')}_Youmee`
			);
			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		};

		const handleDownload = async () => {
			try {
				const result = await fetch(href, {
					method: 'GET',
				});
				const blob = await result.blob();
				const url = URL.createObjectURL(blob);
				download(url);
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error(error);
			}
		};
		return (
			<div
				ref={ref}
				onClick={handleDownload}
				className={`
                    ${disabled && 'cursor-not-allowed opacity-50'}
                                relative
                                w-full
                                dark:text-white text-primary-dark
                                'font-semibold'
                                'dark:text-white text-primary-dark'
                                rounded-lg
                                hover:opacity-70
                                transition
                                bg-transparent 
                                border-[#242424]
                                text-sm 
                                font-semi-bold
                                p-2
                                justify-center
                                cursor-pointer
                                max-h-[40px]
                                border-[2px]
                                flex flex-row
                              
                            `}>
				<div className='flex flex-row justify-center'>
					{Icon && (
						<Icon
							size={18}
							className='inline mr-2 mt-[2px]'
						/>
					)}
					{isLoading && (
						<Loader2
							size={24}
							className='inline animate-spin'
						/>
					)}
				</div>
				Download
			</div>
		);
	}
);

DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;
