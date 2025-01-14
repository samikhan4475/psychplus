'use client'

import { Button } from '@radix-ui/themes'

const AllergySaveButton = ({
  isPatientAllergiesTab,
}: {
  isPatientAllergiesTab?: boolean
}) => {
  return !isPatientAllergiesTab ? (
    <Button type="submit" size="1" highContrast>
      Save
    </Button>
  ) : (
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
export { AllergySaveButton }
