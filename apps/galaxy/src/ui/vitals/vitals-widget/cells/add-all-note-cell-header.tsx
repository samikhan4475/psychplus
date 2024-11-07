import { CheckboxCell } from '@/components'
import { useStore } from '../store'

const AddAllToNoteCellHeader = () => {
  const { data, handleCheckAll } = useStore((state) => ({
    handleCheckAll: state.handleCheckAll,
    data: state.data,
  }))

  if (!data) {
    return null
  }

  const activeVitals = data.filter((item) => item.recordStatus === 'Active')
  const allChecked =
    activeVitals.length > 0
      ? activeVitals.every((item) => item.addToNote)
      : false

  return (
    <CheckboxCell
      label="Add to Note"
      className="whitespace-nowrap font-[500]"
      checked={allChecked}
      disabled={activeVitals.length === 0}
      onCheckedChange={handleCheckAll}
    />
  )
}

export { AddAllToNoteCellHeader }
