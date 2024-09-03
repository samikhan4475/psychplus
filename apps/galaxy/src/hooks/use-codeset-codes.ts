import { useStore } from '@/store'

const useCodesetCodes = (name: string) => {
  const codesetCache = useStore((state) => state.codesets)
  const key = name.includes('.') ? name.split('.')[1] : name
  return codesetCache[key].codes ?? []
}

export { useCodesetCodes }
