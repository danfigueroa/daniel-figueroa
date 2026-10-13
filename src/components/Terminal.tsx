// src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react'
import {
    commandLink,
    commandsEn,
    commandsPt,
    COMMAND_NAMES,
} from '../commands'
import {
    findClosestCommand,
    getCompletions,
    longestCommonPrefix,
} from '../commands/matching'
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
        role: 'Backend Software Engineer',
        focus: 'Node.js · TypeScript · Go · Distributed systems · Cloud',
        helpMsg:
            "Type 'help' to explore experience, projects and contact.",
        hint: '💡 Tab autocompletes · ↑/↓ browses history',
        langHint: "Language: English — type 'lang' to switch",
        unrecognizedCmd: (cmd: string) => `Command not recognized: ${cmd}`,
        didYouMean: (cmd: string) =>
            `Did you mean: ${commandLink(cmd)}?`,
        langChanged: 'Language changed to English',
        extraKeys: {
            tab: 'Complete',
            prev: 'Previous command',
            next: 'Next command',
            accept: 'Accept suggestion',
        },
    },
    pt: {
        role: 'Engenheiro de Software Backend',
        focus: 'Node.js · TypeScript · Go · Sistemas distribuídos · Cloud',
        helpMsg:
            "Digite 'help' para explorar experiência, projetos e contato.",
        hint: '💡 Tab completa · ↑/↓ navega o histórico',
        langHint: "Idioma: Português — digite 'lang' para trocar",
        unrecognizedCmd: (cmd: string) => `Comando não reconhecido: ${cmd}`,
        didYouMean: (cmd: string) =>
            `Você quis dizer: ${commandLink(cmd)}?`,
        langChanged: 'Idioma alterado para Português',
        extraKeys: {
            tab: 'Completar',
            prev: 'Comando anterior',
            next: 'Próximo comando',
            accept: 'Aceitar sugestão',
        },
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
        {
            content: `<span class="company">Daniel Macedo Figueroa</span> — ${t.role}`,
            id: 'welcome-0',
            isHtml: true,
            isSystem: true,
        },
        {
            content: `<span class="hint-line">${t.focus}</span>`,
            id: 'focus-1',
            isHtml: true,
            isSystem: true,
        },
        { content: t.helpMsg, id: 'help-2', isHtml: false, isSystem: true },
        {
            content: `<span class="hint-line">${t.hint}</span>`,
            id: 'hint-3',
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

    // Sugestão inline: primeiro comando que casa com o que já foi digitado.
    // Derivado do render, não guardado em estado.
    const trimmedInput = currentInput.trim()
    const suggestion =
        trimmedInput !== '' && !currentInput.includes(' ')
            ? COMMAND_NAMES.find((name) =>
                  name.startsWith(trimmedInput.toLowerCase())
              )
            : undefined
    const ghost = suggestion ? suggestion.slice(currentInput.length) : ''

    const addSystemLine = (
        content: string,
        idPrefix: string,
        isHtml = false
    ) => {
        setHistory((h) => [
            ...h,
            { content, id: `${idPrefix}-${lineCounter}`, isHtml, isSystem: true },
        ])
        setLineCounter((prev) => prev + 1)
    }

    const handleTabCompletion = () => {
        const matches = getCompletions(currentInput, COMMAND_NAMES)
        if (matches.length === 0) return

        if (matches.length === 1) {
            setCurrentInput(matches[0])
            return
        }

        const common = longestCommonPrefix(matches)
        if (common.length > trimmedInput.length) {
            setCurrentInput(common)
            return
        }

        // O prefixo comum não avança: lista as opções, como faz um shell.
        addSystemLine(
            matches.map(commandLink).join(' &nbsp; '),
            'completions',
            true
        )
    }

    // Ações de teclado isoladas para servirem tanto ao teclado físico quanto
    // à barra de teclas extras do celular.
    const acceptSuggestion = () => {
        if (suggestion && ghost !== '') setCurrentInput(suggestion)
    }

    const historyPrev = () => {
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
        }
    }

    const historyNext = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
        } else if (historyIndex === 0) {
            setHistoryIndex(-1)
            setCurrentInput('')
        }
    }

    // Barra de teclas do celular: o preventDefault no pointerdown mantém o
    // foco no input, então o teclado virtual não fecha a cada toque.
    const extraKeys = [
        { label: 'Tab', name: 'tab', action: handleTabCompletion },
        { label: '↑', name: 'prev', action: historyPrev },
        { label: '↓', name: 'next', action: historyNext },
        { label: '→', name: 'accept', action: acceptSuggestion },
    ] as const

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab') {
            // Sem o preventDefault o foco escaparia do terminal.
            e.preventDefault()
            if (!isProcessing) handleTabCompletion()
        } else if (e.key === 'ArrowRight') {
            // Aceita a sugestão apenas com o caret no fim do texto, para não
            // atrapalhar a navegação normal dentro do que já foi digitado.
            if (
                suggestion &&
                ghost !== '' &&
                e.currentTarget.selectionStart === currentInput.length
            ) {
                e.preventDefault()
                acceptSuggestion()
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            historyPrev()
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            historyNext()
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
                // Erro e, quando houver um comando parecido, o "did you mean"
                // para o typo não virar um beco sem saída.
                const closest = findClosestCommand(normalized, COMMAND_NAMES)
                const errorHtml = closest
                    ? `${t.unrecognizedCmd(cmd)}<br>${t.didYouMean(closest)}`
                    : t.unrecognizedCmd(cmd)
                setHistory((h) => [
                    ...h,
                    {
                        content: errorHtml,
                        id: `error-${lineCounter}`,
                        isHtml: true,
                        isSystem: true,
                    },
                ])
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

    // Comandos na saída (help, "did you mean", lista do Tab) são tocáveis.
    // Executar sem focar o input evita que o teclado virtual cubra a resposta.
    const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const link = (e.target as HTMLElement).closest<HTMLElement>('[data-cmd]')
        const name = link?.dataset.cmd
        if (name && (COMMAND_NAMES as readonly string[]).includes(name)) {
            if (!isProcessing) {
                setShowParticles(true)
                executeCommand(name)
            }
            return
        }
        focusTerminal()
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
                    danfigueroa — ~
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
                onClick={handleBodyClick}
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
                    {ghost && (
                        <span
                            className="ghost-suggestion"
                            onClick={acceptSuggestion}
                        >
                            {ghost}
                        </span>
                    )}
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
            <div className="extra-keys">
                {extraKeys.map(({ label, name, action }) => (
                    <button
                        key={name}
                        type="button"
                        className="extra-key"
                        aria-label={translations[language].extraKeys[name]}
                        onPointerDown={(e) => {
                            e.preventDefault()
                            if (!isProcessing) action()
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <ParticleEffect 
                trigger={showParticles} 
                onComplete={() => setShowParticles(false)} 
            />
        </div>
    )
}
