import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { ClientCategory } from '@/app/types'
import { Tv } from 'lucide-react'

interface Props extends ClientCategory {}

const CategoryCard: FC<Props> = ({ id, label, slug, plural, color }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(slug)}
            className={`w-[180px] h-[180px] group shrink-0 mx-3 my-2 rounded-full dark:bg-${color} bg-white shadow-lg`}
        >
            <div className="h-full cursor-pointer overflow-hidden top-0 relative flex flex-col items-center w-full">
                <div className="aspect-square w-full relative overflow-hidden flex flex-col justify-center">
                    <div className="mx-auto">
                        <Tv
                            size={60}
                            className="dark:text-neutral-500 text-primary-dark"
                        />
                    </div>
                    <div
                        className={`absolute bottom-2 left-4 flex text-md w-full font-bold dark:text-white text-primary-dark`}
                    >
                        {plural}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
