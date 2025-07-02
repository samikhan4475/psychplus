'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionResult } from '@psychplus-v2/api'
import { FormContainer } from '@psychplus-v2/components'
import { recursiveSanitize } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToast } from '@/providers'
import { uploadExternalReferralFileAction } from '../actions'
import {
  AddPatientExternalReferralClient,
  LinkExternalReferralsAttachmentsClientAction,
} from '../client-actions'
import { AddReferralResponse, ExternalReferralDocument } from '../types'
import { addExtReferralInitialValues, transformOut } from '../utils'
import { AppointmentDetail } from './appointment-detail'
import { PatientInformation } from './patient-information'
import { ReferrerInformation } from './referrer-information'
import { schema, SchemaType } from './schema'
import { SubmitButtonBlock } from './submit-button-block'

interface AddExtReferralFormProps {
  scrollToTop?: () => void
}
const AddExtReferralForm = ({ scrollToTop }: AddExtReferralFormProps) => {
  const { toast } = useToast()
  const [fileResetCounter, setFileResetCounter] = useState(0)
  const [facesheetFile, setFacesheetFile] = useState<File | undefined>(
    undefined,
  )
  const [summaryFile, setSummaryFile] = useState<File | undefined>(undefined)
  const searchParams = useSearchParams()
  const shortName = searchParams.get('referrerShortName') ?? undefined

  console.log(shortName, 'short')
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: addExtReferralInitialValues(shortName),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const { requestedServices, ...sanitizedWithoutServices } =
      recursiveSanitize(transformOut(data))

    const services = requestedServices ?? []

    const referralTasks: (() => Promise<ActionResult<AddReferralResponse>>)[] =
      []

    services.length > 0
      ? services.map((service) => {
          referralTasks.push(() =>
            AddPatientExternalReferralClient({
              ...sanitizedWithoutServices,
              requestedService: service,
            }),
          )
        })
      : referralTasks.push(() =>
          AddPatientExternalReferralClient(sanitizedWithoutServices),
        )

    const created = await Promise.all(referralTasks.map((fn) => fn()))

    const error = created.find((r) => r.state === 'error')
    if (error) {
      scrollToTop?.()
      toast({
        type: 'error',
        title: error.error,
      })
      return
    }

    const referrals = created as { state: 'success'; data: { id: string } }[]

    const firstReferral = referrals[0].data
    const uploadedFiles: {
      file: File
      documentType: ExternalReferralDocument
    }[] = []

    if (facesheetFile) {
      uploadedFiles.push({
        file: facesheetFile,
        documentType: ExternalReferralDocument.Facesheet,
      })
    }

    if (summaryFile) {
      uploadedFiles.push({
        file: summaryFile,
        documentType: ExternalReferralDocument.ResultsPdf,
      })
    }

    const linkTasks: (() => Promise<ActionResult<void>>)[] = []

    for (const { file, documentType } of uploadedFiles) {
      const formData = new FormData()
      formData.append('file', file)

      const uploadResult = await uploadExternalReferralFileAction({
        data: formData,
        externalReferralId: firstReferral.id,
        documentType,
      })

      if (uploadResult.state === 'error') {
        scrollToTop?.()
        toast({
          type: 'error',
          title: uploadResult.error,
        })
        return
      }

      const attachmentId = uploadResult.data?.id

      for (const referral of referrals.slice(1)) {
        linkTasks.push(() =>
          LinkExternalReferralsAttachmentsClientAction({
            externalReferralId: referral.data.id,
            externalReferralAttachmentId: attachmentId,
          }),
        )
      }
    }

    // Link all attachments to remaining referrals

    if (linkTasks.length) {
      const linkResults = await Promise.all(linkTasks.map((fn) => fn()))
      const linkError = linkResults.find((r) => r.state === 'error')
      if (linkError) {
        scrollToTop?.()
        toast({
          type: 'error',
          title: linkError.error,
        })
        return
      }
    }

    toast({ type: 'success', title: 'Referrals created successfully' })
    scrollToTop?.()
    // Reset files if they exist
    if (facesheetFile || summaryFile) {
      setFacesheetFile(undefined)
      setSummaryFile(undefined)
      setFileResetCounter((c) => c + 1)
    }
    form.reset(addExtReferralInitialValues(shortName))
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4">
        <PatientInformation />
        <AppointmentDetail
          onFaceSheetFileChange={setFacesheetFile}
          onFileChange={setSummaryFile}
          fileResetCounter={fileResetCounter}
        />
        <ReferrerInformation />
        <SubmitButtonBlock />
      </Flex>
    </FormContainer>
  )
}

export { AddExtReferralForm }
