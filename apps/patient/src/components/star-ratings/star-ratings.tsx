import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { starRatingColor } from '..'

const StarRating = ({ filledStars }: { filledStars: number }) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= filledStars ? (
        <StarFilledIcon
          color={starRatingColor}
          height={16}
          width={16}
          key={i}
        />
      ) : (
        <StarIcon color={starRatingColor} height={12} width={12} key={i} />
      ),
    )
  }
  return <Flex align="center">{stars}</Flex>
}

export { StarRating }
