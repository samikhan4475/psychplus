const truncateString = (str: string, length: number) =>
  str.length > length ? `${str.slice(0, length)}...` : str

const decodeUrlString = (str: string) => decodeURIComponent(str)

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const capitalizeName = (name: string) => {
  const nameParts = name.split(' ')
  nameParts.forEach((part, index) => {
    nameParts[index] = capitalizeFirstLetter(part)
  })
  return nameParts.join(' ')
}

export {
  truncateString,
  decodeUrlString,
  capitalizeFirstLetter,
  capitalizeName,
}
