const generateRandomInt = (min, max) => {
    return Math.floor((Math.random() * (max + 1 - min)) + min);
}

export const lowerCaseLetters = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

export const upperCaseLetters = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

export const numbers = (rg) => {
    return Math.floor(Math.random() * rg).toString()
}

export const symbols = () => {
    const symbols = "!@#$%¨&*()_+-="
    return symbols[Math.floor(Math.random() * symbols.length)]
}

export const passwordFunction = (lowerCaseLetters, upperCaseLetters, numbers, symbols, rg) => {
    let password = ""
    let formatedPassword = []

    const generators = [
        lowerCaseLetters,
        upperCaseLetters,
        numbers,
        symbols
    ]

    for (let index = 0; index < rg.length; index += generators.length) {
        generators.forEach(() => {
            let randomCharacter = generators[Math.floor(Math.random() * generators.length)](rg)
            password += randomCharacter
        });
    }

    for (let index = 0; index < password.length; index++) {
        if (password[index] === "N" ||
            password[index] === "a") {
                formatedPassword.push(password[index].replace(password[index], generateRandomInt(0, 9).toString())) 
                
            } else {
                formatedPassword.push(password[index])
            }
    }
    return formatedPassword.join("", ",")
}
