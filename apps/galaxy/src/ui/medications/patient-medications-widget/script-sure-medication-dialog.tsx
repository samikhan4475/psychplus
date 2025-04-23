'use client'

import { PropsWithChildren } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useGetScriptSureIframeUrl } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { PatientMedicationIframe } from './patient-medication-iframe'
import { useStore } from './store'

const ScriptSureMedicationDialog = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const { id } = useParams<{ id: string }>()
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  const { constant } = useGlobalStore((state) => ({
    constant: state.constants,
  }))
  const { iframeUrl, loading } = useGetScriptSureIframeUrl(
    id,
    constant.scriptsureBaseApplicationUrl,
    'drug-list',
  )


  return (
    <Dialog.Root>
      {children}
      <Dialog.Content className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            {title}
          </Dialog.Title>
          <Dialog.Close
            className="cursor-pointer"
            onClick={() => refetch(isQuickNoteSection)}
          >
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <PatientMedicationIframe iframeSrc={iframeUrl} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScriptSureMedicationDialog }
