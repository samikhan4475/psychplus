import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Claim, ClaimNotesResponse } from '@/types'
import { cn } from '@/utils'

interface ClaimNotesCellProps {
  row: Row<ClaimNotesResponse>
}

const ClaimNotesCell = ({ row }: ClaimNotesCellProps) => {
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
        'text-pp-black-3 line-clamp-2 w-[300px] select-text overflow-hidden text-ellipsis whitespace-pre-line',
      )}
      size="1"
      weight="regular"
    >
      {row.original.note}
    </Text>
  )

  return (
    <Flex className={cn('flex h-full w-[300px] flex-col justify-center')}>
      {isOverflowing ? (
        <Tooltip
          content={<Text className="select-text"> {row.original.note}</Text>}
        >
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </Flex>
  )
}

export { ClaimNotesCell }
