'use client'

import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { TimerIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'

type TimerProps = {
  initialMinutes?: number
  patientId: string
  onTimeUp?: () => void
}

function CountdownTimer({
  patientId,
  initialMinutes = 16,
  onTimeUp,
}: TimerProps) {
  const form = useFormContext()
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTimer = localStorage.getItem(`togra-timer-${patientId}`)
    if (storedTimer) {
      const { startTime, totalSeconds } = JSON.parse(storedTimer)
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)
      return remainingSeconds
    }
    return initialMinutes * 60
  })

  const { startTimer, initializeQuestionnaires, setStartTimer, clearTimer } =
    useStore((state) => state)

  const saveSpentTime = () => {
    const storedTimer = localStorage.getItem(`togra-timer-${patientId}`)
    if (storedTimer) {
      const { startTime } = JSON.parse(storedTimer)
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      const elapsedMinutes = Math.ceil(elapsedSeconds / 60)

      form.setValue('TograBlueCompletedDuration', elapsedMinutes.toString())

      localStorage.setItem(
        `togra-spent-time-${patientId}`,
        elapsedMinutes.toString(),
      )
    }
  }

  const loadSpentTime = () => {
    const storedSpentTime = localStorage.getItem(
      `togra-spent-time-${patientId}`,
    )
    if (storedSpentTime) {
      form.setValue('TograBlueCompletedDuration', storedSpentTime)
    }
  }

  useEffect(() => {
    loadSpentTime()
  }, [])

  useEffect(() => {
    if (!startTimer) return

    const interval = setInterval(() => {
      saveSpentTime()
    }, 30000) // Save every 30 seconds

    return () => clearInterval(interval)
  }, [startTimer])

  const handleEvent = () => {
    saveSpentTime()

    setStartTimer(false)
    initializeQuestionnaires(patientId)

    clearTimer(patientId)
    if (onTimeUp) {
      onTimeUp()
    }
  }

  // Store timer in localStorage when it starts
  useEffect(() => {
    if (startTimer && timeLeft === initialMinutes * 60) {
      const timerData = {
        startTime: Date.now(),
        totalSeconds: initialMinutes * 60,
      }
      localStorage.setItem(
        `togra-timer-${patientId}`,
        JSON.stringify(timerData),
      )
    }
  }, [startTimer, timeLeft, initialMinutes, patientId])

  // Check if time is up and reset timer if needed
  useEffect(() => {
    const storedTimer = localStorage.getItem(`togra-timer-${patientId}`)
    if (storedTimer) {
      const { startTime, totalSeconds } = JSON.parse(storedTimer)
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)

      // If elapsed time exceeds initialMinutes, time is up
      if (elapsedSeconds >= initialMinutes * 60) {
        saveSpentTime()

        localStorage.removeItem(`togra-timer-${patientId}`)
        setTimeLeft(initialMinutes * 60)
        setStartTimer(false)
        clearTimer(patientId)
        if (onTimeUp) {
          onTimeUp()
        }
        return
      }

      // Calculate remaining time
      const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)

      // Update timeLeft if it's different from calculated remaining time
      if (timeLeft !== remainingSeconds) {
        setTimeLeft(remainingSeconds)
      }
    }
  }, [patientId, initialMinutes, timeLeft, setStartTimer, clearTimer, onTimeUp])

  // Save spent time when component unmounts or timer stops
  useEffect(() => {
    return () => {
      if (startTimer) {
        saveSpentTime()
      }
    }
  }, [startTimer])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Save spent time before page unload
      if (startTimer) {
        saveSpentTime()
      }
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [startTimer])

  useEffect(() => {
    if (!startTimer) return
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleEvent()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, startTimer])

  const formatTime = (seconds: number) => {
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <Box className="rounded-md border-pp-blue bg-pp-bg-accent text-blue-700 border-rounded-2 flex items-center gap-2 border px-3 py-1">
      <TimerIcon className="text-pp-blue h-4 w-4" />
      <span className="text-sm font-semibold font-mono">
        {formatTime(timeLeft)}
      </span>
    </Box>
  )
}

export { CountdownTimer }
