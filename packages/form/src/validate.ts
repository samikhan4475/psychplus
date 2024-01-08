import { z } from 'zod'

// ======= Regex ========
const phoneRegex = /^\+?[1-9]\d{7,14}$/
const charRegex = /^[A-Za-z]*$/

const requiredString = z.string().min(1, 'Required')
const email = requiredString.email()
const phoneNumber = requiredString.regex(phoneRegex, 'Invalid phone number')
const password = requiredString.min(
  8,
  'Password must contain at least 8 characters',
)

const anyString = z.coerce.string()
const numberOnly = z.coerce.number()
const charOnly = anyString.regex(charRegex, 'only charactors are allowed')

// can be empity but if had a value then validate
const emptyOrStringArray = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const nullOrBoolean = z.union([z.null(), z.boolean()])
const nullOrString = z.union([z.null(), anyString])
const nullOrChar = z.union([z.null(), charOnly])
const nullOrNumber = z.union([z.null(), numberOnly])

const validate = {
  requiredString,
  email,
  password,
  phoneNumber,

  anyString,
  numberOnly,
  charOnly,
  emptyOrStringArray,

  nullOrBoolean,
  nullOrString,
  nullOrChar,
  nullOrNumber,
}

export { validate }
