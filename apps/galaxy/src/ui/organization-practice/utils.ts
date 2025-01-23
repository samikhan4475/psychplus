import { Practice } from './types'

const getPracticeName = (practices: Practice[]) => {
  return practices ? practices.map((p) => p.displayName).join(', ') : ''
}

export { getPracticeName }
