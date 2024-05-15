import { type ReactNode } from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '@/features/appointments/search/store'
import { useSortedFilteredData } from '../../store/hooks'

const ProviderCountLabel = () => {
  const data = useSortedFilteredData()

  const { location, zipCode } = useStore((state) => ({
    data: state.data,
    location: state.location,
    zipCode: state.zipCode,
  }))

  if (!data) {
    return null
  }

  let label = ''

  if (data.length === 0) {
    label = 'No results'
  } else if (data.length === 1) {
    label = '1 provider '
  } else {
    label = `${data.length} providers `
  }

  const prefix = data.length === 0 ? '' : 'Showing '

  let suffix: ReactNode = null

  if (location) {
    suffix = ' near you'
  } else if (zipCode) {
    suffix = (
      <Text>
        near <Text weight="medium">{zipCode}</Text>
      </Text>
    )
  }

  return (
    <Text className="w-[325px] text-[18px] text-accent-12">
      {prefix}
      {label}
      {suffix}
    </Text>
  )
}

export { ProviderCountLabel }
