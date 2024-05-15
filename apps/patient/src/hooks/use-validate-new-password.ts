const useValidateNewPassword = ({
  newPassword,
  confirmPassword,
}: {
  newPassword: string
  confirmPassword: string
}) => {
  const passwordMinLength = newPassword.length >= 8
  const passwordsMatch = newPassword === confirmPassword
  const oneUppercaseLetter = /[A-Z]/.test(newPassword)
  const oneLowercaseLetter = /[a-z]/.test(newPassword)
  const oneNumber = /[0-9]/.test(newPassword)
  // eslint-disable-next-line no-useless-escape
  const oneSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    newPassword,
  )

  return {
    isValid:
      passwordMinLength &&
      passwordsMatch &&
      oneUppercaseLetter &&
      oneLowercaseLetter &&
      oneNumber &&
      oneSpecialCharacter,
    validation: {
      passwordMinLength,
      passwordsMatch,
      oneUppercaseLetter,
      oneLowercaseLetter,
      oneSpecialCharacter,
      oneNumber,
    },
  }
}

export { useValidateNewPassword }
