import { useEffect, useRef, useState } from "react"

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '/',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0)
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number])

    useEffect(() => {
        const subResult = calculateSubResult()
        setPrevNumber(subResult.toString())
    }, [formula])

    const clean = () => {
        setNumber('0')
        setPrevNumber('0')
        setFormula('0')

        lastOperation.current = undefined
    }

    const toggleSign = () => {

        if (number.includes('-')) {
            setNumber(number.replace('-', ''))
        } else {
            setNumber('-' + number)
        }

    }

    const deleteLast = () => {
        let currentSign = ''
        let temporalNumber = number

        if (number.includes('-')) {
            currentSign = '-'
            temporalNumber = number.replace('-', '')
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1))
        }

        return setNumber('0')
    }

    const setLastNumber = () => {
        calculateResult();

        // número actual termina con un punto elimina ese para evitar errores
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1))
        }

        // Guarda el número actual como el "número anterior" que se usará en la siguiente operación
        setPrevNumber(number)
        setNumber('0')
    }

    const divideOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.divide
    }

    const multiplyOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.multiply
    }

    const subtractOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.subtract
    }


    const addOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.add
    }

    const calculateSubResult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ')

        const num1 = Number(firstValue)
        const num2 = Number(secondValue)

        if (isNaN(num2)) {
            return num1
        }

        switch (operation) {
            case Operator.add:
                return num1 + num2
            case Operator.subtract:
                return num1 - num2
            case Operator.multiply:
                return num1 * num2
            case Operator.divide:
                return num1 / num2
            default:
                throw new Error(`Operation ${operation} not implemented`)
        }

    }

    const calculateResult = () => {
        const result = calculateSubResult()
        setFormula(result.toString())
        lastOperation.current = undefined
        setPrevNumber('0')
    }

    const buildNumber = (numberString: string) => {

        // Si el número ya contiene un punto decimal y el nuevo carácter también es un punto, no hace nada
        if (number.includes('.') && numberString === '.') return;

        // Si el número actual empieza con '0' o con '-0'
        if (number.startsWith('0') || number.startsWith('-0')) {

            // Si se intenta agregar un punto decimal, lo permite
            if (numberString === '.') {
                return setNumber(number + numberString)
            }

            // Si se intenta agregar un cero y el número ya tiene punto decimal, lo permite (para números como 0.0001)
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString)
            }

            // Si se intenta escribir un número distinto de cero y aún no hay punto, reemplaza el 0 inicial
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString)
            }

            // Si se intenta agregar más ceros sin punto decimal, lo ignora (para evitar 000...)
            if (numberString === '0' && !number.includes('.')) {
                return;
            }

        }
        setNumber(number + numberString)
    };

    return {
        //state
        formula,
        number,
        prevNumber,
        //methods
        buildNumber,
        clean,
        toggleSign,
        deleteLast,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateSubResult,
        calculateResult,
    }

}

