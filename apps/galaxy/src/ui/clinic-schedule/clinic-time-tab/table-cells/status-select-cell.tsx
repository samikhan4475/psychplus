import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { SelectCell, SelectInput } from '@/components'

const StatusSelectCell = () => {
  return (
    <Flex gapX="1" className="min-w-32" align="center">
      <CounterClockwiseClockIcon
        width={16}
        height={16}
        className="text-black cursor-pointer"
      />
      <SelectCell className="flex-1" options={[]} />
    </Flex>
  )
}

export { StatusSelectCell }
