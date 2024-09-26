function sanitizeObject<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as T
}

export { sanitizeObject }
