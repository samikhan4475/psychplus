import { Flex, Text } from '@radix-ui/themes'
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
    label = '1 Provider '
  } else {
    label = `${data.length} Providers `
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Text
        weight="medium"
        className="text-accent-12 sm:!mr-0 sm:!w-[100px] sm:!text-[16px] md:!mr-[48px] md:!w-[250px] md:!text-[20px] lg:!mr-[48px] lg:!w-[250px] lg:!text-[20px]"
      >
        {label}
      </Text>
    </Flex>
  )
}

export { ProviderCountLabel }
