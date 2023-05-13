import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyCoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const route = useRoute();
  const materias = route.params?.materias;
  const modulos = route.params?.modulos;

  useEffect(() => {
    setCourses(materias);
  }, [materias]);

  const navigation = useNavigation();

  const handleCoursePress = (courseId) => {
    navigation.navigate('Contenido', { courseId, modulos });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
      marginTop: 20
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    courseContainer: {
      backgroundColor: '#859bed',
      padding: 10,
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
    }
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => handleCoursePress(item.id)}>
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis cursos</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MyCoursesScreen;
