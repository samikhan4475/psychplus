'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'
import { RelationshipData } from '@psychplus-v2/types'
import {deleteRelationship} from '../../../actions/delete-relationship'

interface DeleteRelationshipProps {
  data: RelationshipData | undefined;
  setDeleteItem: React.Dispatch<React.SetStateAction<RelationshipData | undefined>>;
}

const DeleteRelationship = ({ data, setDeleteItem}: DeleteRelationshipProps) => {
  const [error, setError] = useState<string>()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

const open = !!data
const onConfirm = async () => {
  if (!data) return
  setLoading(true)
  try {
    const result = await deleteRelationship(data)
    if (result.state === 'success') {
      toast({
        type: 'success',
        title: 'Relationship Deleted',
      })
      setDeleteItem(undefined) 
      router.refresh()
    } else {
      setError(result.error)
    }
  } catch (err) {
    setError('An unexpected error occurred.')
  } finally {
    setLoading(false)
  }
}

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && setDeleteItem(undefined)}>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Delete Relationship
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3" className="text-slate-11">
          Are you sure you want to delete this Relationship?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              No, keep Relationship
            </Button>
          </Dialog.Close>
          <Button
            color="tomato"
            type="submit"
            disabled={loading}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteRelationship }
