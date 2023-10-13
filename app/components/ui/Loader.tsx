'use client';

import { Loader2 } from 'lucide-react';

const Loader = () => {
	return (
		<div
			className='
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
      z-50
    '>
			<Loader2
				size={80}
				className='animate-spin text-accent-dark'
			/>
		</div>
	);
};

export default Loader;
