import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Divider } from '@rneui/themed';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

interface SettingsModalProps {
  navigation: NavigationProp<any>;
  openSettingsModal: boolean;
  setOpenSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal = ({
  navigation,
  openSettingsModal,
  setOpenSettingsModal,
}: SettingsModalProps) => {
  const { user, profile, signOut } = useAuth();

  const handleClose = () => {
    setOpenSettingsModal(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={openSettingsModal}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Pressable
                style={styles.profile}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Profile');
                }}
              >
                <View style={styles.head}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={40}
                    color="#1168A7"
                    style={{ backgroundColor: 'white' }}
                  />
                  <View>
                    <Text style={styles.profileTitle}>
                      {profile?.full_name}
                    </Text>
                    <Text style={styles.profileSubtitle}>{user?.email}</Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="black"
                />
              </Pressable>
              <Divider />
              <Pressable
                style={styles.option}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Favorites');
                }}
              >
                <MaterialIcons name="bookmark-border" size={24} color="black" />
                <Text style={styles.optionText}>Favorites</Text>
              </Pressable>
              <Divider />
              <Pressable
                style={styles.option}
                onPress={() => {
                  handleClose();
                  signOut();
                }}
              >
                <MaterialIcons name="logout" size={24} color="#E12A2A" />
                <Text style={[styles.optionText, { color: '#E12A2A' }]}>
                  Log Out
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    justifyContent: 'center', // position the modal in the center
    alignItems: 'center',
  },
  modalContent: {
    maxWidth: 500,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    paddingVertical: 28,
    gap: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  profileSubtitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'thin',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SettingsModal;
