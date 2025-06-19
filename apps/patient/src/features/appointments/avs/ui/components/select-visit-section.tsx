import React, { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Button, Flex, Select, Text } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { useStore } from '../../../history/store'
import { getVisitDropdownOptions, handlePrint } from '../../utils'

const PRINT_HEADING = 'After Visit Summary'

const SelectVisitSection = ({ printId }: { printId: string }) => {
  const { allAppointments } = useStore((state) => ({
    allAppointments: state.allAppointments,
  }))

  const { id } = useParams()
  const router = useRouter()

  const options = useMemo(() => {
    return allAppointments
      ?.filter?.((item) => item.status === 'CheckedOut')
      ?.map((item) => getVisitDropdownOptions(item))
  }, [allAppointments])

  const onClickItem = (appointmentId: string) => {
    router.replace(`${appointmentId}`)
  }

  return (
    <Flex justify={'between'} align={'center'}>
      <Flex direction={'column'} gap="1">
        <Text as="label" weight="medium" className={'text-[14px]'}>
          Select Visit
        </Text>
        {options?.length > 0 && (
          <Box>
            <Select.Root defaultValue={`${id}`} onValueChange={onClickItem}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  {options?.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Box>
        )}
      </Flex>
      <Button
        variant="outline"
        className="rounded-2 px-2 py-2"
        color="gray"
        type="button"
        onClick={() => handlePrint(printId, PRINT_HEADING)}
      >
        <PrinterIcon width={24} height={24} strokeWidth={1.5} />
      </Button>
    </Flex>
  )
}

export { SelectVisitSection }
