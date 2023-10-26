import { PlusIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { IconButton } from '@psychplus/ui/icon-button'
import { Tooltip } from '@psychplus/ui/tooltip'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Tooltip'
const DESCRIPTION =
  'Floating element that provides a control with contextual information via pointer or focus.'

const TooltipComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Tooltip content="Add to library">
        <IconButton radius="full">
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </>
)

export default TooltipComponentPage
