import { Flex, Text } from '@radix-ui/themes'

const RequiredSymbol = () => {
  return <span className="text-[#FF0000]">*</span>
}

interface Props {
  required?: boolean
  label: string
  value: string
}

const LabelledText = ({ required, label, value }: Props) => {
  return (
    <Flex direction="column">
      <Text className='text-[12px] font-[500]'>
        {label} {required && <RequiredSymbol />}
      </Text>
      <Text className="h-7 text-[12px]">{value}</Text>
    </Flex>
  )
}

export { LabelledText }
