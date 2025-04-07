import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTaskStore } from '@/store/taskStore';
import { TaskCard } from '@/components/TaskCard';
import { useMemo, useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

export default function CalendarScreen() {
  const { tasks, toggleTask, deleteTask } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDays = useMemo(() => {
    const start = startOfWeek(new Date());
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  const selectedDayTasks = useMemo(() => {
    return tasks.filter((task) => 
      isSameDay(new Date(task.dueDate), selectedDate)
    );
  }, [tasks, selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.weekContainer}
        >
          {weekDays.map((date) => (
            <View key={date.toISOString()} style={styles.dayContainer}>
              <Text style={styles.dayName}>{format(date, 'EEE')}</Text>
              <Text 
                style={[
                  styles.dayNumber,
                  isSameDay(date, selectedDate) && styles.selectedDay
                ]}
                onPress={() => setSelectedDate(date)}
              >
                {format(date, 'd')}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.dateHeader}>
          {format(selectedDate, 'MMMM d, yyyy')}
        </Text>
        {selectedDayTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks for this day</Text>
          </View>
        ) : (
          selectedDayTasks.map((task) => (
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
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  dayName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  dayNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: 'center',
    lineHeight: 36,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  selectedDay: {
    backgroundColor: '#58CC02',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dateHeader: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});