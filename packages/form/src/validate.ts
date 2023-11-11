import { z } from 'zod'

const requiredString = z.string().min(1, 'Required')

const email = requiredString.email()

const password = requiredString.min(
  8,
  'Password must contain at least 8 characters',
)

const validate = {
  requiredString,
  email,
  password,
}

export { validate }
