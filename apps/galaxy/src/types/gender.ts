type Gender = 'Male' | 'Female' | 'Undetermined'

type GenderAbbreviation = 'M' | 'F' | 'U'

type GenderOrientation =
  | 'Straight'
  | 'Homosexual'
  | 'Bisexual'
  | 'SomethingElse'

type GenderExpression = 'Male' | 'Female' | 'Other'

type GenderPronoun = 'He' | 'She' | 'They'

export type {
  Gender,
  GenderAbbreviation,
  GenderOrientation,
  GenderExpression,
  GenderPronoun,
}
