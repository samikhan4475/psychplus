import { headers } from 'next/headers'
import { HEADER_USER_AGENT, QUERY_TOKEN, QUERY_USER_AGENT } from '../constants'
import { getSearchParams } from '../url'

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

export { forwardQuery }
