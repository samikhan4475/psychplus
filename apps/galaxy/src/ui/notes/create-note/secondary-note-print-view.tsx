import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { Appointment, Cosigner } from '@/types'
import {
  BlockContainer,
  LabelAndValue,
} from '@/ui/quicknotes/actual-note-view/shared'
import { getPatientFullName } from '@/utils'
import { formatDateTime as globalFormateDateTime } from '@/utils/date'
import { formatDateTime } from './utils'

const fetchObjectByUserId = ({
  data,
  userId,
}: {
  data: Cosigner[]
  userId: string
}) => {
  return data.filter((item) => Number(item.userId) === Number(userId))
}

const SecondaryNotePrintView = ({
  appointment,
}: {
  appointment?: Appointment
}) => {
  const { getValues } = useFormContext()
  const data = getValues()
  const formattedDateTime = formatDateTime(data)
  const cosignerObject = fetchObjectByUserId({
    data: appointment?.cosigners ?? [],
    userId: data.cosigner,
  })

  return (
    <Box id="secondary-note-view-print" display="none">
      <BlockContainer>
        <LabelAndValue
          label={'DateTime: '}
          value={globalFormateDateTime(formattedDateTime)}
        />
        <LabelAndValue label={'Note Type: '} value={data.noteType} />
        <LabelAndValue label={'Note Title: '} value={data.noteTitle} />
        <LabelAndValue label={'Provider: '} value={appointment?.providerName} />
        <LabelAndValue
          label={'Cosigner: '}
          value={getPatientFullName(cosignerObject?.[0]?.legalName) ?? ''}
        />
        <LabelAndValue label={'Description: '} value={data.description} />
      </BlockContainer>
    </Box>
  )
}
export { SecondaryNotePrintView }
