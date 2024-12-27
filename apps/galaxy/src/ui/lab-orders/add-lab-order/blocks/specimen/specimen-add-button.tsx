import { Button, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LabOrderSchemaType } from '../../lab-order-schema'

const newSpecimenObject = {
  collectionReceivedDateTime: '',
  collectedOn: '',
  newSpecimen: true,
  TestId: '',
  specimenType: '',
  specimenAdditives: '',
  collectionMethod: '',
  sourceSite: '',
  sourceSiteModifier: '',
  role: '',
  StartDate: format(new Date(), 'yyyy-MM-dd'),
  StartTime: '',
  EndDate: format(new Date(), 'yyyy-MM-dd'),
  EndTime: '',
  volume: 0,
  measureUnit: '',
  rejectReason: '',
  containerCondition: '',
  id: new Date().toISOString(),
}

const SpecimenAddButton = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const specimenList = form.watch('specimenList')

  const onAddSpeciment = () => {
    const newSpecimenList =
      specimenList && specimenList.length > 0 ? [...specimenList] : []
    newSpecimenList.push(newSpecimenObject)
    form.setValue('specimenList', newSpecimenList)
  }

  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      className="bg-pp-bg-table-label h-6 rounded-t-1 px-2 py-[6px]"
    >
      <Text size="2" className="font-[600]">
        Specimen
      </Text>
      <Button
        className="bg-white border-pp-grey h-5  gap-1 border border-solid"
        type="button"
        onClick={onAddSpeciment}
      >
        <Plus color="#8B8D98" width={16} height={16} />
        <Text size="1" weight="medium" className="text-pp-black-3">
          Add
        </Text>
      </Button>
    </Flex>
  )
}

export { SpecimenAddButton }
