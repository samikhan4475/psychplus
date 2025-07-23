import { Flex } from '@radix-ui/themes'
import { EPCSHeader } from './epcs-header'
import { EPCSPagination } from './epcs-pagination'
import { EPCSTable } from './epcs-table'
import { useSearchParams } from 'next/navigation'
import { useStore as useGlobalStore } from '@/store'
interface EPCSViewProps {
  staffId: string | null
}
const EPCSView = ({ staffId }: EPCSViewProps) => {
  const { userId } = useGlobalStore((state) => ({
      userId: state.user.id,
    }))
  const searchParams = useSearchParams()
  const idFromSearch = searchParams.get('id');
  const staffUserId = idFromSearch ?? String(userId);
  const isFromSearchParam = !!idFromSearch;
  console.log('isFromSearchParam',isFromSearchParam)
  return (
    <Flex
      direction="column"
      width="100%"
      gap="1"
      className="bg-white h-full !overflow-hidden"
    >
      <EPCSHeader userId={staffUserId} staffId={staffId} isFromSearchParam={isFromSearchParam} />
      <EPCSTable userId={staffUserId} />
      <EPCSPagination />
    </Flex>
  )
}

export { EPCSView }
