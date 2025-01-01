import { useStore } from '../store'

const useRefetchAppointments = () => {
  const { fetchProviderCodingView, formData } = useStore()

  const refetch = () => {
    fetchProviderCodingView(formData)
  }

  return refetch
}

export { useRefetchAppointments }
