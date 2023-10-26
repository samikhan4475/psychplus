import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { IconButton } from '@psychplus/ui/icon-button'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Icon Button'
const DESCRIPTION =
  'A button designed specifically for usage with a single icon.'

const IconButtonComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <IconButton>
        <MagnifyingGlassIcon width="18" height="18" />
      </IconButton>
    </Box>
  </>
)

export default IconButtonComponentPage
