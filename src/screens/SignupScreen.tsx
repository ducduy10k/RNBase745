import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomInputGroupIcon from '../components/CustomInputGroupIcon';
import CustomButton from '../components/CustomButton';
import DividerCustom from '../components/DividerCustom';
import CustomIcon from '../components/CustomIcon';
import axios from 'axios';
import FontSize from '../constants/font-size.constant';
interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  // Form
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPass, setConfirmPass] = useState<string>();
  const [errors, setErrors] = useState<{[key: string]: any}>({});

  const validateForm = () => {};

  const emailRef: any = useRef<TextInput>();
  const phoneRef: any = useRef<TextInput>();
  const passwordRef: any = useRef<TextInput>();
  const confirmPassRef: any = useRef<TextInput>();

  const handleSignup = (_event: any) => {
    const data = {
      // userName,
      email,
      // phone,
      password,
      // confirmPass,
      firstName: userName,
      lastName: userName,
    };
    axios
      .post('https://server-mycv.onrender.com/api/user', data)
      .then(res => console.log(res.data));
  };
  const handleHaveAccount = () => {
    navigation.push('Login');
  };
  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.formLoginContainer}>
          <View>
            <CustomInputGroupIcon
              placeholder="User name"
              iconLeft={{
                color: 'red',
                name: 'user',
                lib: 'Ant',
                size: 20,
              }}
              style={styles.input}
              onChangeText={setUserName}
              props={{
                autoFocus: true,
                onSubmitEditing: () => {
                  emailRef?.current?.focus();
                },
                blurOnSubmit: false,
              }}
            />
          </View>

          <View>
            <CustomInputGroupIcon
              inputRef={emailRef || undefined}
              placeholder="Email"
              iconLeft={{
                color: 'red',
                name: 'email',
                lib: 'Fontisto',
                size: 20,
              }}
              style={styles.input}
              onChangeText={setEmail}
              props={{
                onSubmitEditing: () => {
                  phoneRef?.current?.focus();
                },
                blurOnSubmit: false,
              }}
            />
          </View>
          <View>
            <CustomInputGroupIcon
              inputRef={phoneRef || undefined}
              placeholder="Phone"
              iconLeft={{
                color: 'red',
                name: 'mobile1',
                lib: 'Ant',
                size: 20,
              }}
              style={styles.input}
              onChangeText={setPhone}
              props={{
                onSubmitEditing: () => {
                  passwordRef?.current?.focus();
                },
                blurOnSubmit: false,
              }}
            />
          </View>
          <View>
            <CustomInputGroupIcon
              inputRef={passwordRef || undefined}
              placeholder="Password"
              iconLeft={{
                color: 'red',
                name: 'lock1',
                lib: 'Ant',
                size: 20,
              }}
              style={styles.input}
              props={{
                secureTextEntry: true,
                onSubmitEditing: () => {
                  confirmPassRef?.current?.focus();
                },
              }}
              onChangeText={setPassword}
            />
          </View>
          <View>
            <CustomInputGroupIcon
              inputRef={confirmPassRef || undefined}
              placeholder="Confirm password"
              iconLeft={{
                color: 'red',
                name: 'unlock',
                lib: 'Ant',
                size: 20,
              }}
              style={styles.input}
              props={{
                secureTextEntry: true,
              }}
              onChangeText={setConfirmPass}
            />
          </View>
          <View style={styles.signUpWrapper}>
            <CustomButton
              label="Sign Up"
              color="white"
              bgColor="blue"
              style={styles.signUpBtn}
              onPress={handleSignup}
            />
          </View>
          <Pressable onPress={() => handleHaveAccount()}>
            <Text style={styles.haveAccount}>I have account</Text>
          </Pressable>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'column',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').width <= 360 ? 5 : 15,
    marginBottom: Dimensions.get('window').width <= 360 ? 10 : 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width <= 360 ? 40 : 60,
  },
  formLoginContainer: {
    padding: Dimensions.get('window').width <= 360 ? 20 : 30,
    gap: 20,
  },
  input: {
    borderRadius: 8,
    borderColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  signUpWrapper: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signUpBtn: {
    flex: 1,
  },
  haveAccount: {
    textAlign: 'center',
    color: 'blue',
    fontWeight: '500',
    fontSize: FontSize.base,
  },
});
