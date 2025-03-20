import Svg, { Circle, Text } from 'react-native-svg';
import { useTheme } from "@react-navigation/native";

interface CircularProgressBarProps {
    radius: number;
    percentage: number;
    strokeColor?: string;
    backgroundColor?: string;
    strokeWidth?: number;
    showPercentage?: boolean;
    textColor?: string;
    textSize?: number;
}

export default function CircularProgressBar({
    radius,
    percentage,
    strokeColor,
    backgroundColor,
    strokeWidth,
    showPercentage,
    textColor,
    textSize,
}: CircularProgressBarProps) {
    const { colors } = useTheme();
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (circumference * percentage / 100);

    strokeColor = strokeColor ? strokeColor : colors.primary;
    backgroundColor = backgroundColor ? backgroundColor : colors.card;
    strokeWidth = strokeWidth ? strokeWidth : 10;
    showPercentage = showPercentage ? showPercentage : true;

    textColor = textColor ? textColor : colors.text;
    textSize = textSize ? textSize : radius * 0.4;

    return (
        <Svg height={radius * 2} width={radius * 2}>
            {/* Background circle */}
            <Circle
                cx={radius}
                cy={radius}
                r={radius - 5}
                stroke={strokeColor}
                opacity={0.3}
                strokeWidth={strokeWidth}
                fill={backgroundColor}
            />
            {/* Progress circle */}
            <Circle
                cx={radius}
                cy={radius}
                r={radius - 5}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90, ${radius}, ${radius})`}
            />
            {/* Percentage text */}
            {showPercentage && (
                <Text
                    fill={textColor}
                    fontSize={textSize}
                    fontWeight="bold"
                    x={radius * 0.9}
                    y={radius + textSize / 3}
                    textAnchor="middle"
                >
                    {Math.round(percentage)}%
                </Text>
            )}
        </Svg>
    );
}