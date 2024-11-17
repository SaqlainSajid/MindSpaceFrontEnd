import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import ScreenTemplate from '../../components/ScreenTemplate';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../auth/context';
import authApi from '../../api/authApi';
import authStorage from '../../auth/storage';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpScreen = (props) => {
  const authContext = useContext(AuthContext);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ name, email, password }) => {
    setIsLoading(true);
    console.log('sending out request', email);
    const result = await authApi.register(name, email, password);
    if (!result.ok) {
      setSignUpFailed(true);
      setIsLoading(false);
      return;
    }
    setSignUpFailed(false);
    console.log(result.data);
    const user = JSON.parse(atob(result.data.split('.')[1]));
    authContext.setUser(user);
    console.log(user);
    authStorage.storeToken(result.data);
    setIsLoading(false);
  };

  return (
    <ScreenTemplate>
      <View style={styles.mainTextContainer}>
        <Text style={[styles.text, styles.mainText]}>Create New</Text>
        <Text style={[styles.text, styles.mainText]}>Account</Text>
        <View style={styles.secondaryTextContainer}>
          <Text style={[styles.text, styles.secondaryText]}>
            Already Registered? Log in{' '}
          </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => props.navigation.navigate('Login Screen')}
          >
            <Text style={[styles.text, styles.linkText]}>here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <View style={styles.inputContainer}>
                {signUpFailed ? (
                  <Text style={{ color: 'red', alignSelf: 'center' }}>
                    Registration Failed. Please try again.
                  </Text>
                ) : null}
                <Text style={styles.text}>NAME</Text>
                <TextInput
                  name='name'
                  style={styles.input}
                  autoCapitalize='words'
                  placeholder='Name'
                  autoCorrect={false}
                  onChangeText={handleChange('name')}
                />
              </View>
              <Text style={{ color: 'red' }}>{errors.name}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>EMAIL</Text>
                <TextInput
                  name='email'
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder='Email'
                  autoCorrect={false}
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  onChangeText={handleChange('email')}
                />
              </View>
              <Text style={{ color: 'red' }}>{errors.email}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>PASSWORD</Text>
                <TextInput
                  name='password'
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  placeholder='Password'
                  autoCorrect={false}
                  textContentType='password'
                  onChangeText={handleChange('password')}
                />
              </View>
              <Text style={{ color: 'red' }}>{errors.password}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>CONFIRM PASSWORD</Text>
                <TextInput
                  name='confirmPassword'
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  placeholder='Confirm Password'
                  autoCorrect={false}
                  textContentType='password'
                  onChangeText={handleChange('confirmPassword')}
                />
              </View>
              <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  text='Sign Up'
                  class='primary'
                  Style={{ width: 300 }}
                  onPress={handleSubmit}
                  disabled={isLoading}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScreenTemplate>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainTextContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  secondaryTextContainer: {
    flexDirection: 'row',
  },
  secondaryText: {
    fontSize: 14,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  form: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#c5c6e6',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: 1,
    marginBottom: 1,
  },
});
