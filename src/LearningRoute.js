import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LearningRouteScreen = () => {

  const navigation = useNavigation();

  const handleTeoria = () => {
    navigation.navigate('Teoria');
        // Aquí se navega a la pantalla de juego
      };

  const handleVideoLesson = () => 
  navigation.navigate('Videos');{
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LearningRouteScreen;
