'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Heading from '../ui/Heading'
import RadioButtonGroup from '../inputs/RadioButtonGroup'
import RadioButton from '../inputs/RadioButton'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    EnrollAsCreatorSchema,
    enrollAsCreatorSchema,
} from '@/app/libs/validation/authValidation'
import { useForm } from 'react-hook-form'
import CountryInput from '../inputs/CountryInput'
import PageInput from '../inputs/PageInput'
import Button from '../ui/Button/BaseButton'
import TextArea from '../inputs/TextArea'
import SocialMediaInput from '../inputs/SocialMediaInput'
import { MessageCircle } from 'lucide-react'
import axios from 'axios'
import { toast } from '../ui/toast'
import { toastMessages } from '@/app/static/toastMessages'

const EnrollAsCreatorForm = ({}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const {
        register,
        formState: { errors, isDirty, isSubmitSuccessful },
        handleSubmit,
    } = useForm<EnrollAsCreatorSchema>({
        resolver: zodResolver(enrollAsCreatorSchema),
    })

    const onSubmit: SubmitHandler<EnrollAsCreatorSchema> = (data) => {
        setIsLoading(true)
        axios
            .post('/api/enroll', data)
            .then(() => {
                setIsSubmitted(true)
            })
            .catch(() => {
                toast(toastMessages.requestSent.error)
            })
    }

    return (
        <div className="dark:text-white text-primary-dark flex flex-col md:w-1/3 md:min-w-[400px] gap-8 p-4 md:p-0 ">
            {!isSubmitted ? (
                <>
                    <Heading
                        title="Join the youmee creator community"
                        subtitle="We will review your request and get in touch with you as soon as possible."
                    />

                    <div className="flex flex-col gap-8">
                        {/* <RadioButtonGroup
							className='flex flex-row'
							register={register}
							errors={errors}
							group='gender'>
							<RadioButton
								label='He/Him'
								id='he'
								value='he'
							/>
							<RadioButton
								label='Her/She'
								id='she'
								value='she'
							/>
							<RadioButton
								label='They/Them'
								id='neutral'
								value='neutral'
							/>
						</RadioButtonGroup> */}
                        <PageInput
                            id="fullname"
                            label="Full name"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <CountryInput
                            register={register}
                            errors={errors}
                            isLoading={isLoading}
                            label="Country"
                            defaultValue="Thailand"
                            id="country"
                        />
                        <PageInput
                            id="email"
                            label="Email"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <PageInput
                            id="alias"
                            label="Alias"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <PageInput
                            id="phoneNumber"
                            label="Phone number"
                            type="phone"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <SocialMediaInput
                            id="following"
                            label="Where is your largest following?"
                            isLoading={isLoading}
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            options={[
                                'Instagram',
                                'Facebook',
                                'Weibo',
                                'TikTok',
                                'Twitter',
                                'Youtube',
                            ]}
                        />
                        <PageInput
                            id="socialMediaHandle"
                            label="Social Media Handle"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <TextArea
                            id="info"
                            label="Tell us something about you"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            placeholder=""
                        />
                    </div>
                    <hr className="border-[1px] border-neutral-800" />
                    <div className="text-xs text-neutral-500">
                        By applying to enroll as talent on Youmee, you agree to
                        Youmees Talent Terms of Service and Privacy Policy
                    </div>
                    <div className="flex flex-col gap-2  justify-end">
                        <Button
                            small
                            disabled={!isDirty}
                            label="Enroll"
                            onClick={handleSubmit(onSubmit)}
                            className="justify-end"
                        />
                    </div>
                </>
            ) : (
                <div className="text-neutral-400 flex flex-col items-center gap-3">
                    <MessageCircle size={100} />
                    <div className="text-sm text-center">
                        Thank you for submitting. <br />
                        The Youmee team will be in touch with you shortly.
                    </div>
                </div>
            )}
        </div>
    )
}

export default EnrollAsCreatorForm
