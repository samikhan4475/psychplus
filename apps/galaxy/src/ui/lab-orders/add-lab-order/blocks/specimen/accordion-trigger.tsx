import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { deleteSpecimenApi } from '../../api/delete-specimen'
import { LabOrderSchemaType } from '../../lab-order-schema'
import { DeleteDialog } from '../delete-dialog'

const SpecimenAccordionTrigger = ({ index }: { index: number }) => {
  const form = useFormContext<LabOrderSchemaType>()
  const specimenList = form.watch('specimenList')
  const appointmentId = useSearchParams().get('id') ?? ''
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteConfirm = async (
    e: React.MouseEvent,
  ) => {
    e.preventDefault()
    setDisabled(true)
    const newSpecimenList = [...specimenList]

    if (!newSpecimenList[index]?.newSpecimen) {
      await deleteSpecimenApi(
        appointmentId,
        newSpecimenList[index]?.orderId ?? '',
        newSpecimenList[index]?.id ?? '',
      )
    }

    newSpecimenList.splice(index, 1)
    form.setValue('specimenList', newSpecimenList)
    setDisabled(false)
  }

  const onDelete = () => {
    setIsOpen(true)
  }

  return (
    <Flex
      direction="row"
      align="center"
      justify="between"
      px="2"
      py="2"
      height="24px"
    >
      <Text size="1" weight="medium">
        {`Specimen ${index + 1}`}
      </Text>
      <Flex direction="row" align="center" gap="2">
        <IconButton
          type="button"
          variant="ghost"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash2 color="#60646C" width={16} height={16} />
        </IconButton>
        <TriangleDownIcon />
      </Flex>
      <DeleteDialog
        open={isOpen}
        onClose={setIsOpen}
        onClick={onClickDeleteConfirm}
      />
    </Flex>
  )
}

export { SpecimenAccordionTrigger }
