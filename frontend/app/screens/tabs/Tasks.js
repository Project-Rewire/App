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
    description: 'Start your day with a positive affirmation or commitment to stay focused and productive.',
    difficulty: 'easy',
    marks: 3,
    status: 'not_started',
    expanded: true
  },
  {
    id: '2',
    title: 'Meditate for 10 minutes',
    description: 'Take a break to calm your mind, focus on your breath, and practice mindfulness for mental clarity.',
    difficulty: 'medium',
    marks: 5,
    status: 'not_started',
    expanded: false
  },
  {
    id: '3',
    title: 'Limit screen time 1 hour Before Sleep',
    description: 'Reduce exposure to screens before bed to improve sleep quality and overall well-being.',
    difficulty: 'hard',
    marks: 5,
    status: 'not_started',
    expanded: false
  },
  {
    id: '4',
    title: 'Evening Pledge',
    description: 'Reflect on your day, express gratitude, and set intentions for a restful night and a productive tomorrow.',
    difficulty: 'hard',
    marks: 9,
    status: 'not_started',
    expanded: false
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const { colors } = useTheme();

  // Toggle task expansion - only one task can be expanded at a time
  const toggleExpand = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, expanded: !task.expanded } 
        : { ...task, expanded: false }
    ));
  };

  // Task status progression: not_started -> in_progress -> completed
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // Determine the next status
        let newStatus = task.status;
        
        if (newStatus === 'not_started') {
          newStatus = 'in_progress';
        } else if (newStatus === 'in_progress') {
          newStatus = 'completed';
        } else {
          // If already completed, do nothing
          return task;
        }
        
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.paragraph}>
          <Text style={styles.paragraph}>Complete your task to earn badges and track your progress.</Text>
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
                <View style={styles.difficultyTag}>
                  <Text style={styles.difficultyText}>
                    {task.difficulty}
                  </Text>
                </View>
                <Text style={styles.taskDescription}>
                  {task.description}
                </Text>
                <Text style={styles.taskDescription}>
                  Complete this task to get {task.marks} points.
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.taskButton,
                    task.status === 'in_progress' && styles.inProgressButton,
                    task.status === 'completed' && styles.completedButton
                  ]}
                  onPress={() => toggleTaskStatus(task.id)}
                  disabled={task.status === 'completed'}
                >
                  <Text style={styles.buttonText}>
                    {task.status === 'not_started' ? "Start" : 
                     task.status === 'in_progress' ? "Mark as Complete" : 
                     "Completed"}
                  </Text>
                </TouchableOpacity>
                
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
  },
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
  inProgressButton: {
    backgroundColor: '#FFA726'  // Orange for in-progress state
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
    top: 5,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10
  },
  difficultyTag: {
    top: 12,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9'
  },
  difficultyText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});