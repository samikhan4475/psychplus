import { CPT } from '../../types'

const transformIn = (data: CPT): Partial<CPT> =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, String(value)]),
  )

export { transformIn }
