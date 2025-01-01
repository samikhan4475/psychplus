import { useStore } from '../store'

const useRefetch = () => {
  const { fetchData, currentPage, formData } = useStore((state) => ({
    fetchData: state.fetchAppointments,
    currentPage: state.page,
    formData: state.formData,
  }))

  return () => {
    fetchData(formData, currentPage, false)
  }
}

export { useRefetch }
