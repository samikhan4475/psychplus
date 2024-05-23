import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, CircleAlert } from 'lucide-react'

const Badge = ({
  label,
  type,
  addIcon = false,
}: {
  label: string
  type: string
  addIcon?: boolean
}) => {
  const getBadgeColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-6 bg-green-3'
      case 'warning':
        return 'border-[#FBDFB1] bg-[#FEF7EC]'
    }
  }

  return (
    <Flex
      className={`h-[32px] rounded-2 border ${getBadgeColor()}`}
      px="2"
      align="center"
      gap="1"
    >
      {addIcon && <Icon type={type} />}

      <Text className="whitespace-nowrap text-[11px] xs:text-[15px]">
        {label}
      </Text>
    </Flex>
  )
}

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return (
        <CheckIcon height="16" width="16" strokeWidth={2.5} color="green" />
      )
    case 'warning':
      return <CircleAlert height="16" width="16" color="#B47818" />
  }
}

export { Badge }
