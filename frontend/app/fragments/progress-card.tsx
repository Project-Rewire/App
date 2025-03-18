import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import CircularProgressBar from "./circular-progress-bar";

interface ProgressCardProps {
    title: string;
    currentProgress: number;
    maximumProgress: number;
    width?: number
}

export default function ProgressCard({ title, currentProgress, maximumProgress, width }: ProgressCardProps) {

    const { colors } = useTheme();
    const progressPercentage = Math.round((currentProgress / maximumProgress) * 100);

    const getProgressComment = (): string => {
        if (progressPercentage > 75) return "Good";
        if (progressPercentage > 50) return "Average";
        if (progressPercentage > 25) return "Below Average";
        return "Poor";
    };

    return (
        <TouchableOpacity
            style={[styles.progressCard, {
                backgroundColor: colors.card,
                width: width ? width : '100%',
                borderWidth: 0.5,
                borderColor: colors.border,
            }]}
            activeOpacity={0.6}
            accessibilityLabel={`${title} card`}
            accessibilityHint={`Shows detailed information about your ${title}`}
            accessibilityRole="button"
        >
            <View style={styles.progressTextContainer}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.progressStatus, { color: colors.text }]}>{getProgressComment()}</Text>
            </View>
            <View style={styles.progressCircleContainer}>
                <CircularProgressBar
                    radius={40}
                    percentage={progressPercentage}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    progressCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        paddingHorizontal: 32,
        gap: 12,
        borderRadius: 16,
    },
    progressCircleContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    progressTitle: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: "600"
    },
    progressStatus: {
        // fontSize: 18,
    },
    progressTextContainer: {
        flex: 1,
        gap: 4,
        alignItems: 'center'
    }
});
