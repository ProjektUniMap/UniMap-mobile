import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from 'react-native';
import { getRoomById } from '../api/map.api';
import { Room } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  createUserSavedRoom,
  deleteUserSavedRoom,
  isUserSavedRoom,
} from '../api/profile.api';
import { set } from 'lodash';
import { useAuth } from '../context/AuthContext';

interface DetailModalProps {
  selectedRoomId: Number | undefined;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<Number | undefined>>;
}

const DetailModal = ({
  selectedRoomId,
  setSelectedRoomId,
}: DetailModalProps) => {
  const [details, setDetails] = useState<Room | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const { profile } = useAuth();

  const handleClose = () => {
    setSelectedRoomId(-1);
  };

  const handleSave = async () => {
    let data = null;
    if (isSaved) {
      data = await deleteUserSavedRoom(
        profile?.id as string,
        selectedRoomId as number,
      );
    } else {
      data = await createUserSavedRoom(
        profile?.id as string,
        selectedRoomId as number,
      );
    }
    if (data) setIsSaved(!isSaved);
  };

  const notImplemented = () => {
    Alert.alert('Not implemented', 'This feature is not implemented yet');
  };

  useEffect(() => {
    (async () => {
      const { data } = await getRoomById(selectedRoomId as number);
      if (data) setDetails(data);
      console.log(selectedRoomId);
    })();

    (async () => {
      const data = await isUserSavedRoom(
        profile?.id as string,
        selectedRoomId as number,
      );
      if (data) setIsSaved(true);
      else setIsSaved(false);
    })();
  }, [selectedRoomId]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedRoomId !== -1}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <Pressable style={styles.bookmark} onPress={handleSave}>
            {isSaved ? (
              <MaterialIcons name="bookmark" size={24} color="#1168A7" />
            ) : (
              <MaterialIcons name="bookmark-border" size={24} color="#1168A7" />
            )}
          </Pressable>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.title}>{details?.name}</Text>
                  <Pressable onPress={handleClose}>
                    <AntDesign name="close" size={28} color="black" />
                  </Pressable>
                </View>
                <Text style={styles.subtitle}>
                  Room at {details?.buildings?.name}
                </Text>
              </View>
              <View style={styles.footer}>
                <Pressable
                  style={[styles.button, styles.directionButton]}
                  onPress={notImplemented}
                >
                  <MaterialIcons
                    name="directions-walk"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.directionText}>Direction</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.shareButton]}
                  onPress={notImplemented}
                >
                  <MaterialIcons name="share" size={24} color="#1168A7" />
                  <Text style={styles.shareText}>Share</Text>
                </Pressable>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0)', // semi-transparent background
    justifyContent: 'flex-end', // position the modal at the bottom
    elevation: 100,
  },
  modalContent: {
    height: '22%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 100,
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'thin',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 20000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  directionButton: {
    backgroundColor: '#1168A7',
  },
  directionText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  shareButton: {
    borderColor: '#1168A7',
    borderWidth: 2,
  },
  shareText: {
    color: '#1168A7',
    fontWeight: '500',
  },
  bookmark: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20000,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '1%',
    left: '3%',
  },
});

export default DetailModal;
