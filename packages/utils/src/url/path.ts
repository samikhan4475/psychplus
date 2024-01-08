import { APP_PATH, DISABLE_APP_PATH } from '@psychplus/utils/constants'

const wrapPath = (path: string) => {
  const appPath = APP_PATH ? `/${APP_PATH}` : ''
  const wrappedPath =
    process.env.NODE_ENV !== 'development' && !DISABLE_APP_PATH
      ? `${appPath}${path}`
      : path
  return wrappedPath
}

export { wrapPath }
