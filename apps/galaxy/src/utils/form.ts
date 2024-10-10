// Removes undefined, null, and empty string values from form data before submission

function sanitizeFormData<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value?.length !== 0,
    ),
  ) as T
}

export { sanitizeFormData }
