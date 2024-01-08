import { headers } from 'next/headers'
import { HEADER_X_URL } from '../constants'

const getUrl = () => new URL(headers().get(HEADER_X_URL)!)

const getPathname = () => getUrl().pathname

const getSearchParams = () => getUrl().searchParams

export { getUrl, getPathname, getSearchParams }
