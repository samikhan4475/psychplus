import { Button } from '@radix-ui/themes'
import { NotepadIcon } from '@/components/icons'
import { useStore as useRootStore } from '@/store'
import { useRouter } from 'next/navigation'

const OpenPatientChartButton = ({ name }: { name: string }) => {
  const addTab = useRootStore((state) => state.addTab)
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="text-pp-bg-primary gap-x-1 text-[12px] font-[510] cursor-pointer"
      onClick={() => {
        // TODO: pass dynamic patientId in href when backend returns it in the response
        const href = `/chart/1560`
        addTab({
          href,
          label: name
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
