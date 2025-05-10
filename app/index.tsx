import { View } from 'react-native'

import CalculatorButton from '@/components/calculator-button'
import ThemeText from '@/components/theme-text'
import { Colors } from '@/constants/Colors'
import { globalStyles } from '@/styles/global-styles'
import { useCalculator } from '@/hooks/use-calculator'

const CalculatorApp = () => {

    const {
        formula,
        buildNumber,
        clean,
        toggleSign,
        deleteLast,
        prevNumber,
        divideOperation,
        subtractOperation,
        multiplyOperation,
        addOperation,
        calculateSubResult,
        calculateResult,
    } = useCalculator()

    return (
        <View style={globalStyles.calculatorContainer}>

            {/*Resultados */}
            <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
                <ThemeText
                    variant='h1'

                >{formula}
                </ThemeText>

                {
                    formula === prevNumber ? (
                        <ThemeText
                            variant='h2'
                        >
                        </ThemeText>
                    ) :
                        (
                            <ThemeText
                                variant='h2'
                            >
                                {prevNumber}
                            </ThemeText>
                        )
                }
            </View>

            {/* Filas de botones */}
            <View style={globalStyles.row}>
                <CalculatorButton
                    label='C'
                    onPress={() => clean()}
                    color={Colors.lightGray}
                    blackText={true}
                />

                <CalculatorButton
                    label='+/-'
                    onPress={toggleSign}
                    color={Colors.lightGray}
                    blackText={true}
                />
                <CalculatorButton
                    label='del'
                    onPress={deleteLast}
                    color={Colors.lightGray}
                    blackText={true}
                />
                <CalculatorButton
                    label='÷'
                    onPress={() => divideOperation()}
                    color={Colors.orange}
                />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton
                    label='7'
                    onPress={() => buildNumber("7")}
                />

                <CalculatorButton
                    label='8'
                    onPress={() => buildNumber("8")}
                />
                <CalculatorButton
                    label='9'
                    onPress={() => buildNumber("9")}
                />
                <CalculatorButton
                    label='X'
                    onPress={multiplyOperation}
                    color={Colors.orange} />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton
                    label='4'
                    onPress={() => buildNumber("4")}
                />

                <CalculatorButton
                    label='5'
                    onPress={() => buildNumber("5")}
                />
                <CalculatorButton
                    label='6'
                    onPress={() => buildNumber("6")}
                />
                <CalculatorButton
                    label='-'
                    onPress={subtractOperation}
                    color={Colors.orange}
                />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton
                    label='1'
                    onPress={() => buildNumber("1")}
                />

                <CalculatorButton
                    label='2'
                    onPress={() => buildNumber("2")}
                />
                <CalculatorButton
                    label='3'
                    onPress={() => buildNumber("3")}
                />
                <CalculatorButton
                    label='+'
                    onPress={addOperation}
                    color={Colors.orange}
                />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton
                    label='0'
                    onPress={() => buildNumber("0")}
                    doubleSize={true}
                />

                <CalculatorButton
                    label='.'
                    onPress={() => buildNumber(".")}
                />
                <CalculatorButton
                    label='='
                    onPress={calculateResult}
                    color={Colors.orange}
                />
            </View>

        </View>
    )
}

export default CalculatorApp