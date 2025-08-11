import { VadprsScoreData } from './score-interpretation'
import { VADPRS_QUESTION_IDS, VADPRS_PERFORMANCE_QUESTION_IDS } from './constants'
import { VadprsSchemaType } from './vadprs-schema'
import { VadprsScoreType } from './types'


enum ScoreCategories {
  VadprsQuestions = 'VadprsQuestions',
  PerformanceEvaluation = 'PerformanceEvaluation',
}

export const mapToVadprsScoreData = (
  initialValue: Record<string, string>,
): VadprsScoreData => {
  const vadprsQuestions: Record<string, number> = {}
  const performanceQuestions: Record<string, number> = {}

  Object.keys(initialValue).forEach((key) => {
    const value = parseInt(initialValue[key]) || 0

    if (key.startsWith('VadprsQuestionsQ')) {
      vadprsQuestions[key] = value
    } else if (key.startsWith('PerformanceEvaluationQ')) {
      performanceQuestions[key] = value
    }
  })

  Object.values(VADPRS_QUESTION_IDS).forEach((questionKey) => {
    if (!vadprsQuestions[questionKey]) {
      vadprsQuestions[questionKey] = 0
    }
  })

  Object.values(VADPRS_PERFORMANCE_QUESTION_IDS).forEach((questionKey) => {
    if (!performanceQuestions[questionKey]) {
      performanceQuestions[questionKey] = 0
    }
  })

  return {
    vadprsQuestions,
    performanceQuestions,
  }
}

export const calculateTotalScore = (data: VadprsSchemaType): VadprsScoreType => {
  let VadprsQuestions = 0
  let PerformanceEvaluation = 1

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof VadprsSchemaType]) || 0

    if (key.includes(ScoreCategories.VadprsQuestions)) {
      VadprsQuestions += value
    }
    if (key.includes(ScoreCategories.PerformanceEvaluation)) {
      PerformanceEvaluation += value
    }
  })

  return {
    VadprsQuestions,
    PerformanceEvaluation,
  }
}

export const calculateVadprsTotalScore = (data: VadprsSchemaType): number => {
  let score = 0
  for (let i = 1; i <= 18; i++) {
    const questionKey = VADPRS_QUESTION_IDS[`Q${i}` as keyof typeof VADPRS_QUESTION_IDS]
    const value = parseInt(data[questionKey] || '0')
    score += value
  }
  return score
}
