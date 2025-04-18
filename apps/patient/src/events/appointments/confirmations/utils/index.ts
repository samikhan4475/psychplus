const cleanErrorMessage = (message: string) => {
  if (!message) return ''

  return (
    message
      .replace(/Internal server error:*/i, '')
      .replace(/\([^()]{0,100}\)/g, '')
      .replace(/['"]/g, '')
      .replace(/\s+/g, ' ')
      .trim() + '!'
  )
}

export { cleanErrorMessage }
