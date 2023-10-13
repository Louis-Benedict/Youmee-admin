import { FC } from 'react';
import { Icon } from 'lucide-react';
import { cn } from '@/app/libs/util';

interface TagProps {
	label: string;
	Icon: Icon;
	transparent?: boolean;
	color?: string;
}

const Tag: FC<TagProps> = ({ color, transparent, label, Icon }) => {
	return (
		<div
			className={cn(
				'flex flex-row text-[12px] p-1 dark:bg-neutral-900 bg-light-secondary text-neutral-300  hover:dark:bg-primary-dark bg-white rounded-md w-fit box-border cursor-pointer',
				transparent && 'bg-transparent p-0'
			)}>
			<Icon
				size={14}
				strokeWidth={2}
				className={cn(
					'text-center mx-1 mt-[1px] fill-accent-dark text-accent-dark',
					color
				)}
			/>
			<div className=''>{label}</div>
		</div>
	);
};

export default Tag;
