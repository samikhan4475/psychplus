import { useMemo } from 'react'
import { useStore } from './store'

const useOptionsAndDefaults = (keys: {
  optionKey: string
  valueKey: string
}) => {
  const { mappedPreferences } = useStore((state) => state)
  const { contentValue, contentOptions } = useMemo(() => {
    const contentValue = mappedPreferences[keys.valueKey]?.content
    const contentOptions = mappedPreferences[keys.optionKey]?.content
    return { contentValue, contentOptions }
  }, [mappedPreferences])
  return {
    options:
      contentOptions?.split('|')?.map((o) => ({ label: o, value: o })) ?? [],
    defaultValue: contentValue ?? null,
  }
}

export { useOptionsAndDefaults }
