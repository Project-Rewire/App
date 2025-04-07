import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const CommunityPostsScreen = ({ route, navigation }) => {
  const { communityId, communityName } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get the theme object from useTheme hook
  const theme = useTheme();

  // Create styles using the theme
  const styles = getStyles(theme);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/communities/${communityId}/posts/`);
      setPosts(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [communityId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like/`);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, like: response.data.like } : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePushToTop = (postId) => {
    // Implement push to top functionality
    // This could be a special API call or sorting mechanism
    alert('Post pushed to top!');
  };

  const handleComment = (postId) => {
    navigation.navigate('PostComments', { postId });
  };

  const handleShare = (postId) => {
    navigation.navigate('SharePost', { postId });
  };

  const navigateToCreatePost = () => {
    navigation.navigate('CreatePost', { 
      communityId, 
      communityName,
      onPostCreated: fetchPosts // Pass callback to refresh posts after creation
    });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: item.user.profile_pic || 'https://via.placeholder.com/40' }} 
          style={styles.userAvatar} 
        />
        <View style={styles.postHeaderText}>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text style={styles.timestamp}>Posted 2h ago</Text>
        </View>
      </View>
      
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.postStats}>
        <Text style={styles.likeCount}>{item.like} likes</Text>
        <Text style={styles.commentCount}>12 comments</Text>
      </View>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleLikePost(item.id)}
        >
          <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handlePushToTop(item.id)}
        >
          <Ionicons name="arrow-up-circle-outline" size={24} color={theme.colors.text} />
          <Text style={styles.actionText}>Push to Top</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleComment(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={24} color={theme.colors.text} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleShare(item.id)}
        >
          <Ionicons name="share-social-outline" size={24} color={theme.colors.text} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.communityName}>{communityName}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.communityInfo}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Joined</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet in this community</Text>
              <TouchableOpacity 
                style={styles.createPostButton}
                onPress={navigateToCreatePost}
              >
                <Text style={styles.createPostButtonText}>Create the first post</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      
      {/* Floating Action Button (FAB) for creating new posts */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={navigateToCreatePost}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={30} color={theme.colors.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Move styles to a function that takes theme as a parameter
const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.card,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.dark ? theme.colors.border : '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    textAlign: 'center',
  },
  moreButton: {
    padding: 4,
  },
  communityInfo: {
    backgroundColor: theme.colors.card,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.dark ? theme.colors.border : '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  joinButton: {
    backgroundColor: theme.dark ? theme.colors.border : '#EEEEEE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  joinButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 80,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: theme.colors.card,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.6,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.text,
  },
  postContent: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.87,
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.dark ? theme.colors.border : '#EEEEEE',
  },
  likeCount: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginRight: 16,
  },
  commentCount: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: 16,
  },
  createPostButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  createPostButtonText: {
    color: theme.colors.background,
    fontWeight: '600',
  },
});

export default CommunityPostsScreen;