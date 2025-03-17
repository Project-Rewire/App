import { StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";

interface AchievementCardProps {
    title: number;
    status: string;
    icon: ReactNode;
}

export default function AchievementCard({ title, status, icon }: AchievementCardProps) {
    return (
        <View
            style={styles.achievementCard}
            accessibilityLabel={`${title} ${status}`}
        >
            <View style={styles.achievementIconContainer}>
                <View style={[styles.achievementIcon, styles.goldIcon]}>
                    {icon}
                </View>
            </View>
            <Text style={styles.achievementTitle}>{title}</Text>
            <Text style={styles.achievementSubtitle}>
                {status.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    achievementCard: {
        width: '31%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
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
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
    },
    achievementTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    achievementSubtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
});
