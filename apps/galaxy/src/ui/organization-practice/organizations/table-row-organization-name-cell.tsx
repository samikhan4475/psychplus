import { useRouter } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Organization } from '../types'

const OrganizationNameCell = ({
  row: { original: organization },
}: PropsWithRow<Organization>) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/organization-practice/organizations/1/organization-profile`
    addTab({
      href,
      label: organization.displayName,
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
        {organization.shortName}
      </Text>
    </Box>
  )
}
export { OrganizationNameCell }
