import { RadioSelectSection, YesNoSelect } from '@/components'

const BLOCK_ID = 'biteblock'
const BLOCK_LABEL = 'Bite Block'


const BLOCK_OPTIONS = [
  {
    label: 'No',
    value: 'no',
  },
  {
    label: 'Yes',
    value: 'yes',
  },
  
]

const BiteBlock = () => {
  return (
    <YesNoSelect
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      label={BLOCK_LABEL}
      required={true}
    />
  )
}

export { BiteBlock }
