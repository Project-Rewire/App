import Svg, { Circle, Text } from 'react-native-svg';
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';

interface AvatarProps {
    name: string;
    radius: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    color?: string;
    textSize?: number;
    textScalable?: boolean;
    opacity?: number;
    onPress?: () => void;
}

export default function Avatar({
    name,
    radius,
    backgroundColor,
    borderColor,
    borderWidth,
    color,
    textSize,
    textScalable = true,
    opacity = 1,
    onPress
}: AvatarProps) {
    const { colors } = useTheme();
    const circumference = 2 * Math.PI * radius;
    const avatarLetter = name.charAt(0).toUpperCase();

    backgroundColor ??= colors.primary;
    borderColor ??= colors.border;
    borderWidth ??= 2 * (radius / 56);
    color ??= colors.text;
    textSize ??= textScalable ? radius * 0.7 : 24;

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - borderWidth / 2}
                    fill={backgroundColor}
                    opacity={opacity}
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    stroke={borderColor}
                    strokeWidth={borderWidth}
                />
                <Text
                    fill={color}
                    fontSize={textSize}
                    x={radius}
                    y={radius + textSize / 3}
                    textAnchor="middle"
                >
                    {avatarLetter}
                </Text>
            </Svg>
        </TouchableOpacity>
    );
}
