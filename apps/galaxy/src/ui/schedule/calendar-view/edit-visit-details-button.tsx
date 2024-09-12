import { Button } from '@radix-ui/themes'
import { EditIcon } from '@/components/icons'

const EditVisitDetailsButton = () => {
  return (
    <Button
      variant="ghost"
      className="text-pp-bg-primary gap-x-1 text-[12px] font-[510]"
    >
      <EditIcon />
      Edit
    </Button>
  )
}

export { EditVisitDetailsButton }
