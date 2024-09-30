'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CloseIcon, QuestionIcon, TickIcon } from '@/components/icons'
import { type PatientConsent } from '@/types'

const StatusCell = ({
  row: {
    original: { status },
  },
}: PropsWithRow<PatientConsent>) => {
  const iconProps = { width: 16, height: 16 }

  const iconTextMap: Record<
    string,
    { Icon: JSX.Element; text: string; className: string }
  > = {
    Yes: {
      Icon: <TickIcon {...iconProps} />,
      text: 'Yes',
      className: '',
    },
    No: {
      Icon: <CloseIcon {...iconProps} />,
      text: 'No',
      className: 'text-red-9',
    },
    Pending: {
      Icon: <QuestionIcon width={14} height={14} />,
      text: 'Pending',
      className: 'ml-0.5',
    },
  }

  const { Icon, text, className } =
    iconTextMap[status as string] || iconTextMap['Pending']

  return (
    <Box className="px-1 py-0.5">
      <Flex gap="1" align="center">
        {Icon}
        <Text size="1" weight="medium" className={className}>
          {text}
        </Text>
      </Flex>
    </Box>
  )
}

export { StatusCell }
