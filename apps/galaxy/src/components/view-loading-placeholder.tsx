import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { TabContentHeading } from './tab-content-heading'

interface ViewLoadingPlaceholderProps {
  title: string
}

const ViewLoadingPlaceholder = ({ title }: ViewLoadingPlaceholderProps) => {
  return (
    <Flex direction="column" className="flex-1">
      <TabContentHeading title={title} />
      <Flex className="flex-1">
        <LoadingPlaceholder />
      </Flex>
    </Flex>
  )
}

export { ViewLoadingPlaceholder }
