import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {
  darkBlue,
  defaultBlue,
  lightBlue,
  kJSMed,
  kR2,
  kB3,
  kR3,
} from '../utils/constant';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { supabase } from '../lib/supabase';
import { AuthStackParamList } from '../routes/auth.route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

type LogInPageNavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  'LogIn'
>;

const LogInPage = ({ navigation }: LogInPageNavigationProp) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    passwordVisibility,
    eyeIcon: passwordEyeIcon,
    handlePasswordVisibility,
  } = useTogglePasswordVisibility();

  useEffect(() => {
    if (email && password && !loading) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, loading]);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await signIn({ email, password });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={[kJSMed, { marginTop: 64, marginBottom: 36 }]}>
              Welcome back!!
            </Text>
          </View>

          <Text style={styles.inputLabel}>
            E-mail
            <Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={[
              styles.inputContainer,
              email ? styles.inputFieldFilled : null,
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Enter your e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.inputLabel}>
            Password
            <Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.inputField,
                password ? styles.inputFieldFilled : null,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={passwordVisibility}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={passwordEyeIcon}
                size={22}
                color={darkBlue}
              />
            </Pressable>
          </View>
          <Pressable
            style={[styles.button, { marginTop: 24, marginBottom: 24 }]}
            disabled={buttonDisabled}
            onPress={() => signInWithEmail()}
          >
            <Text style={[kB3, { color: 'white' }]}>Log In</Text>
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{ backgroundColor: '#7EC1F2', flex: 1, height: 1 }}
            ></View>
            <Text
              style={[
                kB3,
                {
                  color: darkBlue,
                  textAlign: 'center',
                  paddingLeft: 11,
                  paddingRight: 11,
                },
              ]}
            >
              or
            </Text>
            <View
              style={{ backgroundColor: '#7EC1F2', flex: 1, height: 1 }}
            ></View>
          </View>
          <Pressable
            style={[
              styles.button,
              { marginTop: 24, marginBottom: 12, backgroundColor: 'white' },
            ]}
            onPress={() => {}}
          >
            <Text style={[kB3, { color: defaultBlue }]}>
              Log In with Google
            </Text>
          </Pressable>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 89,
            }}
          >
            <Text style={[kR3, { color: defaultBlue }]}>
              Don't have an account?{' '}
              <Text
                style={[
                  kR3,
                  { color: defaultBlue, textDecorationLine: 'underline' },
                ]}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },

  requiredAsterisk: {
    color: 'red',
  },

  inputLabel: {
    ...kR2,
    marginBottom: 12,
  },

  inputContainer: {
    height: 43,
    width: '100%',
    paddingLeft: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: defaultBlue,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputField: {
    width: '90%',
  },

  inputFieldFilled: {
    backgroundColor: lightBlue,
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

export default LogInPage;
