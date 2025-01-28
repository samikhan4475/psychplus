const preventInvalidZipInput = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    event.key === 'e' ||
    event.key === 'E' ||
    event.key === '+' ||
    event.key === '-' ||
    event.key === '.'
  ) {
    event.preventDefault()
  }
}

export { preventInvalidZipInput }
