import { useRouter } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { PracticeDetails } from './types'
import { Practice } from '../organization-practice/types'

const PracticeNameCell = ({
  row: { original: practice },
}: PropsWithRow<Practice>) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/organization-practice/practices/${practice.id}/practices-profile`
    addTab({
      href,
      label: practice.displayName,
    })
    router.push(href)
  }

  return (
    <Box className="inline-flex">
      <Text
        size="1"
        className="flex max-w-[200px] cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={openTab}
      >
        {practice.displayName}
      </Text>
    </Box>
  )
}
export { PracticeNameCell }
