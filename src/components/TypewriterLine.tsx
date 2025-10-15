// src/components/TypewriterLine.tsx
import React, { useState, useEffect, useRef } from 'react'

interface TypewriterLineProps {
    content: string
    isHtml?: boolean
    speed?: number
    delay?: number
    onComplete?: () => void
    className?: string
}

export const TypewriterLine: React.FC<TypewriterLineProps> = ({
    content,
    isHtml = false,
    speed = 5,
    delay = 100,
    onComplete,
    className = ''
}) => {
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const timeoutRef = useRef<NodeJS.Timeout>()
    const animationRef = useRef<number>()

    // Função para extrair texto puro do HTML para animação
    const getPlainText = (htmlString: string): string => {
        const div = document.createElement('div')
        div.innerHTML = htmlString
        return div.textContent || div.innerText || ''
    }

    // Função para reconstruir HTML com texto parcial
    const buildPartialHtml = (originalHtml: string, targetLength: number): string => {
        const div = document.createElement('div')
        div.innerHTML = originalHtml
        
        let currentLength = 0
        const processNode = (node: Node): Node | null => {
            if (currentLength >= targetLength) return null
            
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || ''
                const remainingLength = targetLength - currentLength
                if (remainingLength >= text.length) {
                    currentLength += text.length
                    return node.cloneNode(true)
                } else {
                    const partialText = text.substring(0, remainingLength)
                    currentLength += partialText.length
                    const textNode = document.createTextNode(partialText)
                    return textNode
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element
                const newElement = document.createElement(element.tagName.toLowerCase())
                
                // Copiar atributos
                for (let i = 0; i < element.attributes.length; i++) {
                    const attr = element.attributes[i]
                    newElement.setAttribute(attr.name, attr.value)
                }
                
                // Processar filhos
                for (let i = 0; i < element.childNodes.length; i++) {
                    if (currentLength >= targetLength) break
                    const processedChild = processNode(element.childNodes[i])
                    if (processedChild) {
                        newElement.appendChild(processedChild)
                    }
                }
                
                return newElement
            }
            
            return null
        }
        
        const result = document.createElement('div')
        for (let i = 0; i < div.childNodes.length; i++) {
            if (currentLength >= targetLength) break
            const processedNode = processNode(div.childNodes[i])
            if (processedNode) {
                result.appendChild(processedNode)
            }
        }
        
        return result.innerHTML
    }

    useEffect(() => {
        const plainText = isHtml ? getPlainText(content) : content
        const totalLength = plainText.length

        if (totalLength === 0) {
            setDisplayText(content)
            onComplete?.()
            return
        }

        setIsTyping(true)
        setCurrentIndex(0)
        setDisplayText('')

        const startTime = Date.now()
        
        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min((elapsed - delay) / (totalLength * speed), 1)
            
            if (progress <= 0) {
                animationRef.current = requestAnimationFrame(animate)
                return
            }
            
            const targetIndex = Math.floor(progress * totalLength)
            
            if (targetIndex !== currentIndex) {
                setCurrentIndex(targetIndex)
                
                if (isHtml) {
                    const partialHtml = buildPartialHtml(content, targetIndex)
                    setDisplayText(partialHtml)
                } else {
                    setDisplayText(content.substring(0, targetIndex))
                }
            }
            
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                setDisplayText(content)
                setIsTyping(false)
                onComplete?.()
            }
        }

        timeoutRef.current = setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate)
        }, delay)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [content, isHtml, speed, delay, onComplete])

    const handleClick = () => {
        if (isTyping) {
            // Skip animation on click
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            setDisplayText(content)
            setIsTyping(false)
            onComplete?.()
        }
    }

    return (
        <div 
            className={`typewriter-line ${isTyping ? 'typing' : 'complete'} ${className}`}
            onClick={handleClick}
            style={{ cursor: isTyping ? 'pointer' : 'default' }}
        >
            {isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: displayText }} />
            ) : (
                <div>{displayText}</div>
            )}
            {isTyping && <span className="typing-cursor">▋</span>}
        </div>
    )
}