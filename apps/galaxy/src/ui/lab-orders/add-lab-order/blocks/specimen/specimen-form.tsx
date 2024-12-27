import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useSpecimen } from '../../hooks/use-specimen'
import { LabOrderSchemaType } from '../../lab-order-schema'
import { SpecimenAccordian } from './specimen-accordian'
import { SpecimenAddButton } from './specimen-add-button'

const SpecimenForm = () => {
  const form = useFormContext<LabOrderSchemaType>()

  const specimenList = form.watch('specimenList')

  useSpecimen()

  return (
    <Flex direction="column">
      <SpecimenAddButton />
      {specimenList && specimenList.length > 0 && (
        <Box
          className="gap-2 rounded-b-1 border border-solid border-[#01012E22]"
          pt="2"
          px="1"
        >
          {specimenList.map((item, index) => (
            <SpecimenAccordian key={`specimen_${item.id}`} index={index} />
          ))}
        </Box>
      )}
    </Flex>
  )
}

export { SpecimenForm }
