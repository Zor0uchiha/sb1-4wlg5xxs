import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTaskStore } from '@/store/taskStore';
import { TaskCard } from '@/components/TaskCard';
import { useMemo } from 'react';
import { format, isToday } from 'date-fns';

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask, totalCredits } = useTaskStore();

  const todaysTasks = useMemo(() => {
    return tasks.filter((task) => isToday(new Date(task.dueDate)));
  }, [tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Tasks</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>🌿 {totalCredits} credits</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {todaysTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks for today!</Text>
            <Text style={styles.emptyStateSubtext}>
              Add some tasks to start earning credits
            </Text>
          </View>
        ) : (
          todaysTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#58CC02',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
  },
});