import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import { Flex, Text } from '@radix-ui/themes'
import { MoveVertical, StarIcon, Trash2 } from 'lucide-react'
import { useStore } from '../../store'

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
  } = useStore()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.index === source.index) return
    const updatedData = [...workingDiagnosisData]
    const [movedItem] = updatedData.splice(source.index, 1)
    updatedData.splice(destination.index, 0, movedItem)
    updateWorkingDiagnosisData(patientId, updatedData)
  }

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
            {workingDiagnosisData.map((item, index) => (
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
                        <MoveVertical strokeWidth="1" height="18" width="18" />
                        <Text className="text-[11px]">
                          {item.sectionItemValue}
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
                          stroke="#0F6CBD"
                          strokeWidth="1"
                          height="15"
                          width="15"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export { WorkingDiagnosisView }
