import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { starRatingColor } from '..'

const StarRating = ({ filledStars }: { filledStars: number }) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= filledStars ? (
        <StarFilledIcon color={starRatingColor} height={16} width={16} />
      ) : (
        <StarIcon color={starRatingColor} height={12} width={12} />
      ),
    )
  }
  return <>{stars}</>
}

export { StarRating }
