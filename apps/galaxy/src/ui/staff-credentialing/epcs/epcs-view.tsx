import { Flex } from '@radix-ui/themes'
import { EPCSHeader } from './epcs-header'
import { EPCSPagination } from './epcs-pagination'
import { EPCSTable } from './epcs-table'
import { useSearchParams } from 'next/navigation'
interface EPCSViewProps {
  staffId: string | null
}
const EPCSView = ({ staffId }: EPCSViewProps) => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id') ?? ''
  return (
    <Flex
      direction="column"
      width="100%"
      gap="1"
      className="bg-white h-full !overflow-hidden"
    >
      <EPCSHeader userId={userId} staffId={staffId} />
      <EPCSTable userId={userId} />
      <EPCSPagination />
    </Flex>
  )
}

export { EPCSView }
