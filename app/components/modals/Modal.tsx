'use client'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

import Button from '../ui/Button/BaseButton'
import useDocumentsUtils from '@/app/utils/hooks/useDocumentUtils'
import useClickOutside from '@/app/hooks/useOutsideClick'
import ModalButton from '../ui/Button/ModalButton'

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit?: () => void
    isLoading: boolean
    title?: string | ReactNode
    body?: React.ReactElement
    footer?: React.ReactElement
    actionLabel: string
    disabled?: boolean
    secondaryAction?: () => void
    secondaryActionLabel?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    isLoading,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen)
    const documentUtils = useDocumentsUtils()
    const clickOutsideRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setShowModal(isOpen)
            documentUtils.disableScroll()
        }
        documentUtils.enableScroll()
    }, [isOpen])

    useClickOutside([clickOutsideRef], () => handleClose())

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        documentUtils.enableScroll()
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [onClose, disabled])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }
        onSubmit?.()
        documentUtils.enableScroll()
    }, [onSubmit, disabled])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return
        }

        secondaryAction()
    }, [secondaryAction, disabled])

    if (!isOpen) {
        return null
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none bg-primary-dark bg-opacity-50 backdrop-blur-sm dark:text-white text-primary-dark">
            <div className="relative w-full md:w-3/6 lg:w-3/6 xl:w-[500px] my-6 mx-auto h-full lg:h-auto md:h-auto">
                <div
                    className={`translate duration-300 h-full
						${showModal ? 'translate-y-0' : 'translate-y-full'}
						${showModal ? 'opacity-100' : 'opacity-0'}
					`}
                >
                    <div
                        ref={clickOutsideRef}
                        className="translate h-full lg:h-auto md:h-auto border-0  rounded-md  shadow-lg  relative  flex  flex-col w-full dark:bg-secondary-dark bg-white/95  outline-none  focus:outline-none"
                    >
                        <div className="flex items-center p-6 rounded-t-md  relative">
                            <div className="text-2xl dark:text-white text-primary-dark font-bold">
                                {title}
                            </div>
                            <button
                                className="p-1 border-0 self-start hover:opacity-70 transition absolute right-4"
                                onClick={handleClose}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <hr />
                        <div className="mt-2 mb-6 relative px-6 flex-auto">
                            {body}
                        </div>
                        <hr />
                        <div className="flex flex-col p-6">
                            <div className="flex flex-row ml-auto gap-4">
                                {secondaryAction && secondaryActionLabel && (
                                    <ModalButton
                                        // disabled={disabled}
                                        label={secondaryActionLabel}
                                        onClick={secondaryAction}
                                        isLoading={isLoading}
                                        variant="secondary"
                                    />
                                )}
                                {onSubmit && actionLabel && (
                                    <div className="self-end">
                                        <ModalButton
                                            // disabled={disabled}
                                            label={actionLabel}
                                            onClick={handleSubmit}
                                            isLoading={isLoading}
                                        />
                                    </div>
                                )}
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
