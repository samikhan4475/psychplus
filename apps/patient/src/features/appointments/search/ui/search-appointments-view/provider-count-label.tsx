import { Text } from '@radix-ui/themes'
import { useSortedFilteredData } from '../../store/hooks'

const ProviderCountLabel = () => {
  const data = useSortedFilteredData()

  if (!data) {
    return null
  }

  let label = ''

  if (data.length === 0) {
    label = 'No results'
  } else if (data.length === 1) {
    label = '1 provider '
  } else {
    label = `${data.length} Providers `
  }

  return (
    <Text
      weight="medium"
      className="mr-[48px] w-[240px] text-[20px] text-accent-12"
    >
      {label}
    </Text>
  )
}

export { ProviderCountLabel }
