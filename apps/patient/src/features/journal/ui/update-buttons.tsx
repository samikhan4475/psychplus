import { useToast } from '@/providers/toast-provider'
import { cn } from '@psychplus/ui/cn'
import { Pencil1Icon, UploadIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRef } from 'react'
import { useStore } from '../store'
import { UnifiedAttachment } from '../types'

interface UpdateButtonsProps {
    disabled?: boolean
    showEditButton?: boolean
    onEdit?: () => void
    className?: string
}

const UpdateButtons = ({ disabled, showEditButton, onEdit, className }: UpdateButtonsProps) => {
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { formData, setFormData } = useStore((state) => ({
        formData: state.formData,
        setFormData: state.setFormData,
    }))
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']
        const filteredFiles = Array.from(files).filter(file => allowedTypes.includes(file.type))

        if (filteredFiles.length !== Array.from(files).length) {
            toast({
                title: 'Invalid file type',
                description: 'Only PDF, PNG, JPG, and JPEG files are allowed',
                type: 'error',
            })
        }

        if (filteredFiles.length === 0) return

        const newFiles: UnifiedAttachment[] = filteredFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
            isExisting: false,
        }))

        if (formData.attachments.length + newFiles.length > 5) {
            toast({
                title: 'You can only attach up to 5 files',
                type: 'error',
            })
            return
        }

        setFormData({
            ...formData,
            attachments: [...formData.attachments, ...newFiles],
        })
    }

    return (
        <Flex gap="2" align="center" className={cn("mr-3", className)}>
            <Button
                variant="outline"
                color="gray"
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                size={{ initial: '1', sm: '2' }}
            >
                <UploadIcon />
                <Text
                    size={{ initial: '1', sm: '2' }}
                    weight={'medium'}
                    className="whitespace-nowrap"
                >
                    Add Attachments
                </Text>
            </Button>
            {showEditButton && (
                <Button
                    variant="outline"
                    color="gray"
                    onClick={onEdit}
                    size={{ initial: '1', sm: '2' }}
                >
                    <Pencil1Icon />
                    <Text
                        size={{ initial: '1', sm: '2' }}
                    >
                        Edit
                    </Text>
                </Button>
            )}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept=".pdf,.png,.jpg,.jpeg"
                disabled={disabled}
            />
        </Flex>
    )
}

export default UpdateButtons
