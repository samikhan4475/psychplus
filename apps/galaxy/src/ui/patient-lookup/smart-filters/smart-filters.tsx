'use client'

import { Flex } from '@radix-ui/themes'
import { FileTypes } from '@/types'
import { DownloadButton } from '@/ui/schedule/components/header/download-button'
import { downloadPatientsListAction } from '../actions'
import { AddPatient } from '../add-patient-dialog'
import { useStore } from '../store'
import { transformOut } from '../transform'

const SmartFilters = () => {
  const { formValues } = useStore((state) => ({
    formValues: state.formValues,
  }))
  const handleDownload = () => {
    const sanitizedBody = transformOut(formValues || {})
    downloadPatientsListAction({
      type: FileTypes.Xlsx,
      params: sanitizedBody,
    })
  }

  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <AddPatient />
      <DownloadButton onClick={handleDownload} />
    </Flex>
  )
}

export { SmartFilters }
