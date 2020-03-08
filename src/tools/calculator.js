const getQuote = (principal, term, interestRate) => {

    principal = parseFloat(principal)
    term = parseFloat(term / 12)
    interestRate = parseFloat(interestRate)

    let termMonths = term * 12
    let trueRate = (interestRate * 12) / 100
    let simpleInterest = principal * trueRate * term
    let amountCredit = (principal + simpleInterest).toFixed(2)
    let payment = (amountCredit / termMonths).toFixed(2)
    let apr = (trueRate * 14 * 10 + (principal * 0.001)).toFixed(2)

    response = {
        principal: Number(principal),
        termMonths,
        interestRate,
        interest: Number(simpleInterest),
        payment: Number(payment),
        amountCredit: Number(amountCredit),
        simpleInterest: Number(simpleInterest),
        apr: Number(apr)
    }
            return response
}

module.exports = getQuote;

// console.log(getQuote(5000, 36, 1.23))