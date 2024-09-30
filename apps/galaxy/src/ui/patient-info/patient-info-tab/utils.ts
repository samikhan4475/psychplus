function applyClientSideFilters<T>(
  data: T[],
  filters: Partial<{ [K in keyof T]: T[K] }>,
): T[] {
  return data.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key as keyof T]
      const itemValue = item[key as keyof T]
      if (!filterValue) continue
      if (itemValue !== filterValue) return false
    }

    return true
  })
}

export { applyClientSideFilters }
