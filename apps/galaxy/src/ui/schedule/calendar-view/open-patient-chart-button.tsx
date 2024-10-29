import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { NotepadIcon } from '@/components/icons'
import { useStore as useRootStore } from '@/store'
import { Appointment } from '@/types'
import { getPatientMRN } from '@/utils'

interface OpenPatientChartButtonProps {
  appointment: Appointment
}

const OpenPatientChartButton = ({
  appointment,
}: OpenPatientChartButtonProps) => {
  const { patientId, name, appointmentId } = appointment
  const addTab = useRootStore((state) => state.addTab)
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="text-pp-bg-primary cursor-pointer gap-x-1 text-[12px] font-[510]"
      onClick={() => {
        const href = `/chart/${patientId}/quicknotes?id=${appointmentId}`
        addTab({
          href,
          label: `${name}-${getPatientMRN(patientId)}-${appointmentId}`,
        })
        router.push(href)
      }}
    >
      <NotepadIcon />
      Open Pt Chart
    </Button>
  )
}

export { OpenPatientChartButton }
