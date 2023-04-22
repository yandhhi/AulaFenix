import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import MyCoursesScreen from './src/MyCoursesScreen';
import CourseContentScreen from './src/CourseContentScreen';
import LearningRouteScreen from './src/LearningRoute';
import QuizScreen from './src/QuizScreen';
import Teorico from './src/Teorico';
//import RelatedVideos from './src/RelatedVideos.tsx';
import UserProfileScreen from './src/UserProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={LoginScreen} />
        <Stack.Screen name="Recuperar Contraseña" component={ForgotPasswordScreen} />
        <Stack.Screen name="Mis cursos" component={MyCoursesScreen} />
        <Stack.Screen name="Contenido" component={CourseContentScreen} />
        <Stack.Screen name="Aprendizaje" component={LearningRouteScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} /> 
        <Stack.Screen name="Teoria" component={Teorico} />
        {/*<Stack.Screen name="Videos" component={RelatedVideos} />*/}
        <Stack.Screen name="Perfil" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
