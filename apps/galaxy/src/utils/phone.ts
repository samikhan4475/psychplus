const sanitizePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, '')
}

export { sanitizePhoneNumber }
