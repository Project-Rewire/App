import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Card from "../../fragments/card";
import { useNavigation} from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';

// Main community card(ReWire Community)
export default function Community() {

  const navigation = useNavigation();

  const [joinedCommunities, setJoinedCommunities] = useState([
    {
      id: "0001",
      name: 'Braking Habits',
      image: require("../../assets/habits.jpeg"),
      members: 100,
    },
    {
      id: "0002",
      name: 'Fight For Freedom',
      image: require("../../assets/freedom.jpeg"),
      members: 67,
    },
  ]);

  const [suggestedCommunities, setSuggestedCommunities] = useState([
    {
      id: "0003",
      name: 'Rise from Darkness',
      image: require("../../assets/rise.png"),
      members: 45,
    },
    {
      id: "0004",
      name: 'Better Future Together',
      image: require("../../assets/better future.jpeg"),
      members: 23,
    },
    {
      id: "0005",
      name: 'Better Future Together',
      image: require("../../assets/better future.jpeg"),
      members: 23,
    },
  ]);

  const [maincommunity, setMainCommunity] = useState([
    {
      id: "0000",
      name: 'ReWire Community',
      image: require("../../assets/rewire-logo.png"),
      members: 200,
    },
  ]);

  const handleJoinCommunity = (community) => {
    setJoinedCommunities([...joinedCommunities, community]);
    setSuggestedCommunities(suggestedCommunities.filter(c => c.id !== community.id));
  };

  const handleLeaveCommunity = (community) => {
    setJoinedCommunities(joinedCommunities.filter(c => c.id !== community.id));
    setSuggestedCommunities([...suggestedCommunities, community]);
  };

  const communityCard = (item, section) => (
    <Card
      key={item.id}
      onPress={() => console.log(item.name + " Card Pressed")}
      style={styles.communitycard}
    >
      <View style={styles.cardRow}>
        <View style={styles.leftContent}>
          <Image
            source={item.image}
            style={styles.avatar}
          />
          <View style={styles.textBox}>
            <Text style={styles.heading}>{item.name}</Text>
            {item.members && <Text style={styles.members}>{item.members} members</Text>}
          </View>
        </View>
        {section !== 'mainCommunity' && (
          <TouchableOpacity
            style={[
              styles.button,
              section === 'joinedCommunities' ? styles.greenBorder : styles.greenButton
            ]}
            onPress={(e) => {
              e.stopPropagation();
              section === 'joinedCommunities'
                ? handleLeaveCommunity(item)
                : handleJoinCommunity(item);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                section === 'joinedCommunities' ? styles.greenText : styles.whiteText
              ]}
            >
              {section === 'joinedCommunities' ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Image
            source={require("../../assets/search-icon.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities..."
            placeholderTextColor="grey"
            onChangeText={(text) => console.log("Searching for:", text)}
          />
        </View>

        {/* Communities */}
        <Text style={styles.heading}>Main Community</Text>
        {communityCard(maincommunity[0], 'mainCommunity')}

        <Text style={styles.heading}>Joined Community</Text>
        {joinedCommunities.map((item) =>
          communityCard(item, 'joinedCommunities')
        )}

        <Text style={styles.heading}>Suggestions</Text>
        {suggestedCommunities.map((item) =>
          communityCard(item, 'suggestedCommunities')
        )}

        {/* Create Community button as a card */}
        <Card
          onPress={() => {
            console.log("Create Community pressed");
            navigation.navigate("CreateCommunity");
          }}
          style={styles.CreateCard}
        >
          <View style={styles.createContent}>
            <AntDesign name="addusergroup" size={24} color="green" />
            <Text style={styles.createText}>Create Community</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D6",
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    marginTop: 5,
    marginVertical: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  heading: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 5,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  textBox: {
    marginLeft: 15,
  },
  members: {
    color: "grey",
    fontSize: 12,
    marginTop: -5,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
  },
  greenButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  greenBorder: {
    backgroundColor: "transparent",
    borderColor: "#4CAF50",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  whiteText: {
    color: "#fff",
  },
  greenText: {
    color: "#4CAF50",
  },
  createCard: {
    backgroundColor: "#D9D9D6", 
    marginTop: 5,
    marginBottom: 10,
  },
  createContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  createIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  createText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  communitycard: {
    marginBottom: 10,
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  CreateCard: {
    backgroundColor: "#D9D9D6", 
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    padding: 12,
  },
});