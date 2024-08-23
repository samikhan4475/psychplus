import { YesNoSelect } from '@/components'

const BLOCK_ID = 'employed'

const BLOCK_TITLE = 'Employed'

const EmployedBlock = () => {
  return <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
}

export { EmployedBlock }
