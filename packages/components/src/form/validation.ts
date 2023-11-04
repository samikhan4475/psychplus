import { RegisterOptions } from 'react-hook-form'

const Required: RegisterOptions = {
  required: 'Required.',
}

const MinLength = (value: number): RegisterOptions => ({
  minLength: {
    value,
    message: `Must be at least ${value} characters.`,
  },
})

const Numeric: RegisterOptions = {
  pattern: {
    value: /\d+/,
    message: 'Must be a number.',
  },
}

const validate = (...options: RegisterOptions[]) =>
  options.reduce((acc, option) => Object.assign(acc, option), {})

export { validate, Required, MinLength, Numeric }
