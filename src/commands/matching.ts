// src/commands/matching.ts

/**
 * Comandos que começam com o texto digitado, ignorando maiúsculas/minúsculas.
 */
export const getCompletions = (
    input: string,
    names: readonly string[]
): string[] => {
    const prefix = input.trim().toLowerCase()
    if (prefix === '') return [...names]
    return names.filter((name) => name.startsWith(prefix))
}

/**
 * Maior prefixo comum entre os candidatos — usado pelo Tab quando há
 * mais de um match, replicando o comportamento de um shell.
 */
export const longestCommonPrefix = (candidates: readonly string[]): string => {
    if (candidates.length === 0) return ''

    let prefix = candidates[0]
    for (const candidate of candidates.slice(1)) {
        while (!candidate.startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
            if (prefix === '') return ''
        }
    }
    return prefix
}

/**
 * Distância de Levenshtein entre duas strings.
 */
const levenshtein = (a: string, b: string): number => {
    if (a === b) return 0
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length

    // Mantém apenas a linha anterior da matriz em memória.
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i)

    for (let i = 1; i <= a.length; i++) {
        const current = [i]
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1
            current[j] = Math.min(
                current[j - 1] + 1, // inserção
                previous[j] + 1, // remoção
                previous[j - 1] + cost // substituição
            )
        }
        previous = current
    }

    return previous[b.length]
}

const MAX_SUGGESTION_DISTANCE = 2

/**
 * Comando mais próximo do que foi digitado, para o "did you mean".
 * Retorna undefined quando nada está perto o bastante, evitando
 * sugestões absurdas para entradas sem relação com os comandos.
 */
export const findClosestCommand = (
    input: string,
    names: readonly string[]
): string | undefined => {
    const target = input.trim().toLowerCase()
    if (target === '') return undefined

    let closest: string | undefined
    let smallestDistance = Infinity

    for (const name of names) {
        const distance = levenshtein(target, name)
        if (distance < smallestDistance) {
            smallestDistance = distance
            closest = name
        }
    }

    return smallestDistance <= MAX_SUGGESTION_DISTANCE ? closest : undefined
}
