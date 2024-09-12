import React, { useState } from 'react'
import {
  MinusCircledIcon,
  PlusCircledIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  CustomAccordionProps,
} from '../types'

const Accordion = ({ children }: AccordionProps) => {
  return <Box className="rounded-2 border border-[#DDDDE3]">{children}</Box>
}
// AccordionSummary
const AccordionSummary = ({
  children,
  onClick,
  handlerDelete,
  isOpen,
}: AccordionSummaryProps) => {
  return (
    <Box className="flex cursor-pointer items-center justify-between p-2">
      <Box className="flex items-center gap-2">
        {isOpen ? (
          <MinusCircledIcon onClick={onClick} />
        ) : (
          <PlusCircledIcon onClick={onClick} />
        )}
        {children}
      </Box>
      {handlerDelete && typeof handlerDelete === 'function' && (
        <TrashIcon onClick={handlerDelete} className="ml-2 cursor-pointer" />
      )}
    </Box>
  )
}

const AccordionDetails = ({ children, isOpen }: AccordionDetailsProps) => {
  return <Box className={`p-2 ${isOpen ? 'block' : 'hidden'}`}>{children}</Box>
}

const CustomsAccordion = ({
  title,
  children,
  handlerDelete,
  sno,
  isNew = false,
  type,
}: CustomAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Accordion>
      <AccordionSummary
        handlerDelete={handlerDelete}
        sno={sno}
        onClick={handleToggle}
        isOpen={isOpen}
      >
        {type === 'Specimen' && (
          <Text size="1" weight="medium">
            {isNew ? 'Create' : 'Edit'} {title} {sno + 1}
          </Text>
        )}
        {type === 'test' && (
          <Text size="1" weight="medium">
            {title}
          </Text>
        )}
      </AccordionSummary>
      <AccordionDetails isOpen={isOpen}>{children}</AccordionDetails>
    </Accordion>
  )
}

export { CustomsAccordion }
