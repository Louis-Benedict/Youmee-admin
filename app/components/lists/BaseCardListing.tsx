'use client'

import { ComponentType, ReactElement, useRef } from 'react'
import ListingHeader from './Header/ListingHeader'
import { cn } from '@/app/libs/util'
import React from 'react'
import useSmoothScroll from '@/app/utils/hooks/useSmoothScroll'

export type DataWithId = {
    id: string
}

interface BaseCardListingProps<TItem extends DataWithId> {
    title: string
    overflow: boolean
    layout: 'row' | 'grid'
    width?: string
    shrink?: boolean
    overwriteClassName?: string
    items: TItem[]
    header?: boolean
    CardComponent: ComponentType<TItem>
    lastComponent?: ReactElement
    onLastComponentClick?: VoidFunction
}

const BaseCardListing = <TItem extends DataWithId>({
    title,
    overflow,
    header = true,
    width = 'w-auto',
    shrink = false,
    overwriteClassName,
    layout,
    items,
    CardComponent,
    lastComponent,
    onLastComponentClick,
}: BaseCardListingProps<TItem>) => {
    const sizeRef = useRef<HTMLDivElement>(null)

    const { sliderRef, slideLeft, slideRight } = useSmoothScroll(
        items.length,
        sizeRef
    )

    return (
        <div ref={sizeRef}>
            {header && (
                <ListingHeader
                    title={title}
                    onSlideLeft={slideLeft}
                    onSlideRight={slideRight}
                />
            )}
            <div>
                {items && items.length > 0 ? (
                    <div
                        ref={sliderRef}
                        className={cn(
                            layout == 'row' && `flex`,
                            overflow &&
                                layout == 'row' &&
                                `overflow-x-scroll scrollbar-hide`,
                            layout == 'grid' &&
                                'grid mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ',
                            'w-full'
                        )}
                    >
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    width,
                                    !shrink && 'shrink-0',
                                    ' mr-[10px]'
                                )}
                            >
                                <CardComponent
                                    {...item}
                                    className={overwriteClassName}
                                />
                            </div>
                        ))}
                        {lastComponent && (
                            <div
                                onClick={onLastComponentClick}
                                className={cn(
                                    width,
                                    !shrink && 'shrink-0',
                                    ' mr-[10px]'
                                )}
                            >
                                {lastComponent}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-secondary-font-dark">
                        No {title} found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default BaseCardListing
