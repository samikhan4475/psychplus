import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, XIcon } from 'lucide-react'
import { useValidateNewPassword } from '@/hooks'

interface PasswordRequirementsProps {
  newPassword: string
  confirmPassword: string
}

const PasswordRequirements = ({
  newPassword,
  confirmPassword,
}: PasswordRequirementsProps) => {
  const { validation } = useValidateNewPassword({
    newPassword,
    confirmPassword,
  })

  return (
    <Flex direction="column" gap="1">
      <PasswordRequirement satisfied={validation.passwordMinLength}>
        8 characters minimum
      </PasswordRequirement>
      <PasswordRequirement satisfied={validation.oneUppercaseLetter}>
        One uppercase letter
      </PasswordRequirement>
      <PasswordRequirement satisfied={validation.oneLowercaseLetter}>
        One lowercase letter
      </PasswordRequirement>
      <PasswordRequirement satisfied={validation.oneNumber}>
        One number
      </PasswordRequirement>
      <PasswordRequirement satisfied={validation.oneSpecialCharacter}>
        One special character e.g. !, @, #, $
      </PasswordRequirement>
      <PasswordRequirement satisfied={validation.passwordsMatch}>
        Your new & confirmation passwords must match
      </PasswordRequirement>
    </Flex>
  )
}

const PasswordRequirement = ({
  satisfied,
  children,
}: React.PropsWithChildren<{ satisfied: boolean }>) => (
  <Flex align="center" gap="2">
    {satisfied ? (
      <CheckIcon color="green" width={16} height={16} />
    ) : (
      <XIcon color="tomato" width={16} height={16} />
    )}
    <Text weight="medium" className="text-[15px]">
      {children}
    </Text>
  </Flex>
)

export { PasswordRequirements }
