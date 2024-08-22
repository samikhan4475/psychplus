'use client'

import { CopyIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from 'node_modules/@psychplus/ui/src/toast-provider'
import {
  ActiveCodesetsDialogWidgetClient,
  useActiveCodeSetDialog,
} from '../active-codesets-dialog'
import { ActiveCodesetsTable } from './components'
import { ActiveCodeActionNavbar } from './components/active-code-action-navbar'
import { useRefetchActiveCodeSets } from './hooks'
import { useStore } from './store'

const ActiveCodesetsListWidgetClient = () => {
  useRefetchActiveCodeSets()
  const { isDialogOpen, toggleDialog } = useActiveCodeSetDialog()

  const { assigningAuthority, codeSets } = useStore((state) => ({
    assigningAuthority: state.assigningAuthority,
    codeSets: state.codeSets,
  }))

  return (
    <ToastProvider>
      <Flex direction="column" className="h-fit min-w-fit bg-[#f0f4ff]" p="3">
        <Flex justify="between" align="center" className="h-9 bg-[#FFFFFF] p-2">
          <Flex>
            <Text className="text-5" weight="bold">
              Codeset {`(${codeSets?.length})`}
            </Text>
          </Flex>
          <Flex gap="2">
            <Button highContrast variant="outline" size="1">
              <CopyIcon />
              Copy
            </Button>
            <Button highContrast variant="outline" size="1">
              <TrashIcon />
              Delete
            </Button>
            <Button className="bg-[#151B4A]" size="1" onClick={toggleDialog}>
              <PlusIcon />
              New
            </Button>
            <ActiveCodesetsDialogWidgetClient
              isDialogOpen={isDialogOpen}
              toggleDialog={toggleDialog}
              authorityId={assigningAuthority?.id as string}
            />
          </Flex>
        </Flex>
        <ActiveCodeActionNavbar />
        <Flex mt="1">
          <ActiveCodesetsTable />
        </Flex>
      </Flex>
    </ToastProvider>
  )
}

export { ActiveCodesetsListWidgetClient }
