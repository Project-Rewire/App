import { ImageBackground, ScrollView, Text, View } from "react-native";
import Card from "../../fragments/card";
import { useTheme } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import useQuotes from "../../hooks/quote-service";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { quote } = useQuotes();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    let partOfDay;

    if (hour >= 5 && hour < 12) partOfDay = "Morning";
    else if (hour >= 12 && hour < 18) partOfDay = "Afternoon";
    else partOfDay = "Evening";

    return `Good ${partOfDay}`
  };

  return (
    <ScrollView>

      <ImageBackground
        source={require('../../assets/pexels-pink-flowers.jpg')}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 16, height: 300 }}
      >

        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: "bold", letterSpacing: 1.5 }}>{getGreeting()}</Text>
          <Avatar
            rounded
            title="I"
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              height: 56,
              width: 56,
            }}
            titleStyle={{
              color: colors.text
            }}
            onPress={() => navigation.navigate('SettingsNavigator', { screen: 'Settings' })}
          />
        </View>

        {quote && (
          <Card style={{ marginVertical: 8, padding: 8, backgroundColor: `rgba(255, 255, 255, 0.7)` }}>
            <Card.Content>
              <Text style={{ fontSize: 18, fontStyle: "italic", textAlign: "center", color: colors.text }}>
                {quote.quote}
              </Text>
              <Text style={{ textAlign: "center", marginTop: 8, color: colors.text }}>
                - {quote.author} -
              </Text>
            </Card.Content>
          </Card>
        )}
      </ImageBackground>
    </ScrollView >
  );
}

