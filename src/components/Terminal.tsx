// src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react'
import { commandsEn, commandsPt } from '../commands'
import { ParticleEffect } from './ParticleEffect'

interface Line {
    content: string
    isHtml?: boolean
    id: string
    isProcessing?: boolean
    isSystem?: boolean // Identifica mensagens do sistema que devem aparecer instantaneamente
}

type Language = 'en' | 'pt'

const PROMPT_USER = 'danfigueroa'
const PROMPT_AT = '@'
const PROMPT_LOCATION = 'terminal:~$ '

const translations = {
    en: {
        welcome: '👋 Welcome to my personal website!',
        helpMsg: "Type 'help' to see the available commands.",
        hint: '💡 Tab autocompletes · ↑/↓ browses history',
        langHint: "Language: English — type 'lang' to switch",
        unrecognizedCmd: (cmd: string) => `Command not recognized: ${cmd}`,
        langChanged: 'Language changed to English',
    },
    pt: {
        welcome: '👋 Bem-vindo ao meu site pessoal!',
        helpMsg: "Digite 'help' para ver os comandos disponíveis.",
        hint: '💡 Tab completa · ↑/↓ navega o histórico',
        langHint: "Idioma: Português — digite 'lang' para trocar",
        unrecognizedCmd: (cmd: string) => `Comando não reconhecido: ${cmd}`,
        langChanged: 'Idioma alterado para Português',
    },
}

// Idioma inicial a partir da preferência do navegador — visitantes
// brasileiros abrem o site já em português.
const detectLanguage = (): Language =>
    navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'

// Bloco inicial do terminal, remontado também pelo comando `clear`.
const buildWelcomeLines = (lang: Language): Line[] => {
    const t = translations[lang]
    return [
        { content: t.welcome, id: 'welcome-0', isHtml: false, isSystem: true },
        { content: t.helpMsg, id: 'help-1', isHtml: false, isSystem: true },
        {
            content: `<span class="hint-line">${t.hint}</span>`,
            id: 'hint-2',
            isHtml: true,
            isSystem: true,
        },
    ]
}

export const Terminal: React.FC = () => {
    const [history, setHistory] = useState<Line[]>([])
    const [currentInput, setCurrentInput] = useState<string>('')
    const [language, setLanguage] = useState<Language>(detectLanguage)
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [lineCounter, setLineCounter] = useState<number>(0)
    const [showParticles, setShowParticles] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Ao iniciar, mostra a mensagem de boas-vindas no idioma detectado
        setHistory(buildWelcomeLines(language))
        setLineCounter(3)
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [history])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setCurrentInput('')
            }
        } else if (e.key === 'Backspace') {
            return // Deixa o input handle o backspace naturalmente
        } else if (
            e.key.length === 1 &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey
        ) {
            return // Deixa o input handle o caractere naturalmente
        } else if (e.key === 'Enter') {
            if (!isProcessing) {
                setShowParticles(true)
                executeCommand(currentInput.trim())
            }
            e.preventDefault()
        }
    }

    const executeCommand = (cmd: string) => {
        setIsProcessing(true)
        
        // Adiciona comando ao histórico se não estiver vazio
        if (cmd.trim() !== '') {
            setCommandHistory(prev => {
                const newHistory = [cmd, ...prev.filter(c => c !== cmd)].slice(0, 50) // Mantém últimos 50 comandos únicos
                return newHistory
            })
        }
        
        // Reset do índice do histórico
        setHistoryIndex(-1)
        
        // Linha do usuário com formatação HTML para manter as cores e aparece instantaneamente
        const userLineId = `user-${lineCounter}`
        const promptHtml = `<span class="prompt"><span class="prompt-user">${PROMPT_USER}</span><span class="prompt-at">${PROMPT_AT}</span><span class="prompt-location">${PROMPT_LOCATION}</span></span>${cmd}`
        setHistory((h) => [
            ...h,
            { content: promptHtml, id: userLineId, isHtml: true, isSystem: true },
        ])
        setLineCounter(prev => prev + 1)

        // Nome normalizado uma única vez: comparações e lookup no registry
        // precisam concordar, senão `Clear` funciona e `About` não.
        const normalized = cmd.trim().toLowerCase()

        // Simula um pequeno delay de processamento
        setTimeout(() => {
            if (normalized === 'clear') {
                // Limpa o terminal e restaura as mensagens iniciais
                setHistory(buildWelcomeLines(language))
                setCurrentInput('')
                setIsProcessing(false)
                setLineCounter(3)
                return
            }

            if (normalized === '') {
                // Comando vazio
                setCurrentInput('')
                setIsProcessing(false)
                return
            }

            // Comando especial para trocar idioma
            if (normalized === 'lang' || normalized === 'language') {
                const newLang = language === 'en' ? 'pt' : 'en'
                setLanguage(newLang)
                const t = translations[newLang]
                const langLineId = `lang-${lineCounter}`
                setHistory((h) => [...h, { content: t.langChanged, id: langLineId, isHtml: false, isSystem: true }])
                setLineCounter(prev => prev + 1)
                setCurrentInput('')
                setIsProcessing(false)
                return
            }

            const currentCommands = language === 'en' ? commandsEn : commandsPt
            const t = translations[language]

            const handler = currentCommands[normalized]
            if (handler) {
                const result = handler()
                if (result instanceof Promise) {
                    result.then((r) => {
                        if (r) addHtmlLine(r)
                        setIsProcessing(false)
                    })
                } else {
                    if (result) {
                        addHtmlLine(result)
                    }
                    setIsProcessing(false)
                }
            } else {
                const errorLineId = `error-${lineCounter}`
                setHistory((h) => [...h, { content: t.unrecognizedCmd(cmd), id: errorLineId, isHtml: false, isSystem: true }])
                setLineCounter(prev => prev + 1)
                setIsProcessing(false)
            }

            setCurrentInput('')
        }, 150) // Pequeno delay para simular processamento
    }

    const addHtmlLine = (html: string) => {
        // Substitui \n por <br> para formatação
        const formatted = html.replace(/\n/g, '<br>')
        const htmlLineId = `html-${lineCounter}`
        setHistory((h) => [...h, { content: formatted, isHtml: true, id: htmlLineId }])
        setLineCounter(prev => prev + 1)
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
                {/* Ocupa o mesmo slot do antigo espaçador, mantendo o título centralizado */}
                <span
                    className="lang-indicator"
                    title={translations[language].langHint}
                >
                    {language.toUpperCase()}
                </span>
            </div>
            <div
                className="terminal-body"
                tabIndex={0}
                ref={containerRef}
                style={{ outline: 'none' }}
                onClick={focusTerminal}
            >
                {history.map((line, i) => {
                    // Mensagens do sistema aparecem instantaneamente
                    if (line.isSystem) {
                        if (line.isHtml) {
                            return (
                                <div 
                                    key={line.id} 
                                    className="html-line system-line"
                                    dangerouslySetInnerHTML={{ __html: line.content }}
                                />
                            )
                        } else {
                            return (
                                <div 
                                    key={line.id} 
                                    className="text-line system-line"
                                >
                                    {line.content}
                                </div>
                            )
                        }
                    }
                    
                    // Mensagens normais aparecem instantaneamente
                    if (line.isHtml) {
                        return (
                            <div 
                                key={line.id} 
                                className="html-line"
                                dangerouslySetInnerHTML={{ __html: line.content }}
                            />
                        )
                    } else {
                        return (
                            <div 
                                key={line.id} 
                                className="text-line"
                            >
                                {line.content}
                            </div>
                        )
                    }
                })}
                <div className="prompt-line">
                    <span className="prompt">
                        <span className="prompt-user">{PROMPT_USER}</span>
                        <span className="prompt-at">{PROMPT_AT}</span>
                        <span className="prompt-location">
                            {PROMPT_LOCATION}
                        </span>
                    </span>
                    <span className="prompt-input">{currentInput}</span>
                    <span className={`cursor ${isProcessing ? 'processing' : ''}`}></span>
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
            <ParticleEffect 
                trigger={showParticles} 
                onComplete={() => setShowParticles(false)} 
            />
        </div>
    )
}
