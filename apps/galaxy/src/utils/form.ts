// Removes undefined, null, and empty string values from form data before submission

const sanitizeFormData = <T extends object>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, val]) => val !== undefined && val !== '' && val !== null,
    ),
  ) as T

export { sanitizeFormData }
