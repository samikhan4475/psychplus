import { Button } from '@radix-ui/themes'
import { Template } from '@psychplus/reports'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

interface EditTemplateProps {
  template: Template
}

const EditTemplateButton = ({ template }: EditTemplateProps) => {
  const { publish } = usePubsub()
  const sortedParameters = template.reportTemplateParameters.sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  )
  return (
    <Button
      variant="outline"
      className="text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      onClick={() =>
        publish(`${EDIT_TEMPLATE_WIDGET}:${EventType.Opened}`, {
          ...template,
          reportTemplateParameters: sortedParameters,
        })
      }
    >
      Edit
    </Button>
  )
}

export { EditTemplateButton }
