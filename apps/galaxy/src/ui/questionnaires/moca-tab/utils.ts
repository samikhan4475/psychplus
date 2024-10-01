import { MocaSchemaType } from './moca-schema'
import { scoreType } from './types'

enum ScoreCategories {
  VisuospatialExecutive = 'VisuospatialExecutive',
  Naming = 'Naming',
  Memory = 'Memory',
  Attention = 'Attention',
  Language = 'Language',
  Abstraction = 'Abstraction',
  DelayedRecall = 'DelayedRecall',
  Orientation = 'Orientation',
}
const calculateTotalScore = (data: MocaSchemaType): scoreType => {
  let visuospatialExecutive = 0
  let naming = 0
  let attention = 0
  let language = 0
  let abstraction = 0
  let delayedRecall = 0
  let orientation = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof MocaSchemaType]) || 0

    switch (true) {
      case key.includes(ScoreCategories.VisuospatialExecutive):
        visuospatialExecutive += value
        break
      case key.includes(ScoreCategories.Naming):
        naming += value
        break
      case key.includes(ScoreCategories.Attention):
        attention += value
        break
      case key.includes(ScoreCategories.Language):
        language += value
        break
      case key.includes(ScoreCategories.Abstraction):
        abstraction += value
        break
      case key.includes(ScoreCategories.DelayedRecall):
        delayedRecall += value ? 1 : 0
        break
      case key.includes(ScoreCategories.Orientation):
        orientation += value ? 1 : 0
        break
    }
  })

  return {
    visuospatialExecutive,
    naming,
    attention,
    language,
    abstraction,
    delayedRecall,
    orientation,
  }
}

export { calculateTotalScore }
