import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";

interface AchievementCardProps {
    title: number;
    status: string;
    icon: ReactNode;
    width?: number;
}

export default function AchievementCard({ title, status, icon, width }: AchievementCardProps) {

    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.achievementCard, { backgroundColor: colors.card, width: width ? width : 125 }]}
            activeOpacity={0.6}
            accessibilityLabel={`${title} ${status}`}
        >
            <View style={styles.achievementIconContainer}>
                <View style={[styles.achievementIcon, styles.goldIcon]}>
                    {icon}
                </View>
            </View>

            <View style={styles.achievementTextContainer}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.achievementSubtitle, { color: colors.text }]}>
                    {status.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    achievementCard: {
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        minHeight: 140,
    },
    achievementIconContainer: {
        marginBottom: 8,
    },
    achievementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goldIcon: {
        backgroundColor: 'rgba(255, 215, 0, 0.3)',
    },
    achievementTextContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.9
    },
    achievementSubtitle: {
        marginTop: 2,
        opacity: 0.6
    },
});
