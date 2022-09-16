
/*export const lowerCaseLetters = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

export const upperCaseLetters = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

export const numbers = (rg) => {
    const rgNumbers = rg.slice(0, 4)
    return Math.floor(Math.random() * rgNumbers).toString()
}

export const symbols = () => {
    const symbols = "!@#$%¨&*()_+-="

    return symbols[Math.floor(Math.random() * symbols.length)]
}

export const passwordFunction = (lowerCaseLetters, upperCaseLetters, numbers, symbols, rg) => {
    let password = ""

    const generators = [
        lowerCaseLetters,
        upperCaseLetters,
        numbers,
        symbols
    ]

    for (let index = 0; index < rg.length; index += generators.length) {
        generators.forEach(() => {
            const randomCharacter = generators[Math.floor(Math.random() * generators.length)](rg)

            password += randomCharacter
        });
    }
    return password
}

*/
