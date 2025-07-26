'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { PatientReferral, SelectOptionType } from '@/types'
import { getVisitTypesAction } from '@/ui/location/service/actions'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { PermissionAlert } from '@/ui/schedule/shared'
import { EDIT_VISIT_TYPE_STATUS } from '../constants'
import { HxCellButton } from '../hx-cell-button'
import { useStore } from '../store'

const VisitTypeCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hasPermission = useHasPermission('changeVisitTypeIntReferralTab')
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState(
    referral?.visitTypeId ? `${referral?.visitTypeId}` : '',
  )
  const [visitTypes, setVisitTypes] = useState<SelectOptionType[]>([])

  useEffect(() => {
    if (referral.service && selectedValue) {
      setLoading(true)
      setVisitTypes([])
      getVisitTypesAction(referral.service).then((res) => {
        if (res.state === 'error') {
          setVisitTypes([])
          return toast.error(res.error || 'Failed to fetch visit types')
        }

        const visitTypesList: SelectOptionType[] = res.data.map((item) => ({
          label: item.encounterName,
          value: `${item.id}`,
        }))
        setVisitTypes(visitTypesList)
        setLoading(false)
      })
    }
  }, [referral.service])

  const updateReferralVisitType = async (value: string) => {
    if (!hasPermission) {
      setIsOpen(true)
      return
    }
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      visitTypeId: value,
    })
    if (result.state === 'error') {
      setSelectedValue(`${referral?.visitTypeId}`)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          visitTypeId: value,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    toast.success('Successfully updated!')
  }

  return (
    <Flex gap="2" align="center" direction="row">
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={EDIT_VISIT_TYPE_STATUS}
      />
      <HxCellButton
        referral={referral}
        cellName="visitType"
        visitTypes={visitTypes}
      />
      <StatusSelect
        value={selectedValue}
        onValueChange={updateReferralVisitType}
        options={visitTypes}
        disabled={loading}
        className="w-[200px]"
      />
    </Flex>
  )
}

export { VisitTypeCell }
