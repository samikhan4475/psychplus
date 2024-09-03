import { NotesWidget } from '@psychplus/widgets/clinical'
import { Client } from './client'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Notes widget'
const DESCRIPTION = 'Displays notes module'

const NotesWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <Client />
      <NotesWidget />
    </>
  )
}

export default NotesWidgetPage
