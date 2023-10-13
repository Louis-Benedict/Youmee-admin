import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ClientCategory } from '@/app/types'

interface CardProps {
    category: ClientCategory
}

const CategoryCardSmall: FC<CardProps> = ({ category }) => {
    const router = useRouter()
    return (
        <>
            <div
                onClick={() =>
                    router.push(`/browse/${category.label.toLowerCase()}`)
                }
                className="md:min-w-auto md:min-h-auto flex md:min-w-[auto] group"
            >
                <div className="h-full bg-clip-content bg-transparent cursor-pointer overflow-hidden top-0 relative">
                    {/* <div className="aspect-square w-full1 relative overflow-hidden rounded-xl max-w-[60px] max-h-[60px]">
                        <Image
                            width={60}
                            height={60}
                            className="
						  object-cover 
						  h-full 
						  w-full 
						  transition
						  group-hover:scale-110 
						  aspect-square
						"
                            src={category}
                            alt="Listing"
                        />
                    </div> */}
                    <div
                        className="
						relative text-left
                        w-full 
						text-[12px]
						font-bold
                        dark:text-white text-primary-dark
					  "
                    >
                        {category.plural}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCardSmall
