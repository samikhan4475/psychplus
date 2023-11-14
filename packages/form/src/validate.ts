import { z } from 'zod'

const phoneRegex = /^\+?[1-9]\d{7,14}$/

const requiredString = z.string().min(1, 'Required')

const email = requiredString.email()

const password = requiredString.min(
  8,
  'Password must contain at least 8 characters',
)

const phoneNumber = requiredString.regex(phoneRegex, 'Invalid phone number')

const validate = {
  requiredString,
  email,
  password,
  phoneNumber,
}

export { validate }
