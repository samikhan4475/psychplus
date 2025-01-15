const appendSearchParams = (
  baseUrl: string | null,
  searchParams?: URLSearchParams,
  excludeParam?: string,
): string | null => {
  if (!baseUrl) return null

  let updatedUrl = baseUrl

  searchParams?.forEach((value, key) => {
    if (value && (!excludeParam || key !== excludeParam)) {
      updatedUrl += `${updatedUrl.includes('?') ? '&' : '?'}${key}=${value}`
    }
  })

  return updatedUrl
}
export { appendSearchParams }
