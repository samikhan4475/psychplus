import { Button } from '@radix-ui/themes'
import { NotepadIcon } from '@/components/icons'

const OpenPatientChartButton = () => {
  return (
    <Button
      variant="ghost"
      className="text-pp-bg-primary gap-x-1 text-[12px] font-[510]"
    >
      <NotepadIcon />
      Open Pt Chart
    </Button>
  )
}

export { OpenPatientChartButton }
