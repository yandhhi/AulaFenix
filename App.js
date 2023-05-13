import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import MyCoursesScreen from './src/MyCoursesScreen';
import CourseContentScreen from './src/CourseContentScreen';
import LearningRouteScreen from './src/LearningRoute';
import QuizScreen from './src/QuizScreen';
import Teorico from './src/Teorico';
import RelatedVideos from './src/RelatedVideos';
import SyncScreen from './src/SyncScreen';

import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Mis cursos" component={MyCoursesScreen} options={{headerShown: false}} />
        <Stack.Screen name="Contenido" component={CourseContentScreen} />
        <Stack.Screen name="Aprendizaje" component={LearningRouteScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} /> 
        <Stack.Screen name="Teoria" component={Teorico} />
        <Stack.Screen name="Videos" component={RelatedVideos} />
        <Stack.Screen name="Sincronizar" component={SyncScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
