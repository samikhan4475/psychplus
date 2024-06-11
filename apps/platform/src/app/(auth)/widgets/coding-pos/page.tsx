import { CodingPOSWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Coding POS Widget'
const DESCRIPTION = 'Coding POS widget'

const CodingPOSWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <CodingPOSWidget />
    </>
  )
}

export default CodingPOSWidgetPage
