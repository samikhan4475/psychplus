import React, { useEffect, useState } from 'react'
import { Button, Flex, Text, TextArea } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { providerRecommendationDefaultText } from '../constants/texts'
import { useProviderRecommendationsStore } from '../store'
import { HistoryButton } from './history-button'

interface ProvidersRecommendationsBlockProps {
  appointmentId: string
}

const ProvidersRecommendationsBlock = ({
  appointmentId,
}: ProvidersRecommendationsBlockProps) => {
  const { saveRecommendation, loading, history, getHistory } =
    useProviderRecommendationsStore()
  const [text, setText] = useState(
    history.length
      ? history[0].recommendation
      : providerRecommendationDefaultText,
  )

  useEffect(() => {
    if (!appointmentId) return
    getHistory(appointmentId, {})
  }, [appointmentId])

  useEffect(() => {
    if (history.length) {
      setText(history[0].recommendation)
    } else {
      setText(providerRecommendationDefaultText)
    }
  }, [history])

  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-white my-2 border border-gray-5"
    >
      <Flex justify="between" align="center" pt="2" px="2">
        <Text className="text-[16px] font-[600] text-accent-12">
          Provider Recommendation
        </Text>
        <Flex align="center" justify="end" gap="2" className="flex-1">
          <HistoryButton appointmentId={appointmentId} />
          <Button
            variant="outline"
            size="1"
            color="gray"
            onClick={() => setText('')}
            className="text-black"
          >
            Clear
          </Button>
          <Button
            type="button"
            size="1"
            highContrast
            onClick={() =>
              saveRecommendation(appointmentId, {
                appointmentId,
                recommendation: text,
              })
            }
          >
            <SaveIcon width={15} height={15} strokeWidth={1.75} />
            Save
          </Button>
        </Flex>
      </Flex>

      <Flex width="80%" px="2" pb="2">
        <TextArea
          size="2"
          disabled={loading}
          className="h-[100px] w-full"
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Flex>
    </Flex>
  )
}

export { ProvidersRecommendationsBlock }
