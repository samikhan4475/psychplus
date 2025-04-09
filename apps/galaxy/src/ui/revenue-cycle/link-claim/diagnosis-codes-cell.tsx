import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PatientAppointments } from '@/types'
import { cn } from '@/utils'

interface DiagnosisCodesCellProps {
  row: Row<PatientAppointments>
}

const DiagnosisCodesCell = ({ row }: DiagnosisCodesCellProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      )
    }
  }, [row])

  const textElement = (
    <Text
      ref={textRef}
      className={cn(
        'text-pp-black-3 line-clamp-1 w-[200px] select-text overflow-hidden text-ellipsis whitespace-pre-line',
      )}
      size="1"
      weight="regular"
    >
      {row.original.diagnoses?.join(', ') || ''}
    </Text>
  )

  return (
    <Flex className={cn('flex h-full w-[200px] flex-col justify-center')}>
      {isOverflowing ? (
        <Tooltip
          content={
            <Text className="select-text">
              {row.original.diagnoses?.join(', ') || ''}
            </Text>
          }
        >
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </Flex>
  )
}

export { DiagnosisCodesCell }
