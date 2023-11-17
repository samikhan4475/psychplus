import { headers } from 'next/headers'
import { HEADER_X_URL } from '../constants'

const getUrl = () => new URL(headers().get(HEADER_X_URL)!)

const getPathname = () => getUrl().pathname

const getSearchParams = () => getUrl().searchParams

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

export { getUrl, getPathname, getSearchParams, createSearchParams }
