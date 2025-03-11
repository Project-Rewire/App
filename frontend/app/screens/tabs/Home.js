import { ImageBackground, ScrollView, Text, View } from "react-native";
import Card from "../../fragments/card";
import { useTheme } from "@react-navigation/native";
import { useThemeToggle } from "../../theme-context";
import { Avatar } from "@rneui/themed";
import useQuotes from "../../hooks/quote-service";

export default function Home() {
  const { quote } = useQuotes();
  const { colors } = useTheme();
  const { toggleTheme } = useThemeToggle();

  console.log(quote);

  return (
    <ScrollView style={{ paddingHorizontal: 16, backgroundColor: colors.background }}>
      <ImageBackground
        source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: 'center' }}
      >


        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: "bold", letterSpacing: 1.5 }}>{getGreeting()}</Text>
          <Avatar
            rounded
            title="LW"
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
            onPress={toggleTheme}
          />
        </View>

        {quote && (
          <Card style={{ marginVertical: 8, padding: 8, backgroundColor: colors.card }}>
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
    </ScrollView>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  let temporalDivision;

  if (hour >= 5 && hour < 12) {
    temporalDivision = "Morning";
  } else if (hour >= 12 && hour < 18) {
    temporalDivision = "Afternoon";
  } else {
    temporalDivision = "Evening";
  }

  return `Good ${temporalDivision}`
}