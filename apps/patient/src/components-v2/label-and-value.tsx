import { Box, Flex, Text, Tooltip } from '@radix-ui/themes'
import { InfoIcon } from './info-icon'

interface LabelAndValueProps {
  label: string
  tooltip?: string
}

const LabelAndValue = ({
  label,
  tooltip,
  children,
}: React.PropsWithChildren<LabelAndValueProps>) => (
  <Flex
    gap={{ initial: '2', sm: '5' }}
    direction={{ initial: 'column', sm: 'row' }}
  >
    <Flex
      align="start"
      justify={{ initial: 'start', sm: 'end' }}
      className="flex-[1.5]"
    >
      <FieldLabel tooltip={tooltip}>{label}</FieldLabel>
    </Flex>
    <Flex className="flex-[3]">{children}</Flex>
  </Flex>
)

const FieldLabel = ({
  tooltip,
  children,
}: React.PropsWithChildren<{ tooltip?: string }>) => (
  <Flex align="center" gap="2">
    <Text align="right" className="text-[16px] sm:text-[22px] font-[600]">
      {children}
    </Text>
    {tooltip ? <FieldTooltip content={tooltip} /> : null}
  </Flex>
)

const FieldTooltip = (props: React.ComponentProps<typeof Tooltip>) => (
  <Tooltip {...props} delayDuration={0} className="max-w-[200px]">
    <Box>
      <InfoIcon />
    </Box>
  </Tooltip>
)

export { LabelAndValue }
