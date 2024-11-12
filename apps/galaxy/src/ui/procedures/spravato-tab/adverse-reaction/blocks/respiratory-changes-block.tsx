import { YesNoSelect } from '@/components'

const RespiratoryChangesBlock = () => {
  return (
    <YesNoSelect
      label="Respiratory Changes"
      field="respiratoryChanges"
      required
      isNoFirst
    />
  )
}

export { RespiratoryChangesBlock }
