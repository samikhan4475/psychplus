import { FormFieldError, YesNoSelect } from '@/components'

const BLOCK_ID = 'biteblock'
const BLOCK_LABEL = 'Bite Block'

const BLOCK_OPTIONS = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  }
]

const BiteBlock = () => {
  return (
    <>
      <YesNoSelect
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        required={true}
      />
      <FormFieldError name={BLOCK_ID} />
    </>
  )
}

export { BiteBlock }
