import { cookies, headers } from 'next/headers'
import * as api from '@psychplus/api'
import { AUTH_TOKEN_COOKIE_NAME } from '@psychplus/utils/constants'
import { type SearchParams } from '@psychplus/utils/url'

const withAPI = (
  Component: React.ComponentType<{ searchParams: SearchParams }>,
) => {
  const ComponentWithAPI = ({
    searchParams,
  }: {
    searchParams: SearchParams
  }) => {
    api.init({
      token:
        cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value ?? searchParams?.token,
      userAgent: headers().get('user-agent') ?? undefined,
    })

    return <Component searchParams={searchParams} />
  }

  return ComponentWithAPI
}

export { withAPI }
