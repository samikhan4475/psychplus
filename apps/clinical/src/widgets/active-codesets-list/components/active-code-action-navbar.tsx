'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import z from 'zod'
import {
  addActiveCodeSetCode,
  updateActiveCode,
} from '@psychplus/codeset/api.client'
import { validate } from '@psychplus/form'
import { useToast } from '@psychplus/ui/toast-provider'
import { FilterForm } from '.'
import { useValidation } from '../hooks'
import { useStore } from '../store'
import { handleError } from '../utils'

const codeSchema = z.object({
  displayName: validate.requiredString,
  code: validate.requiredString,
})

type CodeSchemaType = z.infer<typeof codeSchema>

const ActiveCodeActionNavbar = () => {
  const {
    newCode,
    setNewCode,
    editableCode,
    codeSet,
    setCodeErrors,
    codeErrors,
    setCodeSet,
    assigningAuthority,
    setEditableCode,
  } = useStore((state) => ({
    newCode: state.newCode,
    setNewCode: state.setNewCode,
    editableCode: state.editableCode,
    codeSet: state.codeSet,
    setCodeErrors: state.setCodeErrors,
    codeErrors: state.codeErrors,
    assigningAuthority: state.assigningAuthority,
    setCodeSet: state.setCodeSet,
    setEditableCode: state.setEditableCode,
  }))

  const { validate: customValidate } = useValidation(
    codeSchema,
    setCodeErrors,
    codeErrors,
  )
  const { toast } = useToast()

  const handleAddCode = async () => {
    if (!newCode) return
    if (!assigningAuthority?.id || !codeSet?.id) {
      toast({ type: 'error', title: 'Missing required information' })
      return
    }
    if (!customValidate(newCode as CodeSchemaType)) return
    try {
      const [newlyAddedCode] = await addActiveCodeSetCode(
        assigningAuthority.id,
        codeSet.id,
        newCode,
      )

      if (!newlyAddedCode) return
      newlyAddedCode.codeAttributes = []
      const tempCodes = [newlyAddedCode, ...(codeSet?.codes ?? [])]

      setCodeSet({ ...codeSet, codes: tempCodes })

      toast({ type: 'success', title: 'Code added successfully' })
      setNewCode(null)
      setCodeErrors({})
    } catch (err: unknown) {
      const { status } = handleError(err, 'Something went wrong', toast)

      const errorFields: Record<string, string> = {
        code: 'Code found',
        displayName: 'Error in displayname',
      }

      if (status === 409) {
        delete errorFields.displayName
      }
      setCodeErrors(errorFields)
    }
  }

  const handleUpdateCode = async () => {
    if (!editableCode) return

    if (!assigningAuthority?.id || !codeSet?.id || !editableCode.id) {
      toast({ type: 'error', title: 'Missing required information' })
      return
    }

    if (!customValidate(editableCode as CodeSchemaType)) return

    const { id, ...tempEditableCode } = editableCode

    try {
      const updatedCode = await updateActiveCode(
        assigningAuthority.id,
        codeSet.id,
        id,
        tempEditableCode,
      )

      if (!updatedCode) return

      const { codes } = codeSet

      if (codes?.length) {
        setCodeSet({
          ...codeSet,
          codes:
            codes?.map((item) => (item.id === id ? updatedCode : item)) ?? [],
        })
      }
      toast({ type: 'success', title: 'Code updated successfully' })
      setEditableCode(null)
      setCodeErrors({})
    } catch (err: unknown) {
      const { status } = handleError(err, 'Something went wrong', toast)

      const errorFields: Record<string, string> = {
        code: 'Code found',
        displayName: 'Error in displayname',
      }

      if (status === 409) {
        delete errorFields.displayName
      }
      setCodeErrors(errorFields)
    }
  }

  const handleSubmit = () => {
    if (newCode !== null) {
      handleAddCode()
    } else if (editableCode !== null) {
      handleUpdateCode()
    } else {
      setNewCode({ code: '', displayName: '', codeAttributes: [] })
    }
  }
  return (
    <Flex my="2" justify="between" align="center">
      <Flex>
        <FilterForm />
        <Text className="ms-4 mt-1">Properties</Text>
      </Flex>
      <Flex>
        {codeSet && (
          <Button className="bg-[#151B4A]" size="1" onClick={handleSubmit}>
            <PlusIcon />
            {newCode !== null || editableCode !== null ? 'Save' : 'Code'}
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export { ActiveCodeActionNavbar }
