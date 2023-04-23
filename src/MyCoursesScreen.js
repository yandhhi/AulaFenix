import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { storage, ref, getDownloadURL } from './firebaseConfig';

import coursesData from './courses.json';

const MyCoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const route = useRoute();
  const userId = route.params.userId;
  const [pensum, setPensum] = useState([]);
  
  useEffect(() => {

    const findEst = ref(storage, 'estudiantes.json');
  
    getDownloadURL(findEst)
    .then((url) => fetch(url))
    .then((response) => response.json())
    .then((data) => {
      const userData = data.find((user) => user.userId === userId);
      console.log(userData.pensum);
      setPensum(userData.pensum);
    })
    .catch((error) => {
      console.log("Error al buscar datos de usuario:", error);
    });
  
    setCourses(coursesData);
    console.log(userId);
  
  }, []);

  const navigation = useNavigation();
  
  const handleCoursePress = (courseId) => {
    navigation.navigate('Contenido', { courseId});
  };

  const handlePerfil = () => {
    navigation.navigate('Perfil');
        // Aquí se navega a la pantalla de perfil
      };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => handleCoursePress(item.id)}>
    <Text style={styles.courseName}>{item.name}</Text>
    <Text style={styles.courseDescription}>{item.description}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText} onPress={handlePerfil}>Perfil</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Logout</Text>
  </TouchableOpacity>
</View>  
    <Text style={styles.title}>Mis cursos</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginHorizontal: 45,
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


export default MyCoursesScreen;
