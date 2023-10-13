type ToastMessage<T> = {
    version: {
        title: string
        message: string
        type: string
    }
}

interface ToastOpts {
    title?: string
    message: string
    type?: 'success' | 'error' | 'default'
    duration?: number
    position?: string
}

export const toastMessages = {
    profileUpdated: {
        success: {
            title: 'Success',
            message: 'Your profile has been updated.',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Your profile could not be updated',
            type: 'error',
        } as ToastOpts,
    },
    requestSent: {
        success: {
            title: 'Success',
            message: 'Your request has been sent.',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Your request could not be sent',
            type: 'error',
        } as ToastOpts,
    },
    loggedIn: {
        success: {
            title: 'Success',
            message: 'You are logged in now.',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
        } as ToastOpts,
    },
    register: {
        success: {
            title: 'Account created',
            message: 'We sent you an email to: ',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'We could not create an Account',
            type: 'error',
        } as ToastOpts,
    },
    orderCancelled: {
        success: {
            title: 'Success',
            message: 'You have cancelled the order',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
        } as ToastOpts,
    },
    orderCreated: {
        success: {
            title: 'Success',
            message: 'Order created',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
        } as ToastOpts,
    },
    reviewCreated: {
        success: {
            title: 'Success',
            message: 'Review created',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
        } as ToastOpts,
    },
    videoUploaded: {
        success: {
            title: 'Success',
            message: 'Your video has been uploaded',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
        } as ToastOpts,
    },
    userPromoted: {
        success: {
            title: 'Success',
            message: 'The user has been promoted',
            type: 'success',
        } as ToastOpts,
        error: {
            title: 'Error',
            message: 'There was an error promoting the user',
            type: 'error',
        } as ToastOpts,
    },
    capture: {
        error: {
            title: 'Error',
            message: 'We could not start your capturing device',
            type: 'error',
        } as ToastOpts,
    },
    emailTaken: {
        error: {
            title: 'Email Taken',
            message: 'This email is already associated with an account.',
            type: 'error',
        } as ToastOpts,
    },
}
