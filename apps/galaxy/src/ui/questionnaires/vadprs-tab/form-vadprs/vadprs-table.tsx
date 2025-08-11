import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { VADPRS_TABLE } from '../constants'
import { VadprsScoreComponent } from '../score-interpretation'
import { calculateVadprsTotalScore, mapToVadprsScoreData } from '../utils'
import ChildEvaluation from './child-evaluation'
import { QuestionnairesFormVadprs } from './vadprs-form'

interface QuestionnairesFormVadprsTableProps {
  disabled?: boolean
}

const QuestionnairesFormVadprsTable = ({
  disabled = false,
}: QuestionnairesFormVadprsTableProps) => {
  const form = useFormContext()

  const currentFormValues = form.watch()

  const vadprsData = useMemo(() => {
    const formValuesForScore = Object.fromEntries(
      Object.entries(currentFormValues).map(([key, value]) => [
        key,
        value?.toString() || '0',
      ]),
    )
    return mapToVadprsScoreData(formValuesForScore)
  }, [currentFormValues])

  const totalScore = useMemo(() => {
    const score = calculateVadprsTotalScore(currentFormValues)
    return { totalScore: score }
  }, [currentFormValues])
  return (
    <>
      <Flex
        width="100%"
        className="bg-white"
        px="3"
        py="1"
        direction={'column'}
      >
        <ChildEvaluation disabled={disabled} />
        {VADPRS_TABLE.map(({ labels, data, options }, index) => (
          <QuestionnairesFormVadprs
            key={`${labels.join('')}-${index}`}
            labels={labels}
            totalScore={totalScore}
            data={data}
            label={index === 1 ? 'Performance Evaluation' : ''}
            options={options}
            disabled={disabled}
          />
        ))}
      </Flex>
      <VadprsScoreComponent scoreData={vadprsData} />
    </>
  )
}

export default QuestionnairesFormVadprsTable
