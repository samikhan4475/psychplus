import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import { Flex, Text } from '@radix-ui/themes'
import { MoveVertical, StarIcon, Trash2 } from 'lucide-react'
import { useStore } from '../../store'
import { QuickNoteSectionItem } from '@/types'

interface WorkingDiagnosisViewProps {
  patientId: string
  width?: string
}

const WorkingDiagnosisView = ({
  width,
  patientId,
}: WorkingDiagnosisViewProps) => {
  const {
    workingDiagnosisData,
    updateWorkingDiagnosisData,
    deleteWorkingDiagnosis,
    markDiagnosisFavorites,
    favouriteDiagnosisData,
    unmarkDiagnosisFavorites
  } = useStore()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.index === source.index) return
    const updatedData = [...workingDiagnosisData]
    const [movedItem] = updatedData.splice(source.index, 1)
    updatedData.splice(destination.index, 0, movedItem)
    updateWorkingDiagnosisData(patientId, updatedData)
  }

  const isItemFavorite = (sectionItemValue: string) => {
    return favouriteDiagnosisData.some((fav) => fav.description === sectionItemValue)
  }

  const markAsFavorite = (icdCodeId: string, item: QuickNoteSectionItem) => {
    markDiagnosisFavorites(icdCodeId, item);
  };

  const unmarkAsFavorite = (icdCodeId: string, itemId: string) => {
    unmarkDiagnosisFavorites(icdCodeId, itemId);
  };


  const handleFavoriteToggle = (icdCodeId: string, item: QuickNoteSectionItem) => {
    if (isItemFavorite(item.sectionItemValue)) {
      unmarkAsFavorite(icdCodeId, item.id!);
    } else {
      markAsFavorite(icdCodeId, item);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="WorkingDiagnosis">
        {(provided) => (
          <Flex
            direction="column"
            p="2"
            gap="2"
            width={width || '100%'}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {workingDiagnosisData.map((item, index) => {
              const icdCodeId = item?.sectionItemValue?.split(' ')[0]
              const isFavourite = isItemFavorite(item.sectionItemValue)
              return (
                <Draggable
                  key={item.sectionItem}
                  draggableId={item.sectionItem}
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
                            {item.sectionItemValue}
                          </Text>
                          <Text className="text-[11px]">
                            {item.encounterType}
                          </Text>
                        </Flex>
                        <Flex align="center" gap="2">
                          <Trash2
                            height="14"
                            width="14"
                            cursor="pointer"
                            onClick={() =>
                              deleteWorkingDiagnosis(patientId, index)
                            }
                          />
                          <StarIcon
                            stroke={isFavourite ? '#A0B6DC' : '#0F6CBD'}
                            {...(isFavourite ? { fill: '#A0B6DC' } : {})}
                            strokeWidth="1"
                            cursor="pointer"
                            height="15"
                            width="15"
                            onClick={() =>
                              handleFavoriteToggle(icdCodeId, item)
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
  )
}

export { WorkingDiagnosisView }
