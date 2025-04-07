import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { Task } from '@/store/taskStore';
import { format } from 'date-fns';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container, task.completed && styles.completed]}>
      <TouchableOpacity
        style={styles.checkContainer}
        onPress={onToggle}
        activeOpacity={0.7}>
        <View style={[styles.checkbox, task.completed && styles.checked]}>
          {task.completed && <Check size={16} color="#FFFFFF" />}
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          <Text style={styles.subtitle}>
            Due: {format(new Date(task.dueDate), 'MMM d, yyyy')} • {task.credits} credits
          </Text>
          {task.streak > 0 && (
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>🔥 {task.streak} day streak</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Trash2 size={20} color="#FF4B4B" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completed: {
    opacity: 0.7,
    backgroundColor: '#F5F5F5',
  },
  checkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#58CC02',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#58CC02',
    borderColor: '#58CC02',
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  deleteButton: {
    padding: 8,
  },
  streakContainer: {
    marginTop: 8,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF9800',
  },
});