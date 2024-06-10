import { Dialog } from '@psychplus/ui/dialog'
import { Submitter } from './submitter'
import { useEffect, useState, useCallback } from 'react'
import { getReceivers } from '../../api.client'

interface IOptions {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  submitterId?: string;
  contactPerson?: string;
  phone?: string;
  fax?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  id?: string;
}
const AddDialog = (props: { open: boolean; setDialogOpen: (flg: boolean) => void, refresh: () => void, optionalData: IOptions }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [options, setOptions] = useState<{id: string, receiverName: string}[]>([])

  useEffect(() => {
    setIsDialogOpen(props.open);
  }, [props.open])

  const fetchData = useCallback(() => {
    getReceivers()
    .then(response => response.json())
    .then(response => {
      const data: {id: string, receiverName: string}[] = []
      response.forEach((response: {id: string, receiverName: string}) => {
        data.push({
          id: response.id,
          receiverName: response.receiverName
        })
      });
      setOptions(data)
    })
  }, [])

  useEffect(() => {
    if (!isDialogOpen) {
      props.setDialogOpen(isDialogOpen);
    }

    if (isDialogOpen) {
      fetchData()
    }
  }, [isDialogOpen])

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Content className="max-w-[600px] z-100">
        <Dialog.Title>Add Submitter</Dialog.Title>
        <Submitter options={options} refresh={() => {
          setIsDialogOpen(false)
          props.refresh()
        }} optionalData={props.optionalData} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddDialog }
