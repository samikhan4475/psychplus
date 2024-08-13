function calculateAge(birthday: string | undefined) {
  if (!birthday) {
    return ''
  }
  const birthDate = new Date(birthday)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  const dayDifference = today.getDate() - birthDate.getDate()

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--
  }

  return age
}

const getFormatedDate = (date: Date | undefined) => {
  const currentDate = date ?? new Date()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  return `${currentDate.getFullYear()}-${month}-${day}`
}

export { calculateAge, getFormatedDate }
