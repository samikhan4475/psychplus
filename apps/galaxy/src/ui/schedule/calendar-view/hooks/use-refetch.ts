import { useStore } from '../store'

const useRefetch = () => {
  const { fetchData, formData } = useStore((state) => ({
    fetchData: state.fetchData,
    formData: state.formData,
  }))

  return () => {
    fetchData(formData)
  }
}

export { useRefetch }
