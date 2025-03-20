import { Text, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

interface HProps {
    children: React.ReactNode;
    style?: TextStyle;
}

export function H1({ children, style }: HProps) {
    const { colors } = useTheme();

    const defaultStyle: TextStyle = {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginVertical: 16,
        marginHorizontal: 8
    };

    return (
        <Text style={[defaultStyle, style]}>
            {children}
        </Text>
    );
}

export function H2({ children, style }: HProps) {
    const { colors } = useTheme();

    const defaultStyle: TextStyle = {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        opacity: 0.8,
        marginVertical: 16,
        marginHorizontal: 8
    };

    return (
        <Text style={[defaultStyle, style]}>
            {children}
        </Text>
    );
}
