import { useStore } from '@/store'

const useConstants = () => {
  const constants = useStore((state) => state.constants)
  return constants
}

export { useConstants }
