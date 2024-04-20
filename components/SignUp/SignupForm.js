import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import validator from 'email-validator';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignupForm = () => {
  const navigation = useNavigation();

  function generateRandom() {
    const val = uuid.v4();
    return val;
  }
  const signUpHandler = async (email, userName, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        firestore()
          .collection('random-users')
          .doc(email)
          .set({
            owner_id: generateRandom(),
            password: password,
            profile_picture: await getRandomProfilePicture(),
            user_name: userName,
          })
          .then(() => {
            console.log('User added!');
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });

        Alert.alert('User account created & signed in!');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    userName: Yup.string()
      .min(2, 'A user name is required')
      .required('A user name is required'),
    password: Yup.string()
      .min(8, 'Password must be minimum of 8 characters')
      .required('A password is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', userName: '', password: ''}}
        onSubmit={values =>
          signUpHandler(values.email, values.userName, values.password)
        }
        validationSchema={signupFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="email-address"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor:
                    values.userName.length >= 2 || values.userName.length == 0
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor:
                    values.password.length >= 8 || values.password.length == 0
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <Pressable
              style={[
                styles.button,
                {backgroundColor: isValid ? 'blue' : '#9ACAF7'},
              ]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={[styles.signInText, {color: 'white'}]}>
                Already have an account?
                <Text style={styles.signInText}> Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  signInText: {
    color: '#9ACAF7',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SignupForm;
