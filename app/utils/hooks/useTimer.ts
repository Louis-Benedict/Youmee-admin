'use client'

import { useCallback, useEffect, useState } from 'react'
import { formatTime } from '../formatters/time'

type Args = {
    formatter?: (time: number) => string
    onCountdownFinished?: () => void
}

const useTimer = ({ formatter = formatTime, onCountdownFinished }: Args) => {
    const [time, setTime] = useState(0)
    const [remainingTime, setRemainingTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const startTimer = () => setIsRunning(true)
    const stopTimer = () => setIsRunning(false)

    useEffect(() => {
        if (!isRunning) {
            return
        }
        const interval = setInterval(() => {
            if (onCountdownFinished) {
                setRemainingTime((t) => t - 1)
            } else {
                setTime((t) => t + 1)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning])

    const toggleTimer = useCallback(() => {
        setIsRunning(!isRunning)
    }, [isRunning])

    const resetTimer = useCallback(() => {
        setTime(0)
        setIsRunning(true)
    }, [isRunning])

    useEffect(() => {
        if (remainingTime <= 0) {
            setIsRunning(false)
            setRemainingTime(0)
            onCountdownFinished?.()
        }
        0
    }, [remainingTime])

    const startCountdown = (timeInSeconds: number) => {
        setRemainingTime(timeInSeconds)
        setIsRunning(true)
    }

    const formattedTime = formatter(time)

    return {
        remainingTime,
        startCountdown,
        time: formattedTime,
        toggleTimer,
        stopTimer,
        startTimer,
        resetTimer,
        isRunning,
    }
}

export default useTimer
