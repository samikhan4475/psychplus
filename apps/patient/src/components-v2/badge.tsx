import { cn } from '@psychplus-v2/utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, CircleAlert, Clock3Icon } from 'lucide-react'

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
        return 'border-[#30A46C] bg-green-3'
      case 'warning':
        return 'border-[#FBDFB1] bg-[#FEF7EC]'
      case 'danger':
        return 'border-[#E5484D] bg-[#FFE5E5]'
      case 'basic':
        return 'border-[#B9BBC6] bg-[#F9F9FB] text-[#60646C]'
      case 'highContrast':
        return 'border-[#194595] bg-[#194595] text-[white]'
    }
  }

  return (
    <Flex
      className={cn('rounded-6 border', getBadgeColor(), className)}
      px="2"
      align="center"
      justify="center"
      gap="1"
    >
      {addIcon && <Icon type={type} label={label} />}

      <Text
        className="whitespace-nowrap text-[11px] xs:text-[15px]"
        weight="regular"
      >
        {label}
      </Text>
    </Flex>
  )
}

const Icon = ({ type, label }: { type: string; label: string }) => {
  switch (type) {
    case 'success':
      return (
        <CheckIcon height="16" width="16" strokeWidth={2.5} color="green" />
      )
    case 'danger':
      return <Cross2Icon height="16" width="16" color="#E5484D" />

    case 'warning':
      if (label.toLocaleLowerCase() === 'pending')
        return <Clock3Icon height="16" width="16" color="#B47818" />
      return <CircleAlert height="16" width="16" color="#B47818" />
  }
}

export { Badge }
