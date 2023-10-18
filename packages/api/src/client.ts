const login = async (request: {
  username: string
  password: string
}): Promise<void> => {
  const response = await fetch(`/api/login`, {
    method: 'POST',
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error()
  }
}

export { login }
