'use client'

import useAddEnrolleeModal from './useEnrolleeModal'
import { useCallback, useRef } from 'react'
import { useAddEnrollee } from '@/app/(dashboard)/enrollees/queries'
import RModal from '../RModal'
import AddEnrolleeForm, { FormHandle } from './AddEnrolleeForm'

const AddEnrolleeModal = () => {
    const formRef = useRef<FormHandle>(null)
    const addEnrolleeModal = useAddEnrolleeModal()
    const { isLoading: adding } = useAddEnrollee()

    const onSubmitForm = useCallback(() => {
        if (!formRef.current) return
        formRef.current.submit()
    }, [formRef])

    return (
        <RModal
            isOpen={addEnrolleeModal.isOpen}
            isLoading={adding}
            disabled={adding}
            title="Add Enrollee"
            subtitle=" New enrollees will be sent an email that activates their account"
            body={<AddEnrolleeForm ref={formRef} />}
            secondaryActionLabel="Cancel"
            secondaryAction={addEnrolleeModal.onClose}
            primaryActionLabel="Submit"
            primaryAction={onSubmitForm}
        />
    )
}

export default AddEnrolleeModal
