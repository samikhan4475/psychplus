const beautifyErrorMessage = (errorMessage: string): string =>
  errorMessage?.includes('Internal server error:')
    ? errorMessage?.replace(/^Internal server error:\s*/, '')?.trim()
    : errorMessage

export { beautifyErrorMessage }
