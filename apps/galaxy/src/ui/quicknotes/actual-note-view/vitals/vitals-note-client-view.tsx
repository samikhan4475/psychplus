'use client'

import { useStore } from '@/ui/vitals'
import { Details } from './details'

interface VitalsNoteClientViewProps {
  patientId: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VitalsNoteClientView = ({ patientId }: VitalsNoteClientViewProps) => {
  const quicknotesData = useStore((state) => state.quicknotesData)
  return <Details data={quicknotesData ?? []} className="max-w-[360px]" />
}

export { VitalsNoteClientView }
