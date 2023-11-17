import { APP_ENV, APP_PATH } from '@psychplus/utils/constants'

const wrapPath = (path: string) => {
  const appPath = APP_PATH ? `/${APP_PATH}` : ''
  const wrappedPath = APP_ENV !== 'development' ? `${appPath}${path}` : path
  return wrappedPath
}

export { wrapPath }
