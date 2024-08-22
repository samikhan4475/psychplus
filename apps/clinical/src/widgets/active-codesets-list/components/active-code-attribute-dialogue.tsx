import React, { memo, useEffect, useRef, useState } from 'react'
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import z from 'zod'
import { ActiveCode } from '@psychplus/codeset'
import {
  addActiveCodeAttribute,
  getActiveCodeAttributes,
  updateActiveCodeAttribute,
} from '@psychplus/codeset/api.client'
import { validate } from '@psychplus/form'
import { WidgetLoading } from '@psychplus/widgets/components'
import { useValidation } from '../hooks'
import { useStore } from '../store'
import { handleError } from '../utils'
import { ActiveCodeAttributesTable } from './code-attribute-form'

interface ActiveCodeAttributeDialogClientProps {
  isDialogOpen: boolean
  toggleDialog: () => void
  data: Partial<ActiveCode>
}
const attributeSchema = z.object({
  name: validate.requiredString,
  content: validate.requiredString,
})

type AttributeSchemaType = z.infer<typeof attributeSchema>

const AttributeDialog = memo(
  ({
    isDialogOpen,
    toggleDialog,
    data,
  }: ActiveCodeAttributeDialogClientProps) => {
    const { toast } = useToast()
    const {
      assigningAuthority,
      codeSet,
      setCodeErrors,
      namespace,
      setNewAttribute,
      newAttribute,
      editableAttribute,
      setEditableAttribute,
      setAttributeErrors,
      attributeErrors,
      attributes,
      setEditableCode,
      setAttributes,
    } = useStore((state) => ({
      codeSet: state.codeSet,
      setEditableCode: state.setEditableCode,
      setCodeErrors: state.setCodeErrors,
      editableCode: state.editableCode,
      assigningAuthority: state.assigningAuthority,
      setCodeSet: state.setCodeSet,
      namespace: state.namespace,
      setNewAttribute: state.setNewAttribute,
      newAttribute: state.newAttribute,
      editableAttribute: state.editableAttribute,
      setAttributeErrors: state.setAttributeErrors,
      attributeErrors: state.attributeErrors,
      attributes: state.attributes,
      setAttributes: state.setAttributes,
      setEditableAttribute: state.setEditableAttribute,
    }))

    const { validate: customValidate } = useValidation(
      attributeSchema,
      setAttributeErrors,
      attributeErrors,
    )
    const [isLoading, setIsLoading] = useState(false)

    const fetchCalled = useRef<boolean>(false)

    const fetchAttributes = async () => {
      setIsLoading(true)
      if (!namespace || !codeSet?.codeSystemName || !data.code || isLoading)
        return

      try {
        const attributesData = await getActiveCodeAttributes(
          namespace,
          codeSet.codeSystemName,
          data.code,
        )

        if (!attributesData) return

        setAttributes(attributesData)
      } catch (err) {
        if (err instanceof Error) {
          toast({ type: 'error', title: err.message })
        } else {
          toast({ type: 'error', title: 'An unknown error occurred' })
        }
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      if (fetchCalled.current || !data.id) return
      fetchCalled.current = true
      fetchAttributes()
    }, [])

    const handleAddAttribute = () => {
      setNewAttribute({ content: '', name: '' })
      setAttributeErrors({})
      setEditableAttribute(null)
    }

    const handleCreateAttribute = async () => {
      if (!newAttribute) return
      if (!assigningAuthority?.id || !codeSet?.id || !data?.id) {
        toast({ type: 'error', title: 'Missing required information' })
        return
      }
      if (!customValidate(newAttribute as AttributeSchemaType)) return

      try {
        const [newlyAddedAttribute] = await addActiveCodeAttribute(
          assigningAuthority.id,
          codeSet?.id,
          data?.id,
          newAttribute,
        )

        if (!newlyAddedAttribute) return

        setNewAttribute(null)
        setAttributeErrors({})
        setAttributes([newlyAddedAttribute, ...(attributes ?? [])])
        toast({ type: 'success', title: 'Attribute added successfully' })
      } catch (err: unknown) {
        const { status } = handleError(err, 'Something went wrong', toast)

        const errorFields: Record<string, string> = {
          name: 'Name found',
          content: 'Error in content',
        }

        if (status === 409) {
          delete errorFields.content
        }
        setAttributeErrors(errorFields)
      }
    }

    const handleUpdateAttribute = async () => {
      if (!editableAttribute) return
      if (
        !assigningAuthority?.id ||
        !codeSet?.id ||
        !data?.id ||
        !editableAttribute.id
      ) {
        toast({ type: 'error', title: 'Missing required information' })
        return
      }
      if (!customValidate(editableAttribute as AttributeSchemaType)) return

      try {
        const updatedAttribute = await updateActiveCodeAttribute(
          assigningAuthority.id,
          codeSet.id,
          data?.id,
          editableAttribute.id,
          { ...editableAttribute, codeId: data?.id },
        )
        if (!updatedAttribute) return

        if (attributes?.length) {
          const updateAttributes =
            attributes?.map((item) =>
              item.id === editableAttribute?.id ? updatedAttribute : item,
            ) ?? []

          setAttributes(updateAttributes)
        }
        toast({ type: 'success', title: 'Attribute updated successfully' })
        setEditableAttribute(null)
        setAttributeErrors({})
      } catch (err: unknown) {
        const { status } = handleError(err, 'Something went wrong', toast)

        const errorFields: Record<string, string> = {
          name: 'Name found',
          content: 'Error in content',
        }

        if (status === 409) {
          delete errorFields.content
        }
        setAttributeErrors(errorFields)
      }
    }

    const handleSave = async () => {
      if (newAttribute !== null) {
        handleCreateAttribute()
      } else {
        handleUpdateAttribute()
      }
    }

    return (
      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(dialogNewState) => {
          if (!dialogNewState && isDialogOpen) {
            toggleDialog()
            setEditableCode(null)
            setCodeErrors({})
            setAttributeErrors({})
            setAttributes([])
            setNewAttribute(null)
            setEditableAttribute(null)
          }
        }}
      >
        <Dialog.Content className="relative max-w-[720px] p-12">
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
            <Cross2Icon />
          </Dialog.Close>
          <Dialog.Title size="8">Manage Attributes</Dialog.Title>
          {isLoading ? (
            <WidgetLoading />
          ) : (
            <Box mt="4">
              <Flex justify="end" align="center">
                <Button
                  className="mb-2 cursor-pointer"
                  onClick={handleAddAttribute}
                  disabled={!!newAttribute}
                >
                  <PlusCircledIcon />
                  <Text className="ms-2">Add Attribute</Text>
                </Button>
              </Flex>
              <ActiveCodeAttributesTable codeId={data?.id as string} />

              {newAttribute || editableAttribute ? (
                <Box className="mt-9 flex justify-end">
                  <Button
                    className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Box>
              ) : null}
            </Box>
          )}
        </Dialog.Content>
      </Dialog.Root>
    )
  },
)

// Display name

AttributeDialog.displayName = 'AttributeDialog'

export { AttributeDialog }
