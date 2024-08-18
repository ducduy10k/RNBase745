import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomInputGroupIcon from '../components/CustomInputGroupIcon';
import CustomButton from '../components/CustomButton';
import DividerCustom from '../components/DividerCustom';
import CustomIcon from '../components/CustomIcon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthContextProps} from '../context/AuthContext';
import Colors from '../constants/color.constant';
import LoadingOverlay from '../ui/common/LoadingOverlay';
import ErrorOverlay from '../ui/common/ErrorOverlay';
import FontSize from '../constants/font-size.constant';
interface LoginScreenProps {
  navigation: any;
}

interface LoginStateInterface {
  email: {
    focused: boolean;
    value: string;
  };
  password: {
    focused: boolean;
    value: string;
  };
}
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {login} = useContext<Partial<AuthContextProps>>(AuthContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [inputValues, setInputValues] = useState<LoginStateInterface>({
    email: {
      focused: false,
      value: '',
    },
    password: {
      focused: false,
      value: '',
    },
  });

  const [errors, setErrors] = useState<{
    [key: keyof LoginStateInterface | string]: any;
  }>({});
  const {width, height} = useWindowDimensions();

  const checkValidate = (
    inputIdentifier: keyof LoginStateInterface,
    value: string,
  ) => {
    switch (inputIdentifier) {
      case 'email': {
        return {
          ...errors,
          [inputIdentifier]: {
            ...errors[inputIdentifier],
            required: value.trim().length == 0,
          },
        };
      }
      case 'password': {
        return {
          ...errors,
          [inputIdentifier]: {
            ...errors[inputIdentifier],
            length: value.trim().length < 6,
            required: value.trim().length == 0,
          },
        };
      }
      default: {
        return errors;
      }
    }
  };

  const inputChangeHandler = (
    inputIdentifier: keyof LoginStateInterface,
    value: string,
  ) => {
    setInputValues({
      ...inputValues,
      [inputIdentifier]: {
        focused: true,
        value,
      },
    });
    setErrors(checkValidate(inputIdentifier, value));
  };
  const passwordRef: any = useRef<TextInput>();
  const handleSignIn = (_event: any) => {
    let isInValid = false;
    let newError = {};
    if (!inputValues.email.focused) {
      newError = checkValidate('email', inputValues.email.value);
      isInValid = isInValid || checkInvalidForm(newError);
    }
    if (!inputValues.password.focused) {
      newError = {
        ...newError,
        ...checkValidate('password', inputValues.password.value),
      };
      isInValid = isInValid || checkInvalidForm(newError);
    }
    if (newError) {
      setErrors(newError);
    }
    if (!isInValid) {
      isInValid = checkInvalidForm(errors);
    }
    if (isInValid) {
      Alert.alert('Invalid input', 'Please check your input');
      return;
    }
    setIsFetching(true);
    axios
      .post('https://server-mycv.onrender.com/api/auth', {
        email: inputValues.email.value,
        password: inputValues.password.value,
      })
      .then(res => {
        if (res.status === 200) {
          AsyncStorage.setItem('token', res.data.token);
          if (login) login(res.data.token);
        }
      })
      .catch(err => {
        setError('Could not login');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
  function handleRegister() {
    navigation.push('Signup');
  }

  function resetError() {
    setError(null);
  }

  function checkInvalidForm(errors: {[key: string]: any}) {
    const keyErrors = Object.keys(errors);
    if (errors && keyErrors.length > 0) {
      for (const keyError of keyErrors) {
        for (const err of Object.keys(errors[keyError])) {
          if (errors[keyError][err]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={resetError} />;
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'position' : 'height'}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={[styles.logo, {marginTop: height < 380 ? 10 : 30}]}
              source={require('../assets/images/avatarmin.png')}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.formLoginContainer}>
            <View>
              <CustomInputGroupIcon
                placeholder="Email"
                iconLeft={{
                  color: Colors.dangerColor,
                  name: 'user',
                  lib: 'Ant',
                  size: 20,
                }}
                style={styles.input}
                props={{
                  onSubmitEditing: () => {
                    passwordRef?.current?.focus();
                  },
                  blurOnSubmit: false,
                }}
                invalid={errors.email && checkInvalidForm(checkValidate('email', inputValues.email.value))}
                value={inputValues.email.value}
                onChangeText={inputChangeHandler.bind(this, 'email')}
              />
            </View>
            <View>
              <CustomInputGroupIcon
                inputRef={passwordRef}
                placeholder="Password"
                iconLeft={{
                  color: Colors.dangerColor,
                  name: 'lock1',
                  lib: 'Ant',
                  size: 20,
                }}
                invalid={errors.password && checkInvalidForm(checkValidate('password', inputValues.password.value))}
                props={{
                  secureTextEntry: true,
                  onEndEditing: e => {
                    inputChangeHandler.bind(
                      this,
                      'password',
                      e.nativeEvent.text,
                    );
                  },
                }}
                style={styles.input}
                value={inputValues.password.value}
                onChangeText={inputChangeHandler.bind(this, 'password')}
              />
            </View>
            <Pressable>
              <Text style={styles.forgotAccount}>Forgot your password?</Text>
            </Pressable>
            <View style={styles.signInWrapper}>
              <CustomButton
                label="Sign In"
                color="white"
                bgColor={Colors.primaryColor}
                style={styles.signInBtn}
                iconSubfix={{
                  color: 'white',
                  name: 'arrowright',
                  lib: 'Ant',
                  size: 14,
                }}
                onPress={e => handleSignIn(e)}
              />
              <TouchableOpacity>
                <CustomIcon name="fingerprint" lib="Awesome6" size={28} />
              </TouchableOpacity>
            </View>
            <View>
              <DividerCustom title="OR" />
            </View>
            <View style={styles.loginWith}>
              <View style={styles.loginItem}>
                <CustomIcon
                  name="google"
                  lib="Ant"
                  size={22}
                  color={Colors.dangerColor}
                />
              </View>
              <View style={styles.loginItem}>
                <CustomIcon
                  name="facebook"
                  lib="Awesome"
                  size={22}
                  color={Colors.primaryColor}
                />
              </View>
              <View style={styles.loginItem}>
                <CustomIcon
                  name="twitter"
                  lib="Ant"
                  size={22}
                  color={Colors.successColor}
                />
              </View>
            </View>
            <View style={styles.createAccountContainer}>
              <Text style={styles.dontAccount}>Don't have an account?</Text>
              <Pressable onPress={() => handleRegister()}>
                <Text style={styles.createAccount}>Create your account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'column',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width <= 360 ? 110 : 150,
    height: Dimensions.get('window').width <= 360 ? 110 : 150,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: Dimensions.get('window').width <= 360 ? 10 : 20,
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width <= 360 ? 30 : 45,
  },
  formLoginContainer: {
    padding: Dimensions.get('window').width <= 360 ? 20 : 30,
    gap: Dimensions.get('window').width <= 360 ? 15 : 20,
  },
  input: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: Dimensions.get('window').width <= 360 ? 40 : 50,
  },
  signInWrapper: {
    flexDirection: 'row',
    gap: Dimensions.get('window').width <= 360 ? 20 : 25,
    alignItems: 'center',
  },
  signInBtn: {
    flex: 1,
  },
  loginWith: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Dimensions.get('window').width <= 360 ? 20 : 30,
  },
  loginItem: {
    borderColor: Colors.gray300,
    borderWidth: 1,
    width: Dimensions.get('window').width <= 360 ? 50 : 60,
    height: Dimensions.get('window').width <= 360 ? 50 : 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  createAccountContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  dontAccount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  createAccount: {
    color: Colors.primaryColor,
    alignSelf: 'flex-end',
    fontWeight: '500',
    fontSize: FontSize.base,
  },
  forgotAccount: {
    textAlign: 'right',
    fontWeight: '500',
    fontSize: FontSize.base,
  },
  textNotiInvalid: {
    color: Colors.dangerColor,
    marginBottom: 5,
    fontSize: FontSize.base,
  },
});
