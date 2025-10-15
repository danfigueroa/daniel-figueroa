// src/hooks/useTypewriter.ts
import { useState, useEffect, useRef, useCallback } from 'react'

interface TypewriterOptions {
    speed?: number
    delay?: number
    onComplete?: () => void
    skipAnimation?: boolean
}

export const useTypewriter = (
    text: string,
    options: TypewriterOptions = {}
) => {
    const {
        speed = 5,
        delay = 0,
        onComplete,
        skipAnimation = false
    } = options

    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()
    const indexRef = useRef(0)

    const startTyping = useCallback(() => {
        if (skipAnimation) {
            setDisplayText(text)
            setIsComplete(true)
            onComplete?.()
            return
        }

        setIsTyping(true)
        setIsComplete(false)
        setDisplayText('')
        indexRef.current = 0

        const typeNextChar = () => {
            if (indexRef.current < text.length) {
                setDisplayText(text.slice(0, indexRef.current + 1))
                indexRef.current++
                timeoutRef.current = setTimeout(typeNextChar, speed)
            } else {
                setIsTyping(false)
                setIsComplete(true)
                onComplete?.()
            }
        }

        timeoutRef.current = setTimeout(typeNextChar, delay)
    }, [text, speed, delay, onComplete, skipAnimation])

    const skipToEnd = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setDisplayText(text)
        setIsTyping(false)
        setIsComplete(true)
        onComplete?.()
    }, [text, onComplete])

    useEffect(() => {
        startTyping()
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [startTyping])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return {
        displayText,
        isTyping,
        isComplete,
        skipToEnd,
        restart: startTyping
    }
}