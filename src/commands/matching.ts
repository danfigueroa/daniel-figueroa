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
