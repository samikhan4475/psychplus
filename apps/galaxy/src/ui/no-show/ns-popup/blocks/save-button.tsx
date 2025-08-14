'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const SaveButton = () => {
  const form = useFormContext()

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext()

  const formValues = watch()

  const isSubmitDisabled =
    !(
      formValues?.safetyConcernQ3 === 'no' ||
      formValues?.welfareCheckDoneQ4 === 'yes' ||
      formValues?.patientEducatedQ6 === 'yes'
    ) || isSubmitting

  return (
    <Button
      type="submit"
      size="1"
      highContrast
      disabled={isSubmitDisabled}
      loading={form.formState.isSubmitting}
      className=" w-[100px] self-end"
    >
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { SaveButton }
