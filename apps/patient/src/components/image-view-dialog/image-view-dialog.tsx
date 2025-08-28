'use client'

import { useState } from 'react'
import { Box} from '@radix-ui/themes'
import { ImageEyeIcon } from '@/components-v2/icons/image-eye-icon'
import { XIcon } from 'lucide-react'

const ImageViewDialog = ({
    previewSrc,
    disabled = false,
}: {
    previewSrc: string | undefined
    disabled?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)

    if (!previewSrc || disabled) {
        return (
            <Box className="opacity-50 cursor-not-allowed">
                <ImageEyeIcon />
            </Box>
        )
    }

    return (
        <>
            <Box 
                onClick={() => setIsOpen(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <ImageEyeIcon />
            </Box>

            {isOpen && (
                <Box 
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
                    onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                >
                    <Box className="relative bg-white rounded-6 max-w-[90vw] max-h-[90vh] overflow-hidden">
                        <Box 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 cursor-pointer bg-white/80 hover:bg-white rounded-full p-2"
                        >
                            <XIcon className="w-5 h-5 text-gray-600" />
                        </Box>

                        <img
                            src={previewSrc}
                            alt="Preview"
                            className="w-full h-full object-contain max-w-[90vw] max-h-[90vh]"
                        />
                    </Box>
                </Box>
            )}
        </>
    )
}

export { ImageViewDialog }
