import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function About() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Nam commodo lacus fusce himenaeos sollicitudin montes etiam. 
                    Mauris tincidunt tempor sodales nisi nisl sem. Vehicula nec augue consectetur massa ante diam ut blandit. 
                    In duis congue volutpat varius leo egestas aptent. Gravida eros congue sollicitudin faucibus imperdiet elementum lacinia semper.
                    Tincidunt porttitor scelerisque auctor nec tellus penatibus enim dapibus. Non orci leo viverra vestibulum varius sagittis habitant facilisi. 
                    Varius sociosqu placerat torquent mollis vestibulum semper placerat. Non condimentum adipiscing dui dictum vitae vulputate facilisi montes inceptos. 
                    Eros nulla vel per enim consequat ornare felis turpis. Dignissim tempus elementum proin nascetur efficitur varius sed vehicula. Nisi id commodo dapibus dui erat venenatis.
                     Pellentesque sodales sociosqu et cursus porttitor habitasse. Mauris mus pretium ipsum facilisis ridiculus neque duis.
                    Dignissim ullamcorper facilisi faucibus sit amet montes pretium at. Pellentesque vivamus vitae ligula ad nullam maecenas per. Luctus morbi et, hac netus magna suspendisse. 
                    Etiam facilisi dictum efficitur ac hendrerit nisl duis. Senectus finibus porttitor dapibus massa justo, maximus interdum urna. 
                    Iaculis habitasse eleifend egestas suspendisse parturient diam. Aliquet placerat accumsan sit condimentum neque dictum ipsum amet. Curabitur varius sed enim habitant maximus.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        padding: 8
    }
});