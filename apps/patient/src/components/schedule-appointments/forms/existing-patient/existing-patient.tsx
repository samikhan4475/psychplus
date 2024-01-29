import { Box, Text } from '@radix-ui/themes'
import { LoginForm } from '@psychplus/auth/login'
import { usePubsub } from '@psychplus/utils/event'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { getLoginRedirectUrl } from '@/widgets/schedule-appointment-list/utils'

const displayLoginForm = false

const ExistingPatient = () => {
  const { publish } = usePubsub()

  return (
    <Box mt="3">
      {displayLoginForm ? (
        <LoginForm
          inputClassName="h-[56px] rounded-6 px-4 text-2 font-light"
          buttonClassName="h-[64px] w-[164px] rounded-[32px] bg-[#151B4A] text-4 font-medium"
          redirect="/dashboard"
          showCaptcha={false}
          hideRememberMe
          hideForgotPassword
        />
      ) : (
        <Text as="p" size="5" className="pt-5 font-regular">
          To login please,{' '}
          <a
            className="font-bold"
            href={'#'}
            onClick={() => {
              publish(`${SCHEDULE_APPOINTMENT_LIST}:existing-login`, {
                url: getLoginRedirectUrl(),
              })
            }}
          >
            click here
          </a>
        </Text>
      )}
    </Box>
  )
}

export { ExistingPatient }
