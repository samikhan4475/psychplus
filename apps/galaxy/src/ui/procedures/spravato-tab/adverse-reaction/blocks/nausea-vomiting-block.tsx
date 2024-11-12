import { YesNoSelect } from '@/components'

const NauseaAndVomitingBlock = () => {
  return (
    <YesNoSelect
      label="Nausea/Vomiting"
      field="nauseaAndVomiting"
      required
      isNoFirst
    />
  )
}

export { NauseaAndVomitingBlock }
