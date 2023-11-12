interface LoginRequest {
  username: string
  password: string
}

const login = async (request: LoginRequest): Promise<void> => {
  const response = await fetch(`/api/login`, {
    method: 'POST',
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error()
  }
}

export { login }
