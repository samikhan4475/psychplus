import { Box, Text } from '@radix-ui/themes'
import { LoginForm } from '@psychplus/auth/login'
import { usePubsub } from '@psychplus/utils/event'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { getLoginRedirectUrl } from '@/widgets/schedule-appointment-list/utils'

const displayLoginForm = false

const ExistingPatient = () => {
  const { publish } = usePubsub()

  const onLoginClick = () => {
    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:existing-login`, {
      url: getLoginRedirectUrl(),
    })
  }

  return (
    <Box mt="3">
      {displayLoginForm ? (
        <LoginForm
          basePath=""
          inputClassName="h-[56px] rounded-6 px-4 text-2 font-light"
          buttonClassName="h-[64px] w-[164px] rounded-[32px] bg-[#151B4A] text-4 font-medium"
          redirect="/dashboard"
          showCaptcha={false}
          hideRememberMe
          hideForgotPassword
        />
      ) : (
        <Text as="p" size="5" className="pt-5 font-regular">
          To login, please{' '}
          <a
            className="cursor-pointer font-bold hover:underline"
            onClick={onLoginClick}
          >
            click here
          </a>
        </Text>
      )}
    </Box>
  )
}

export { ExistingPatient }
