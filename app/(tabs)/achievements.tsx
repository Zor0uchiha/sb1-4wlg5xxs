import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAchievementStore } from '@/store/achievementStore';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AchievementsScreen() {
  const { achievements } = useAchievementStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          {achievements.filter((a) => a.completed).length} of {achievements.length} unlocked
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {achievements.map((achievement, index) => (
          <Animated.View
            key={achievement.id}
            entering={FadeInUp.delay(index * 100)}
            style={[
              styles.achievementCard,
              achievement.completed && styles.achievementCompleted,
            ]}
          >
            <View style={styles.achievementIcon}>
              <Text style={styles.icon}>{achievement.icon}</Text>
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          (achievement.progress / achievement.total) * 100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}/{achievement.total}
                </Text>
              </View>
              {achievement.completed && achievement.unlockedAt && (
                <Text style={styles.unlockedText}>
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </Text>
              )}
            </View>
          </Animated.View>
        ))}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCompleted: {
    backgroundColor: '#F0FFF4',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  unlockedText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#58CC02',
    marginTop: 8,
  },
});