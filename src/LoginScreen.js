import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, signIn } from './firebaseConfig';

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const materias = route.params?.filteredPensum;
  const modulos = route.params?.modulesData;

  const handleLogin = () => {
    signIn(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('Sincronizar', { userId: userCredential.user.uid });
        setShowForm(!showForm);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAccessAula = () => {
    navigation.navigate('Mis cursos', { materias, modulos });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleForm} style={styles.button}>
        <Text style={styles.buttonText}>Sincronizar Aula</Text>
      </TouchableOpacity>
      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Credenciales de Aula</Text>
          <View style={styles.inputContainer}>
            <Image source={require('./assets/icon.png')} style={styles.inputIcon} />
            <TextInput
              placeholder="Usuario"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./assets/icon.png')} style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sincronizar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.logoContainer}>
        <Image source={require('./assets/Header.jpg')} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={handleAccessAula} style={styles.button}>
        <Text style={styles.buttonText}>Acceso Aula</Text>
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
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 250,
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
    alignSelf: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
