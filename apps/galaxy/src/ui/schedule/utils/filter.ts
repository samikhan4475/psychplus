const isDirty = <T extends object>(obj: T): boolean =>
  Object.entries(obj).length > 0

export { isDirty }
