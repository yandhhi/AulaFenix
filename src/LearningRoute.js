import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LearningRouteScreen = () => {

  const navigation = useNavigation();

  const handleTeoria = () => {
    navigation.navigate('Teoria');
    // Aquí se navega a la pantalla de juego
  };

  const handleVideoLesson = () => {
    navigation.navigate('Videos');
    // Aquí se navega a la pantalla de lección de video
  };

  const handleQuiz = () => {
    navigation.navigate('Quiz');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruta de aprendizaje</Text>
      <TouchableOpacity style={styles.button} onPress={handleTeoria}>
        <Text style={styles.buttonText}>Conceptualización Téorica</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVideoLesson}>
        <Text style={styles.buttonText}>Lección de video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleQuiz}>
        <Text style={styles.buttonText}>Cuestionario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#859bed',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  courseContainer: {
    backgroundColor: '#859bed',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 40,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  courseDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  },
});

export default LearningRouteScreen;
