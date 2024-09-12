import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { SpecimenModalProps } from '../types'
import { SpecimenLabelPrinting } from './index'

const SpecimenLabelPrintingModal = ({
  active,
  handlerClose,
  labTest,
}: SpecimenModalProps) => {
  return (
    <Dialog.Root open={active}>
      <Dialog.Content className={`relative max-w-[240px] rounded-6 p-4`}>
        <Dialog.Close
          onClick={handlerClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross2Icon />
        </Dialog.Close>
        <SpecimenLabelPrinting labTest={labTest} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { SpecimenLabelPrintingModal }
