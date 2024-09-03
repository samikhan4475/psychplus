import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { NOTES_WIDGET } from '..'
import { WidgetPortal } from '../components'

const NotesWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/notes?${searchParams.toString()}`}
      name={NOTES_WIDGET}
    />
  )
}

export { NotesWidget }
