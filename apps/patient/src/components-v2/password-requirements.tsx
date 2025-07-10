import { ConfigurationResponse } from '@psychplus-v2/types'
import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, XIcon } from 'lucide-react'
import { useValidateNewPassword } from '@/hooks'

interface PasswordRequirementsProps {
  newPassword: string
  confirmPassword: string
  configuration?: ConfigurationResponse
}

const PasswordRequirements = ({
  newPassword,
  confirmPassword,
  configuration,
}: PasswordRequirementsProps) => {
  const passwordValidationConfig = configuration?.configuration?.find(
    (item) => item.tag === 'passwordValidation',
  )

  const helpLines = passwordValidationConfig?.helpLines || []
  const helpLineRegex = passwordValidationConfig?.helpLineExtraData || []

  const {
    passwordsMatch,
    validationResults,
  } = useValidateNewPassword({
    newPassword,
    confirmPassword,
    helpLineRegex,
  })

  return (
    <Flex direction="column" gap="1">
      {helpLines.map((line, index) => {
        const satisfied = validationResults[index]
        return (
          <PasswordRequirement key={line} satisfied={satisfied}>
            {line}
          </PasswordRequirement>
        )
      })}

      <PasswordRequirement satisfied={passwordsMatch}>
        Your new & confirmation passwords must match
      </PasswordRequirement>
    </Flex>
  )
}



const PasswordRequirement = ({
  satisfied,
  children,
}: React.PropsWithChildren<{ satisfied: boolean }>) => (
  <Flex align={{ initial: 'start', sm: 'center' }} gap="2">
    {satisfied ? (
      <CheckIcon color="green" width={16} height={16} />
    ) : (
      <XIcon color="tomato" width={16} height={16} />
    )}
    <Text weight="medium" className="text-[13px] sm:text-[15px]">
      {children}
    </Text>
  </Flex>
)

export { PasswordRequirements }
