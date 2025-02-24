import z from 'zod'

const codeRegex = /^\S+$/

const codeValidation = z
  .string()
  .min(1, 'The field Code is Required')
  .max(64, 'The field Code must be a string with a maximum length of 64')
  .regex(codeRegex, 'The field Code can not have spaces.')

const descriptionValidation = z
  .string()
  .min(1, 'The field Display Name is Required')
  .max(
    1064,
    'The field Display Name must be a string with a maximum length of 1064',
  )

const aaDisplayNameValidation = z
  .string()
  .min(1, 'Required')
  .max(128, 'Max 128 characters are allowed')

const namespaceRegex = /^\w+$/

const namespaceValidation = z
  .string()
  .min(1, 'Required')
  .max(64, 'Max 64 characters are allowed')
  .regex(namespaceRegex, 'No spaces or punctuations are allowed')

const oidRegex = /^\d+(\.\d+)+$/

const oidValidation = z
  .string()
  .max(64, 'Max 64 characters are allowed')
  .regex(
    oidRegex,
    'Only numbers and periods are allowed, must start and end with a number',
  )
  .or(z.literal(''))
  .optional()

export {
  codeValidation,
  descriptionValidation,
  aaDisplayNameValidation,
  namespaceValidation,
  oidValidation,
}
