import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getPreferenceSettings } from '@/ui/staff-preferences/client-actions'
import { updateAutoRebookingStatuses } from './actions'
import { AutoRebookingHeader } from './auto-rebooking-header'
import { AutoRebookingTable } from './auto-rebooking-table'
import { transformIn, transformOut } from './transform'
import { ServiceVisit } from './types'

const AutoRebookingTabView = () => {
  const [tableData, setTableData] = useState<ServiceVisit[]>([])

  const updateCheckboxState = (targetId: string, newChecked: boolean) => {
    const updateData = (items: ServiceVisit[]): ServiceVisit[] => {
      return items.map((item) => {
        if (item.id === targetId) {
          // Update the target item and all its children
          const updatedItem = {
            ...item,
            checked: newChecked,
            subRows: item.subRows?.map((subRow) => ({
              ...subRow,
              checked: newChecked,
            })),
          }
          return updatedItem
        }

        // If this item has children, check if any child matches the target
        if (item.subRows && item.subRows.length > 0) {
          const updatedSubRows = item.subRows.map((subRow) => {
            if (subRow.id === targetId) {
              return { ...subRow, checked: newChecked }
            }
            return subRow
          })

          const allChildrenChecked = updatedSubRows.every(
            (subRow) => subRow.checked,
          )

          return {
            ...item,
            subRows: updatedSubRows,
            checked: allChildrenChecked,
          }
        }

        return item
      })
    }

    setTableData(updateData(tableData))
  }

  const handleSave = async () => {
    const response = await updateAutoRebookingStatuses(transformOut(tableData))
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Auto Rebooking updated')
  }

  const fetchAutoRebookingStatuses = async () => {
    const response = await getPreferenceSettings({
      categoryValue: 'Autorebooking',
    })
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    setTableData(transformIn(response.data))
  }

  useEffect(() => {
    fetchAutoRebookingStatuses()
  }, [])

  return (
    <>
      <AutoRebookingHeader onClickHandler={handleSave} />
      <AutoRebookingTable
        data={tableData}
        updateCheckboxState={updateCheckboxState}
      />
    </>
  )
}

export { AutoRebookingTabView }
