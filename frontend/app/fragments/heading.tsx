import { Text, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

interface H1Props {
    children: React.ReactNode;
    style?: TextStyle;
}

export function H1({ children, style }: H1Props) {
    const { colors } = useTheme();

    const defaultStyle: TextStyle = {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        color: colors.text
    };

    return (
        <Text style={[defaultStyle, style]}>
            {children}
        </Text>
    );
}
