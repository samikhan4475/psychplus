const useValidateNewPassword = ({
  newPassword,
  confirmPassword,
  helpLineRegex = [],
}: {
  newPassword: string
  confirmPassword: string
  helpLineRegex?: string[]
}) => {
  const passwordsMatch = newPassword === confirmPassword

  const regexValidations = helpLineRegex.map((regexStr,index) => {
    if (!regexStr && index === 0) {
      return newPassword.length >= 8 && newPassword.length <= 256
    }
    if (!regexStr) return true
    try {
      const regex = new RegExp(regexStr)
      return regex.test(newPassword)
    } catch {
      return false // Handle malformed regex gracefully
    }
  })

  const allRegexValid = regexValidations.every(Boolean)

  return {
    isValid: allRegexValid && passwordsMatch,
    validationResults: regexValidations,
    passwordsMatch,
  }
}

export { useValidateNewPassword }