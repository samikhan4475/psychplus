import { useRef, useState } from 'react'
import { Cross2Icon, ImageIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { Avatar, Button, Flex, Text, Tooltip } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormFieldError } from '@psychplus/form'
import { Patient } from '@psychplus/patient'
import { Dialog } from '@psychplus/ui/dialog'
import { Select } from '@psychplus/ui/select'
import { ImageCaptureDialog } from '@/components/image-capture-dialog'
import { EditPatientProfileForm } from './edit-patient-profile-form'
import { SchemaType } from './schema'

const EditPatientProfielDialog = ({
  patient,
  profileImage,
}: {
  patient: Patient | undefined
  profileImage: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage)

  const handleUploadFromGallery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setNewProfileImage(imageURL)
    }
  }

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCaptureImage = (imageURL: string) => {
    setNewProfileImage(imageURL)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex className="absolute right-5 top-3 cursor-pointer text-blue-11">
          <Tooltip content="Edit Profile" delayDuration={250}>
            <Pencil2Icon height={22} width={22} />
          </Tooltip>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[850px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>

        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="6"
          className="flex-wrap"
        >
          <Text size="7" className="font-bold">
            Patient Information
          </Text>

          <Flex align="center" className="relative" justify="center">
            <Avatar
              src={newProfileImage}
              color="gray"
              fallback={patient?.legalName.firstName[0] ?? 'A'}
              radius="full"
              size="9"
              className="relative z-10 h-52 w-52"
            />

            <ImageCaptureDialog onCapture={handleCaptureImage} />

            <Button
              className="absolute bottom-8 right-2 z-20 h-7 w-7"
              radius="full"
              onClick={handleFileInputClick}
            >
              <Flex>
                <ImageIcon color="white" height={16} width={16} />
              </Flex>
            </Button>
          </Flex>
          <EditPatientProfileForm />
        </Flex>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleUploadFromGallery}
          accept="image/*"
          ref={fileInputRef}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

interface DropDownOptionsProps {
  options: string[] | undefined
  placeholder?: string
  type: keyof SchemaType
  form: UseFormReturn<SchemaType>
}

export const DropDownOptions = ({
  options,
  placeholder,
  type,
  form,
}: DropDownOptionsProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Select.Root
      size="2"
      {...form.register(type)}
      onValueChange={(value) => {
        form.setValue(type, value)
        if (form.formState.isSubmitted) form.trigger(type)
      }}
    >
      <Select.Trigger
        {...form.register(type)}
        ref={triggerRef}
        placeholder={placeholder ?? 'Please Select'}
        className="h-9 w-full whitespace-nowrap rounded-3 border border-gray-7"
      ></Select.Trigger>
      <Select.Content>
        {options?.map((option) => (
          <Select.Item key={option} value={option}>
            <Text size="3">{`${option}`}</Text>
          </Select.Item>
        ))}
      </Select.Content>
      <FormFieldError message={form.formState.errors[type]?.message} />
    </Select.Root>
  )
}

export { EditPatientProfielDialog }
