const sanitizeFormData = <T extends object>(obj: T): T =>
    Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== undefined && value !== '' && value !== null,
      ),
    ) as T
  
  export { sanitizeFormData }
  