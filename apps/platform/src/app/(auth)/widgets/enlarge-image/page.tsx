import { EnlargeImageWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Enlarge Image Widget'
const DESCRIPTION = 'A dialog form to view enlarged image.'

const EnlargeImageWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <EnlargeImageWidget />
    </>
  )
}

export default EnlargeImageWidgetPage
