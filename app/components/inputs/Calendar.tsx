'use client'

import useClickOutside from '@/app/hooks/useOutsideClick'
import { cn } from '@/app/utils/util'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { DefinedRange, Range, RangeKeyDict } from 'react-date-range'

interface DatePickerProps {
    value: Range

    onChange: (value: RangeKeyDict) => void
}

const DateRangePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <div className="relative" ref={ref}>
            <div
                className="border rounded-lg border-neutral-800 items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="p-2 text-neutral-300 text-[12px] flex flex-row items-center">
                    <div>{`${value.startDate?.toLocaleDateString()} - ${value.endDate?.toLocaleDateString()}`}</div>
                    <ChevronDown size={20} />
                </div>
            </div>
            <div className="absolute top-10 z-50">
                <DefinedRange
                    className={cn(isOpen ? 'block' : 'hidden', ' z-50')}
                    rangeColors={['#555555']}
                    ranges={[value]}
                    onChange={onChange}
                    inputRanges={[]}
                />
            </div>
        </div>
    )
}

export default DateRangePicker
