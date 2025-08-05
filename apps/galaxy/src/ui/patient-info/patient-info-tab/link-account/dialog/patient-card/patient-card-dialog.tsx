'use client'

import { ShuffelIcon } from '@/components/icons'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { cn, formatDateTime } from '@/utils'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  getPatientLinksAction,
  getPatientProfileAction,
  LinkPatientAccountAction,
} from '../../actions'
import { useStore } from '../../store'
import { LinkAccountSchemaType } from '../filters'
import { PatientCard } from './patient-card'

interface AddAccountLinkDialogProps {
  survivorPatientId: string
  nonSurvivorPatientId: string
}
const PatientCardDialog = ({
  survivorPatientId,
  nonSurvivorPatientId,
}: AddAccountLinkDialogProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useFormContext<LinkAccountSchemaType>()
  const [loading, setLoading] = useState(false)
  const codes = useCodesetCodes(CODESETS.PatientLinkSection)

  const [openDialog, setOpenDialog] = useState(false)
  const [lastLoginDT, setLastLoginDT] = useState<string>('')
  const selectedPatientsforLinking = [survivorPatientId, nonSurvivorPatientId]
  const handleCloseModal = (openDialog: boolean) => {
    if (openDialog) {
      handleCheckPatientLink()
      return
    }
    setOpenDialog(openDialog)
  }

  const handleCheckPatientLink = async () => {
     if(survivorPatientId === nonSurvivorPatientId)
      return toast.error('A patient cannot be linked to itself')
      
    const result = await getPatientLinksAction(nonSurvivorPatientId, true)
    if (result.state === 'success') {
      if (result.data.length > 0) {
        toast.error('The Account is already linked.')
      } else {
        fetchPatientProfile()
        setOpenDialog(true)
      }
    }
  }
  const handleLinkPatient = async () => {
    setLoading(true)
    const transformedArray = codes.map((item) => ({
      sectionName: item.value,
      selectedPatientId: survivorPatientId,
    }))
    const result = await LinkPatientAccountAction({
      survivorPatientId: survivorPatientId,
      nonSurvivorPatientId: nonSurvivorPatientId,
      payload: transformedArray,
    })
    setLoading(false)
    if (result.state === 'error') {
      toast.error(result?.error || 'Failed to link patients')
      return
    }
    toast.success('Patients linked successfully')
    handleCloseModal(false)
    form.reset()
    search({})
  }

  const fetchPatientProfile = async () => {
    const profile = await getPatientProfileAction(nonSurvivorPatientId, true)
    if (profile.state === 'success') {
      setLastLoginDT(profile.data.patientLastLoginDateTime ?? '')
    }
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={handleCloseModal}>
      <Dialog.Trigger>
        <Button highContrast size="1" type="button" className="text-white w-10">
          <ShuffelIcon /> Link
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative w-[1500px] max-w-full !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Review to Link Account
        </Dialog.Title>
        {selectedPatientsforLinking.map((item) => {
          return (
            <>
              <Flex
                align="center"
                px="2"
                py="1"
                className={cn({
                  'bg-pp-bg-primary text-white': item === survivorPatientId,
                  'bg-pp-focus-bg': item !== survivorPatientId,
                })}
              >
                <Text weight="medium" className="text-[14px]">
                  {item === survivorPatientId ? 'Primary User' : 'Linked User'}
                </Text>
                {item !== survivorPatientId && (
                  <Text
                    weight="medium"
                    className="ml-2 text-[11.5px] text-gray-9"
                  >
                    Last Signed In:{' '}
                    {lastLoginDT ? formatDateTime(lastLoginDT, false) : 'NA'}
                  </Text>
                )}
              </Flex>
              <PatientCard patientId={item} key={item} />
            </>
          )
        })}

        <Box className="mt-4 flex justify-end">
          <Button
            type="button"
            size="1"
            highContrast
            onClick={handleLinkPatient}
            disabled={loading}
          >
            Link User
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientCardDialog }
