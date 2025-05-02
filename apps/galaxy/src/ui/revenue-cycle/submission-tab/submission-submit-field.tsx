import React, { useEffect, useState } from 'react'
import { DateValue } from '@internationalized/date'
import { Button, Checkbox, Flex, Select } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getReceiverListOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { cn, formatDateToISOString, sanitizeFormData } from '@/utils'
import { ClaimSubmissionDialog } from '../dialogs'
import { useStore } from './store'
import { TabValue } from './types'
import { ViewHcfaButton } from './view-hcfa-button'

const SubmissionSubmitField = () => {
  const { claims, selectedTab, search, formValues } = useStore((state) => ({
    selectedTab: state.selectedTab,
    claims: state.data?.submissions,
    search: state.search,
    formValues: state.formValues,
  }))
  const [submissionTypes, setSubmissionTypes] = useState<SelectOptionType[]>([])
  const [clearingHouse, setClearingHouse] = useState('')
  const [isScrubOnly, setIsScrubOnly] = useState(false)
  useEffect(() => {
    getReceiverListOptionsAction().then((result) => {
      if (result.state === 'success') {
        setSubmissionTypes(result.data)
        if (result.data.length > 0) setClearingHouse(result.data[0].value)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])

  const onFormClose = async () => {
    const formattedData = {
      ...formValues,
      fromDate: formatDateToISOString(formValues?.fromDate as DateValue),
      toDate: formatDateToISOString(formValues?.toDate as DateValue),
    }
    const sanitizedData = sanitizeFormData(formattedData)

    await search(sanitizedData, 1, true)
  }

  return (
    <Flex align="center" gapX="2" className="ml-auto mr-[115px]">
      <FormFieldContainer className="flex-row items-center gap-x-2">
        <FormFieldLabel>Clearinghouse</FormFieldLabel>
        <Select.Root
          value={clearingHouse}
          size="1"
          onValueChange={(value) => setClearingHouse(value)}
        >
          <Select.Trigger
            disabled={submissionTypes.length === 0}
            placeholder="Please Select"
            className={cn('h-[var(--chip-height)] w-[122px]')}
          />
          <Select.Content position="popper" align="center" highContrast>
            {submissionTypes.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-x-2">
        <FormFieldLabel>Scrub Only</FormFieldLabel>
        <Checkbox
          checked={isScrubOnly}
          onCheckedChange={(checked) => setIsScrubOnly(!!checked)}
          highContrast
          className="cursor-pointer"
        />
      </FormFieldContainer>
      <ClaimSubmissionDialog
        claims={claims}
        isScrubOnly={isScrubOnly}
        clearingHouse={clearingHouse}
        onFormClose={onFormClose}
      >
        <Button
          variant="solid"
          size="1"
          highContrast
          className="disabled:text-white ml-1 h-[25px]"
          type="button"
          disabled={!clearingHouse}
        >
          Submit
        </Button>
      </ClaimSubmissionDialog>
      {selectedTab === TabValue.PaperSubmission && <ViewHcfaButton />}
    </Flex>
  )
}
export { SubmissionSubmitField }
