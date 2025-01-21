'use client'

import { Button } from '@radix-ui/themes'

const MedicationSaveButton = ({
  isPatientAllergiesTab,
}: {
  isPatientAllergiesTab?: boolean
}) => {
  return (
    <Button
      type="submit"
      size="1"
      highContrast
      variant="outline"
      color="gray"
      className="text-black"
    >
      Save
    </Button>
  )
}
export { MedicationSaveButton }