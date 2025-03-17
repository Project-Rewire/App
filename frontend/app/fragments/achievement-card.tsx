import { StyleSheet, Text, View } from "react-native";
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
        <View
            style={[styles.achievementCard, { backgroundColor: colors.card, width: width ? width : 125 }]}
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
        </View>
    );
}

const styles = StyleSheet.create({
    achievementCard: {
        width: '50%',
        borderRadius: 16,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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
        fontSize: 18,
        opacity: 0.9
    },
    achievementSubtitle: {
        fontSize: 16,
        marginTop: 2,
        opacity: 0.6
    },
});
