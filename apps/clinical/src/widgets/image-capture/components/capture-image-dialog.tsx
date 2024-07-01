import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { Button } from '@psychplus/ui/button'

const CaptureImageDialog = ({imageEvent}: {imageEvent: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const { publish } = usePubsub()

  useEffect(() => {
    startCamera()
  }, [])

  // Handling image capture
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setMediaStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop()
      })
      setMediaStream(null)
    }
  }

  const handlePictureCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(blob => {
          if (blob && imageEvent) {
            const file = new File([blob], 'image.png')
            publish(imageEvent, file)
          }
        })
        stopCamera()
      }
    }
  }

  return (
    <>
      <Box className="min-h-36 mb-2">
        <video className='mx-auto pt-7' ref={videoRef} width="500" height="200" autoPlay muted />
      </Box>
      <canvas className='hidden' ref={canvasRef} />
      <Dialog.Close className='float-right cursor-pointer bg-[#151B4A] text-[#FFF] text-[14px] px-3 py-1.5'>
          <Button type='button' onClick={handlePictureCapture}>Capture</Button>
      </Dialog.Close>
    </>
  )
}

export { CaptureImageDialog }
