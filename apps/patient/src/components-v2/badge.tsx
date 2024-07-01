import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, CircleAlert } from 'lucide-react'

const Badge = ({
  label,
  type,
  addIcon = false,
  className,
}: {
  label: string
  type: string
  addIcon?: boolean
  className?: string
}) => {
  const getBadgeColor = () => {
    switch (type) {
      case 'success':
        return 'border-[#30A46C] bg-green-3 text-[#18794E]'
      case 'warning':
        return 'border-[#FBDFB1] bg-[#FEF7EC]'
      case 'danger':
        return 'border-[#E5484D] bg-[#FFE5E5] text-[#1C2024]'
      case 'basic':
        return 'border-[#B9BBC6] bg-[#F9F9FB] text-[#60646C]'
    }
  }

  return (
    <Flex
      className={cn('rounded-6 border', getBadgeColor(), className)}
      px="2"
      align="center"
      gap="1"
    >
      {addIcon && <Icon type={type} />}

      <Text
        className="whitespace-nowrap text-[11px] xs:text-[15px]"
        weight="regular"
      >
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
    case 'danger':
      return <CircleAlert height="16" width="16" color="#B47818" />

    case 'warning':
      return <CircleAlert height="16" width="16" color="#B47818" />
  }
}

export { Badge }
