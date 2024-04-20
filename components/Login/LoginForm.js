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

const LoginForm = () => {
  const navigation = useNavigation();

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().min(8, 'Password must be minimum of 8 characters'),
  });

  const loginHandler = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User logged in successfully');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('Please check your email and Password');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Email is invalid, please check');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => loginHandler(values.email, values.password)}
        validationSchema={loginFormSchema}
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
                placeholder="Username, email or mobile number"
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
              onPress={handleSubmit}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>

            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                  marginBottom: 200,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                paddingVertical: 12,
                borderRadius: 12,
                marginVertical: 12,
              }}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.buttonText}>Create new account</Text>
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
});

export default LoginForm;
