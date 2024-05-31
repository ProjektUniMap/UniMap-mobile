import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultBlue, kB2, kB3, kR1 } from '../utils/constant';
import { supabase } from '../lib/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../routes/app.route';
import { useAuth } from '../context/AuthContext';

type ProfileProps = NativeStackScreenProps<AppStackParamList, 'Profile'>;

const ProfilePage = ({ navigation, route }: ProfileProps) => {
  const { profile, user, signOut } = useAuth();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableOpacity
              onPressIn={() => {}}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ marginTop: 30 }}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={64}
                color="#1168A7"
              />
            </TouchableOpacity>
            <Text style={{ color: '#1168A7', marginBottom: 30 }}>
              Change Profile Picture
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{profile?.full_name}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <Pressable
            style={[
              styles.button,
              { marginTop: 24, marginBottom: 12, backgroundColor: 'white' },
            ]}
            onPress={() => {
              signOut();
            }}
          >
            <Text style={[kB3, { color: defaultBlue }]}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
  label: {
    ...kB3,
    fontWeight: 'bold',
  },
  value: {
    ...kR1,
    marginBottom: 12,
  },
  field: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  button: {
    backgroundColor: defaultBlue,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: defaultBlue,
    borderWidth: 1,
  },
});

export default ProfilePage;
