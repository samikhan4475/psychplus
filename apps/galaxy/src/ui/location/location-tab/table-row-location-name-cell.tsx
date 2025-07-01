import { useRouter } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { LongTextCell, PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Location } from '@/types'

const LocationNameCell = ({
  row: { original: location },
}: PropsWithRow<Location>) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/location/${location.id}/practice`
    addTab({
      href,
      label: `${location.locationNameGenerated} (Location)`,
    })
    router.push(href)
  }

  return (
    <Box className="inline-flex">
      <LongTextCell className="max-w-36 cursor-pointer">
        <Text onClick={openTab}>{location?.locationNameGenerated}</Text>
      </LongTextCell>
    </Box>
  )
}
export { LocationNameCell }
