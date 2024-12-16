const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== ''),
  )
}

export { removeEmptyValues }
