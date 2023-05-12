import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyCoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const route = useRoute();
  const materias = route.params?.materias;

  useEffect(() => {
    setCourses(materias);
  }, [materias]);

  const navigation = useNavigation();

  const handleCoursePress = (courseId) => {
    navigation.navigate('Contenido', { courseId });
  };


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseDescription: {
    marginTop: 5,
    color: '#666',
  },
});

export default MyCoursesScreen;