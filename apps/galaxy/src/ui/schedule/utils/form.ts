import { DateValue } from 'react-aria-components'

const sanitizeFormData = <T extends object>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== '' && value !== null,
    ),
  ) as T

const validateDate = (
  date: DateValue,
  referenceDate: DateValue | undefined,
) => {
  return referenceDate ? date.compare(referenceDate) : 0
}

export { sanitizeFormData, validateDate }
