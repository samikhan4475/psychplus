import { useState } from 'react'
import { Step } from './types'

const useSteps = () => {
  const [step, setStep] = useState<Step>(Step.Form)
  const stepKeys = Object.values(Step)
  const stepCount = stepKeys.indexOf(step) + 1
  const totalSteps = stepKeys.length
  const onNextStep = () => {
    setStep((prevStep) => {
      const stepKeys = Object.keys(Step) as Array<Step>
      const currentIndex = stepKeys.indexOf(prevStep)
      const nextIndex = currentIndex + 1
      if (nextIndex >= stepKeys.length) {
        return prevStep
      }
      return stepKeys[nextIndex]
    })
  }

  const onPrevStep = () => {
    setStep((prevStep) => {
      const stepKeys = Object.keys(Step) as Array<Step>
      const currentIndex = stepKeys.indexOf(prevStep)
      const prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        return prevStep
      }
      return stepKeys[prevIndex]
    })
  }

  const onJumpToStep = (step: Step) => {
    setStep(step)
  }

  return {
    onNext: onNextStep,
    onJump: onJumpToStep,
    onPrev: onPrevStep,
    step,
    stepCount,
    totalSteps,
  }
}

export { useSteps }
