// src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react'
import { commandsEn } from '../commands'

interface Line {
    content: string
    isHtml?: boolean
}

const PROMPT_USER = 'danfigueroa'
const PROMPT_AT = '@'
const PROMPT_LOCATION = 'terminal:~$ '

const translations = {
    en: {
        welcome: '👋 Welcome to my personal website!',
        helpMsg: "Type 'help' to see the available commands.",
        unrecognizedCmd: (cmd: string) => `Command not recognized: ${cmd}`,
    },
}

export const Terminal: React.FC = () => {
    const [history, setHistory] = useState<Line[]>([])
    const [currentInput, setCurrentInput] = useState<string>('')
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Ao iniciar, mostra a mensagem de boas-vindas em inglês
        setHistory([
            { content: translations.en.welcome },
            { content: translations.en.helpMsg },
        ])
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [history])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            return // Deixa o input handle o backspace naturalmente
        } else if (
            e.key.length === 1 &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey
        ) {
            return // Deixa o input handle o caractere naturalmente
        } else if (e.key === 'Enter') {
            executeCommand(currentInput.trim())
            e.preventDefault()
        }
    }

    const executeCommand = (cmd: string) => {
        // Linha do usuário sempre texto puro
        setHistory((h) => [
            ...h,
            { content: `${PROMPT_USER}${PROMPT_AT}${PROMPT_LOCATION}${cmd}` },
        ])

        if (cmd.toLowerCase() === 'clear') {
            setHistory([])
            setCurrentInput('')
            return
        }

        if (cmd === '') {
            // Comando vazio
            setCurrentInput('')
            return
        }

        const currentCommands = commandsEn
        const t = translations.en

        const handler = currentCommands[cmd]
        if (handler) {
            const result = handler()
            if (result instanceof Promise) {
                result.then((r) => {
                    if (r) addHtmlLine(r)
                })
            } else {
                if (result) addHtmlLine(result)
            }
        } else {
            setHistory((h) => [...h, { content: t.unrecognizedCmd(cmd) }])
        }

        setCurrentInput('')
    }

    const addHtmlLine = (html: string) => {
        // Substitui \n por <br> para formatação
        const formatted = html.replace(/\n/g, '<br>')
        setHistory((h) => [...h, { content: formatted, isHtml: true }])
    }

    const focusTerminal = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className="terminal-container">
            <div className="terminal-header" onClick={focusTerminal}>
                <div className="mac-buttons">
                    <button
                        className="mac-button mac-close"
                        aria-label="Close"
                    ></button>
                    <button
                        className="mac-button mac-minimize"
                        aria-label="Minimize"
                    ></button>
                    <button
                        className="mac-button mac-expand"
                        aria-label="Expand"
                    ></button>
                </div>
                <div className="terminal-header-title">
                    👨🏻‍💻 Daniel Macedo Figueroa 👨🏻‍💻
                </div>
                <div style={{ width: '88px' }}></div>{' '}
                {/* Espaçador para centralizar o título */}
            </div>
            <div
                className="terminal-body"
                tabIndex={0}
                ref={containerRef}
                style={{ outline: 'none' }}
                onClick={focusTerminal}
            >
                {history.map((line, i) =>
                    line.isHtml ? (
                        <div
                            key={i}
                            dangerouslySetInnerHTML={{ __html: line.content }}
                        ></div>
                    ) : (
                        <div key={i}>{line.content}</div>
                    )
                )}
                <div className="prompt-line">
                    <span className="prompt">
                        <span className="prompt-user">{PROMPT_USER}</span>
                        <span className="prompt-at">{PROMPT_AT}</span>
                        <span className="prompt-location">
                            {PROMPT_LOCATION}
                        </span>
                    </span>
                    <span className="prompt-input">{currentInput}</span>
                    <span className="cursor"></span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="mobile-input"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    )
}
