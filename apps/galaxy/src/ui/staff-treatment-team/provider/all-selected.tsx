import { Button, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ProviderSchemaType } from './schema'
import { useStore } from './store'

const AllSelected = ({ onOpen }: { onOpen: (patientId: number) => void }) => {
  const form = useFormContext<ProviderSchemaType>()
  const { primaryPatients, secondaryPatients } = useStore((state) => ({
    primaryPatients: state.primaryPatients,
    secondaryPatients: state.secondaryPatients,
  }))
  const selectedRows = form.watch('selectedRows')
  const isPrimary = form.watch('isPrimary')
  const data = isPrimary ? primaryPatients : secondaryPatients

  if (
    selectedRows.length === 0 ||
    selectedRows.length !== data.length
  ) {
    return null
  }

  return (
    <Flex
      className="bg-white border-pp-states-disabled h-8 w-[555px] rounded-1 border"
      align="center"
      justify="between"
      px="3"
      py="1"
      mb="1"
    >
      <Text size="1">All Selected</Text>
      <Button type="button" size="1" highContrast onClick={() => onOpen(0)}>
        Change
      </Button>
    </Flex>
  )
}

export { AllSelected }
