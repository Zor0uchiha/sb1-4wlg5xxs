import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Bell, Moon, Sun, Clock, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTaskStore } from '@/store/taskStore';
import { useAchievementStore } from '@/store/achievementStore';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [focusTimer, setFocusTimer] = useState(true);
  const clearTasks = useTaskStore((state) => state.clearTasks);
  const clearAchievements = useAchievementStore((state) => state.clearAchievements);

  const handleClearData = async () => {
    await AsyncStorage.clear();
    clearTasks();
    clearAchievements();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={24} color="#666666" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E5E5', true: '#58CC02' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              {darkMode ? (
                <Moon size={24} color="#666666" />
              ) : (
                <Sun size={24} color="#666666" />
              )}
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E5E5', true: '#58CC02' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Clock size={24} color="#666666" />
              <Text style={styles.settingText}>Focus Timer</Text>
            </View>
            <Switch
              value={focusTimer}
              onValueChange={setFocusTimer}
              trackColor={{ false: '#E5E5E5', true: '#58CC02' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearData}
          >
            <Trash2 size={24} color="#FF4B4B" />
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 12,
  },
  dangerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF4B4B',
    marginLeft: 12,
  },
  version: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});