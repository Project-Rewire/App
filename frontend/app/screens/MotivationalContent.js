import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';

const categories = ['Shorts', 'Suggest for you'];
const contentData = [
  {
    id: '1',
    text: "Believe you can and you're halfway there.",
    author: 'Theodore Roosevelt',
    image: require('../assets/id1.jpeg')
  },
  {
    id: '2',
    text: 'Our greatest glory is not in never failing, but in rising up every time we fail.',
    author: 'Ralph Waldo Emerson',
    image: require('../assets/id2.jpg')
  },
  {
    id: '3',
    text: 'Sometimes the smallest step in the right direction ends up being the biggest step of your life.',
    author: 'Naeem Callaway',
    image: require('../assets/id3.jpeg')
  },
  {
    id: '4',
    text: "It's okay to bleed on someone who didn't cut you.",
    author: 'Toni Sorenson',
    image: require('../assets/id4.jpeg')
  },
];

const suggestedData = [...contentData];

const MotivationalContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('Shorts');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>MOTIVATIONAL CONTENT</Text>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedCategory === 'Shorts' && (
          <FlatList
            data={contentData}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.quote}>{item.text}</Text>
                <Text style={styles.author}>- {item.author}</Text>
              </View>
            )}
          />
        )}
        {selectedCategory === 'Suggest for you' && (
          <FlatList
            data={suggestedData}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.quote}>{item.text}</Text>
                <Text style={styles.author}>- {item.author}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f8f8f8' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  categoryContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  categoryButton: { padding: 10, marginHorizontal: 5, backgroundColor: '#ddd', borderRadius: 5 },
  selectedCategory: { backgroundColor: '#8ac6d1' },
  card: { flex: 1, backgroundColor: '#fff', margin: 5, padding: 10, borderRadius: 10, alignItems: 'center' },
  image: { width: 150, height: 200, borderRadius: 10 },
  quote: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  author: { fontSize: 12, color: 'gray', textAlign: 'center' },
});

export default MotivationalContent;