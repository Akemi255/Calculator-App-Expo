import { Pressable, Text, } from 'react-native';

import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';


interface Props {
    label: string;
    color?: string
    blackText?: boolean
    onPress: () => void
    doubleSize?: boolean
}

const CalculatorButton = ({
    label,
    doubleSize = false,
    color = Colors.darkGray,
    blackText = false,
    onPress
}: Props) => {

    return (
        <Pressable
            style={({ pressed }) => ({
                ...globalStyles.button,
                backgroundColor: color,
                opacity: pressed ? 0.8 : 1,
                width: doubleSize ? 180 : 80,
            })}
            onPress={() => {
                Haptics.selectionAsync();
                onPress();
            }}>
            <Text
                style={{ ...globalStyles.buttonText, color: blackText ? 'black' : 'white' }}
            >
                {label}
            </Text>
        </Pressable>
    );
}

export default CalculatorButton;
