import NextImage, { ImageProps } from 'next/image'
import { AspectRatio } from '@radix-ui/themes'

const AspectRatioImage = (props: ImageProps) => (
  <AspectRatio>
    <NextImage fill style={{ objectFit: 'contain' }} {...props} />
  </AspectRatio>
)

export { AspectRatioImage }
