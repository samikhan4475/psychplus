import { NotesWidget } from './notes-widget'

interface NotesViewProps {
  patientId: string
}

const NotesView = ({ patientId }: NotesViewProps) => {
  return <NotesWidget patientId={patientId} />
}

export { NotesView }
