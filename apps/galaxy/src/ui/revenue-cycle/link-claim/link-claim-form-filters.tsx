'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { Claim } from '@/types'
import { sanitizeFormData } from '@/utils'
import { useStore } from './store'
import { VisitNumberInput } from './visit-number-input'

interface LinkClaimFormFilterProps {
  data: Claim
}

const schema = z.object({
  visitnumber: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const LinkClaimFormFilter = ({ data }: LinkClaimFormFilterProps) => {
  const { patientId } = data
  const { loading, fetchAppointments } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchAppointments: state.fetchAppointments,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      visitnumber: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      visitnumber: '',
    })
    const payload = {
      appointmentStatuses: ['CheckedOut'],
      patientIds: [patientId],
    }
    return fetchAppointments(payload)
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const cleanedData = sanitizeFormData(data)
    const payload = {
      appointmentIdList: [cleanedData.visitnumber],
      appointmentStatuses: ['CheckedOut'],
      patientIds: [patientId],
    }
    return fetchAppointments(payload)
  }

  return (
    <FormContainer
      className="bg-white ml-2 mt-2 flex-row flex-wrap gap-1.5"
      form={form}
      onSubmit={onSubmit}
    >
      <VisitNumberInput />
      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        onClick={onClear}
      >
        Clear
      </Button>
      <Button highContrast size="1" type="submit" disabled={loading}>
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { LinkClaimFormFilter, type SchemaType }
