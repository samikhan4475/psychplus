const createSearchParams = (
  items: Record<string, string | null | undefined>,
) => {
  const searchParams = new URLSearchParams()

  Object.entries(items).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.set(key, value)
    }
  })
  return searchParams
}

export { createSearchParams }
