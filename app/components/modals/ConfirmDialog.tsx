import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { FC, ReactNode } from 'react'

interface ConfirmDialogProps {
    isOpen: boolean
    primaryAction: VoidFunction
    description: string
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
    isOpen,
    primaryAction,
    description,
}) => {
    return (
        <AlertDialog.Root open={isOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Are you absolutely sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        {description}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <button>Cancel</button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={primaryAction}>
                                Yes, delete account
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default ConfirmDialog
