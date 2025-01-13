import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { submitForgotPasswordAction } from '@/actions'

const ResendButton = ({ email }: { email: string }) => {
  const [resendLoading, setResendLoading] = useState(false)

  const onResendCode = async () => {
    setResendLoading(true)
    const response = await submitForgotPasswordAction({
      emailAddress: email,
    })

    setResendLoading(false)
    if (response?.state === 'error') {
      toast.error(response.error)
      return
    }

    toast.success(response.data.message)
  }

  return (
    <Button
      onClick={onResendCode}
      className="text-pp-text-primary-base bg-white text-[12px] font-[500] underline [box-shadow:none]"
      size="1"
      variant="outline"
      loading={resendLoading}
    >
      Resend Code
    </Button>
  )
}

export { ResendButton }
