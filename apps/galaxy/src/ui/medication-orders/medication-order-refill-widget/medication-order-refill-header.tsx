import { Button, Flex, Text } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useStore } from './store'

const MedicationOrderRefillHeader = () => {
  const { searchMedicationsList, loading } = useStore((state) => ({
    searchMedicationsList: state.searchMedicationsList,
    loading: state.loading,
  }))
  return (
    <TabContentHeading title="Refill Requests">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
          disabled={loading}
          onClick={() => searchMedicationsList()}
        >
          <Text className="text-pp-black-3 text-1">Decline All</Text>
        </Button>
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
          disabled={loading}
          onClick={() => searchMedicationsList()}
        >
          <Text className="text-pp-black-3 text-1">Approve All</Text>
        </Button>
      </Flex>
    </TabContentHeading>
  )
}

export { MedicationOrderRefillHeader }
