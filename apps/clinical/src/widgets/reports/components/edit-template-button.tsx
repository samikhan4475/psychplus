import { Button } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { Template } from '@psychplus/reports'

interface EditTemplateProps {
    template: Template
}

const EditTemplateButton = ({template}: EditTemplateProps) => {
  const { publish } = usePubsub()

  return (
    <Button
      variant="outline"
      className="text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      onClick={() => publish(`${EDIT_TEMPLATE_WIDGET}:${EventType.Opened}`, template)}
    >
      Edit
    </Button>
  )
}

export { EditTemplateButton }
