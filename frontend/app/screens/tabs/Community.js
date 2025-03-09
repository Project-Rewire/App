import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Card from "../../fragments/card";

// Main community card(ReWire Community)
export default function Community() {

  //some dummy data
  const [maincommunity, setMainCommunity] = useState([
    {
      id: "0000",
      name: 'ReWire Community',
      image: require("../../assets/rewire-logo.png"),
    },
    ]);
  
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
        members: 67
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
    ]);
  const handleJoinCommunity= (community) => {
    setJoinedCommunities([...joinedCommunities, community]);
    setSuggestedCommunities(suggestedCommunities.filter(c => c.id !== community.id));
  };

  const handleLeaveCommunity = (community) => {
    setJoinedCommunities(joinedCommunities.filter(c => c.id !== community.id));
    setSuggestedCommunities([...suggestedCommunities, community]);
  };

  return (
    <View style={{ flex: 1, borderRadius: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
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
        <Text style={styles.text}>Main Community</Text>
        <Card
          onPress={() => console.log("Card Pressed")}
          style={styles.communitycard}
        >
          <View style={styles.titleContainer}>
            <Image
              source={require("../../assets/rewire-logo.png")}
              style={styles.image}
            />
            <Card.Title>ReWire Community</Card.Title>
          </View>
        </Card>
        <Text style={styles.text}>Joined Community</Text>
        {joinedCommunities.map((community, index) => (
          <Card
            key={index}
            onPress={() => handleLeaveCommunity(community)}
            style={styles.communitycard}
          >
            <View style={styles.titleContainer}>
              <Image
                source={community.image}
                style={styles.image}
              />
              <Card.Title>{community.name}</Card.Title>
            </View>
          </Card>
        ))}
        <Text style={styles.text}>Suggestions</Text>
        {suggestedCommunities.map((community, index) => (
          <Card
            key={index}
            onPress={() => handleJoinCommunity(community)}
            style={styles.communitycard}
          >
            <View style={styles.titleContainer}>
              <Image
                source={community.image}
                style={styles.image}
              />
              <Card.Title>{community.name}</Card.Title>
            </View>
          </Card>
        ))}
        <Card
          onPress={() => console.log("Create Community Pressed")}
          style={styles.CreateCommCard}
        >
          <View style={styles.createCommContainer}>
            <Image
              source={require("../../assets/community-icon.png")}
              style={styles.CommunityImage}
            />
            <Text style={styles.commmunityText}>Create Community</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

// Card stylesheet
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D6",
    borderRadius: 30,
    padding: 10,
    marginBottom: 5,
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

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },

  communitycard: {
    borderRadius: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: "green",
    borderWidth: 2,
  },
  text: {
    color: "grey",
    fontSize: 14,
    paddingLeft: 5,
    paddingBottom: 10,
    textAlign: "left",
  },
  CreateCommCard: {
    backgroundColor: "#D9D9D6",
    padding: 10,
    borderRadius: 45,
    marginTop: 10,
  },
  createCommContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  CommunityImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  commmunityText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
  },
});
