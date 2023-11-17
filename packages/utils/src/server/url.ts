import { headers } from 'next/headers'
import {
  HEADER_USER_AGENT,
  HEADER_X_URL,
  QUERY_TOKEN,
  QUERY_USER_AGENT,
} from '../constants'

const getUrl = () => new URL(headers().get(HEADER_X_URL)!)

const getPathname = () => getUrl().pathname

const getSearchParams = () => getUrl().searchParams

const forwardQuery = (urlString: string) => {
  const url = new URL(urlString)

  const originalParams = getSearchParams()

  const token = originalParams.get(QUERY_TOKEN)
  if (token) {
    url.searchParams.append(QUERY_TOKEN, token)
  }

  const userAgent = headers().get(HEADER_USER_AGENT)
  if (userAgent) {
    url.searchParams.append(QUERY_USER_AGENT, userAgent)
  }

  return url.toString()
}

export { forwardQuery, getUrl, getPathname, getSearchParams }
