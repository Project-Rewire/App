import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Icon } from '../../fragments/icon';
import { useTheme } from '@react-navigation/native';

  // Task data structure
const initialTasks = [
  {
    id: '1',
    title: 'Morning Pledge',
    completed: false,
    expanded: true
  },
  {
    id: '2',
    title: 'Meditate for 10 minutes',
    completed: false,
    expanded: false
  },
  {
    id: '3',
    title: 'Limit screen time 1 hour\nBefore Sleep',
    completed: false,
    expanded: false
  },
  {
    id: '4',
    title: 'Evening Pledge',
    completed: false,
    expanded: false
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const { colors } = useTheme();

  // Toggle task expansion
  const toggleExpand = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, expanded: !task.expanded } : task
    ));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.paragraph}>
          <Text style={styles.paragraph}>Your AI based Task Recommendations are here</Text>
        </View>

        {tasks.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
            <TouchableOpacity 
              style={styles.taskHeader} 
              onPress={() => toggleExpand(task.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.taskTitle,
                task.title.includes('\n') && styles.multilineTitle
              ]}>
                {task.title}
              </Text>
              <Icon 
                type="materialcommunityicons"
                name={task.expanded ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#000"
              />
            </TouchableOpacity>

            {task.expanded && (
              <View style={styles.taskContent}>
                <TouchableOpacity 
                  style={[
                    styles.taskButton,
                    task.completed && styles.completedButton
                  ]}
                  onPress={() => toggleComplete(task.id)}
                >
                  <Text style={styles.buttonText}>
                    {task.completed ? "Completed" : "Mark as Complete"}
                  </Text>
                </TouchableOpacity>
                
                
                <View style={styles.taskDetails}>
                  <Text style={styles.taskDescription}>
                    Complete your task to earn badges and track your progress.
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: 16
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  paragraph:{
    alignItems: 'flex-start',
    fontSize: 17,
    padding: 2,
  }
  ,
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  taskContainer: {
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    minHeight: 60
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    paddingRight: 8
  },
  multilineTitle: {
    lineHeight: 22
  },
  taskContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  taskButton: {
    backgroundColor: '#16837D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8
  },
  completedButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: 'white',
    fontWeight: '500'
  },
  taskDetails: {
    marginTop: 8
  },
  taskDescription: {
    color: '#666',
    lineHeight: 20
  }
});