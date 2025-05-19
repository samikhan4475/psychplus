import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import { Flex, Text } from '@radix-ui/themes'
import { MoveVertical, StarIcon, Trash2 } from 'lucide-react'
import { LoadingPlaceholder } from '@/components'
import { useHasPermission } from '@/hooks'
import { DiagnosisIcd10Code } from '@/types'
import { useDebouncedDiagnosisQuickNoteSave } from '@/ui/diagnosis/diagnosis/hooks'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { useStore } from '../store'

interface DiagnosisListProps {
  width?: string
}

const DiagnosisList = ({ width = '100%' }: DiagnosisListProps) => {
  const [isOpen, setIsOpen] = useState({
    show: false,
    message: '',
  })
  const {
    workingDischargeDiagnosisData,
    updateWorkingDischargeDiagnosisData,
    markDiagnosisFavorites,
    favouriteDiagnosisData,
    loadingWorkingDiagnosis,
  } = useStore()
  const { id: patientId, apptId = '' } = useParams<{
    id: string
    apptId: string
  }>()
  const { isQuickNoteView, updateActualNoteWidgetsData } = useQuickNoteUpdate()

  const debouncedDiagnosisSave = useDebouncedDiagnosisQuickNoteSave(
    patientId,
    updateActualNoteWidgetsData,
    QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
    100,
    apptId,
  )
  const hasPermissionDelete = useHasPermission(
    'deleteDiagnosisWorkingDiagnosisTab',
  )
  const hasPermissionFavourite = useHasPermission(
    'addDiagnosisWorkingDiagnosisTab',
  )
  const hasPermissionRemoveFavourite = useHasPermission(
    'removeFavoriteDiagnosisWorkingDiagnosisTab',
  )

  const showPermissionError = (message: string) => {
    setIsOpen({
      show: true,
      message,
    })
  }

  const onTrashClick = (item: DiagnosisIcd10Code) => {
    if (!hasPermissionDelete) {
      showPermissionError(
        'You do not have permission to remove this diagnosis. Please contact your supervisor if you need any further assistance',
      )
      return
    }

    const updatedData = workingDischargeDiagnosisData?.filter(
      (diagnose) => diagnose.code !== item.code,
    )
    updateWorkingDischargeDiagnosisData(updatedData)
    if (isQuickNoteView) {
      debouncedDiagnosisSave(updatedData)
    }
  }

  const onFavouriteClick = (item: DiagnosisIcd10Code, isFavourite: boolean) => {
    if (isFavourite && !hasPermissionRemoveFavourite) {
      showPermissionError(
        'You do not have permission to remove from favourite. Please contact your supervisor if you need any further assistance',
      )
      return
    }
    if (!isFavourite && !hasPermissionFavourite) {
      showPermissionError(
        'You do not have permission to add as favourite. Please contact your supervisor if you need any further assistance',
      )
      return
    }
    markDiagnosisFavorites(item, item.code, !isFavourite)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.index === source.index) return
    const updatedData = [...workingDischargeDiagnosisData]
    const [movedItem] = updatedData.splice(source.index, 1)
    updatedData.splice(destination.index, 0, movedItem)
    updateWorkingDischargeDiagnosisData(updatedData)
     if (isQuickNoteView) {
      debouncedDiagnosisSave(updatedData)
    }
  }

  const isItemFavorite = (code: string) => {
    return favouriteDiagnosisData.some((fav) => fav.icd10Code === code)
  }

  if (loadingWorkingDiagnosis) {
    return (
      <Flex direction="column" p="5" gap="2" width={width}>
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="WorkingDiagnosis">
          {(provided) => (
            <Flex
              direction="column"
              p="2"
              gap="2"
              width={width}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {workingDischargeDiagnosisData.map((item, index) => {
                const isFavourite = isItemFavorite(item.code)
                return (
                  <Draggable
                    key={item.code}
                    draggableId={item.code}
                    index={index}
                  >
                    {(provided) => (
                      <Flex
                        className="bg-white cursor-default"
                        gap="2"
                        align="center"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Text weight="medium" className="text-[11px]">
                          {index + 1}.
                        </Text>
                        <Flex
                          align="center"
                          justify="between"
                          width="100%"
                          className="drag border-pp-focus-bg rounded-2 border"
                          px="2"
                          py="1"
                        >
                          <Flex align="center" gap="2">
                            <MoveVertical
                              strokeWidth="1"
                              height="18"
                              width="18"
                            />
                            <Text className="text-[11px]">
                              {item.code} {item.description}
                            </Text>
                          </Flex>
                          <Flex align="center" gap="2">
                            <Trash2
                              height="14"
                              width="14"
                              cursor="pointer"
                              onClick={() => onTrashClick(item)}
                            />
                            <StarIcon
                              stroke={isFavourite ? '#A0B6DC' : '#0F6CBD'}
                              {...(isFavourite ? { fill: '#A0B6DC' } : {})}
                              strokeWidth="1"
                              height="15"
                              width="15"
                              cursor="pointer"
                              onClick={() =>
                                onFavouriteClick(item, isFavourite)
                              }
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
      <PermissionAlert
        message={isOpen.message}
        isOpen={isOpen.show}
        onClose={() => setIsOpen({ show: false, message: '' })}
      />
    </>
  )
}

export { DiagnosisList }
