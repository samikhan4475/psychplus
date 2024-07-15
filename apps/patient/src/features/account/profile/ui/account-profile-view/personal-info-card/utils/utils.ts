const getBirthyear = (dateOfBirth: string) => {
  const currentDate = new Date()
  const dob = new Date(dateOfBirth)

  const ageInYears = currentDate.getFullYear() - dob.getFullYear()

  return ageInYears
}

export { getBirthyear }
