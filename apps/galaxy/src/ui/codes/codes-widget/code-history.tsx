import { useMemo } from 'react'
// import * as Popover from '@radix-ui/react-popover'
import { Box, Text } from '@radix-ui/themes'
// import { HistoryIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CodesWidgetSchemaType } from './codes-widget-schema'

// import { CodesHistoryTable } from './history/history-table'

interface Props {
  cptCodesLookup: Record<string, string>
}
const CodeHistory = ({ cptCodesLookup }: Props) => {
  const form = useFormContext<CodesWidgetSchemaType>()
  const formValues = form.watch()

  const getJoinedValues = useMemo(() => {
    const formSchemaKeys: (keyof CodesWidgetSchemaType)[] = [
      'cptPrimaryCodes',
      'cptmodifierCodes',
      'cptAddonCodes',
    ]
    const lookupKeys = Object.keys(cptCodesLookup)
    return formSchemaKeys
      .map((key) => {
        const codes = formValues?.[key] ?? []
        return lookupKeys
          .filter((lookupKey) => codes.includes(lookupKey))
          .join(', ')
      })
      .filter(Boolean)
      .join(' | ')
  }, [formValues, cptCodesLookup])

  return (
    <Box className="flex h-4 items-center justify-between pb-1">
      <Text className="text-1">{getJoinedValues}</Text>
      {/* <Popover.Root>
        <Popover.Trigger className="relative z-50">
          <Flex justify="center" p="1">
            <HistoryIcon cursor="pointer" height={14} width={14} />
          </Flex>
        </Popover.Trigger>
        <Popover.Content
          side="right"
          className="bg-white shadow-lg absolute -top-[4.1rem] left-[0.5rem] z-50 min-w-[750px] rounded-[12px] p-3 drop-shadow-lg"
        >
          <Flex className="w-full gap-1.5" direction="column">
            <Flex justify="between" align="center" gap="2">
              <Heading size="4">Code History</Heading>
            </Flex>
            <CodesHistoryTable />
          </Flex>
          <Popover.Arrow className="fill-white drop-shadow-lg" />
        </Popover.Content>
      </Popover.Root> */}
    </Box>
  )
}

export { CodeHistory }
