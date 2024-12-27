import { Box, Text } from '@radix-ui/themes'

interface PillBlockProps {
  data: {
    name: string
    isSelected: boolean
  }
  rounded: number
  fontSize: string
  fontWeight: 'bold' | 'light' | 'regular' | 'medium'
  bgColor: string
}

const PillBlock = ({
  data,
  rounded,
  fontSize,
  fontWeight,
  bgColor,
}: PillBlockProps) => {
  const colorMap: Record<string, string> = {
    'pp-gray-5': 'bg-pp-gray-5',
    'pp-blue-3': 'bg-pp-blue-3',
  }
  const bgClass = colorMap[bgColor] || 'bg-default'

  return (
    <Box
      className={`cursor-pointer rounded-${rounded} border ${
        data.isSelected
          ? 'text-white border-pp-blue-3 bg-pp-blue-3'
          : `border-pp-gray-4 ${bgClass}`
      } px-[10px] py-[6px]`}
      key={data.name}
    >
      <Text
        className={`whitespace-nowrap text-[${fontSize}] capitalize`}
        weight={fontWeight}
      >
        {data.name}
      </Text>
    </Box>
  )
}

export default PillBlock
