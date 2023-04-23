import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigation.navigate('Mis cursos', { userId: userCredential.user.uid });

      
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const handleForgotPassword = () => {
    navigation.navigate('Recuperar Contraseña');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/Header.jpg')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.label}>Ingrese su usuario y contraseña</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Usuario"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordButtonText: {
    color: 'blue',
  },
});

export default LoginScreen;