import React, { ReactNode } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";

export function List({ children }: { children: ReactNode }) {
    return <View style={styles.list}>{children}</View>;
}

export function Group({ children }: { children: ReactNode }) {
    return <View style={styles.listGroup}>{children}</View>;
}

export function Item({
    children,
    callBack,
}: {
    children: ReactNode;
    callBack?: () => void;
}) {
    return (
        <TouchableHighlight
            onPress={callBack}
            underlayColor="#E0E0E0"
            accessibilityRole="button"
            accessibilityLabel="Settings option"
        >
            <View style={styles.item}>{children}</View>
        </TouchableHighlight>
    );
}

export function ItemLeft({ children }: { children: ReactNode }) {
    return <View style={styles.itemLeft}>{children}</View>;
}

export function ItemText({ children }: { children: ReactNode }) {
    return <Text style={styles.itemText}>{children}</Text>;
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        gap: 12,
    },
    listGroup: {
        backgroundColor: "#fff",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    itemText: {
        fontSize: 16,
        color: '#333333'
    },
});