import { useRouter } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useStore as useRootStore } from '@/store'

const OrganizationsTabView = () => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/organization-practice/organizations/1/organization-profile`
    addTab({
      href,
      label: `Organization 1`,
    })
    router.push(href)
  }

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Organizations" />
      <Button onClick={openTab} className="w-[200px]">
        Open Tab
      </Button>
    </Flex>
  )
}

export { OrganizationsTabView }
