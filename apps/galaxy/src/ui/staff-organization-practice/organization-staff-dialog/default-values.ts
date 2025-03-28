import { Practice } from '../types'

const defaultValues = (data?: Practice) => {
  return {
    id: data?.id ?? '',
    organizationId: data?.organizationId ?? '',
  }
}

export { defaultValues }
