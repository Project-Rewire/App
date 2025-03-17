import Svg, { Circle, Text } from 'react-native-svg';
import { useTheme } from "@react-navigation/native";
import { color } from '@rneui/base';


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
    textScalable,
    opacity,
    onPress
}: AvatarProps) {
    const { colors } = useTheme();
    const circumference = 2 * Math.PI * radius;
    const avatarLetter = name.split('')[0].toUpperCase();

    backgroundColor = backgroundColor ? backgroundColor : colors.primary;
    borderColor = borderColor ? borderColor : colors.border;
    borderWidth = borderWidth ? borderWidth : 2 * (radius / 56);
    color = color ? color : colors.text;
    textScalable = textScalable ? textScalable : true;
    textSize = textSize ? textSize : (textScalable ? radius * 0.7 : 24);
    opacity = opacity ? opacity : 1;

    return (
        <Svg
            height={radius * 2}
            width={radius * 2}
            onPress={onPress}
        >
            {/* Progress circle */}
            <Circle
                cx={radius}
                cy={radius}
                r={radius - 5}
                fill={backgroundColor}
                opacity={opacity}
                strokeDasharray={circumference}
                strokeLinecap="round"
                stroke={borderColor}
                strokeWidth={borderWidth}
                transform={`rotate(-90, ${radius}, ${radius})`}
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
    );
}