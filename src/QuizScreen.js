import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuizScreen = ({ route }) => {
const { quizId } = route.params;
const [questions, setQuestions] = useState([]);

useEffect(() => {
// Aquí se hace la llamada a la API para obtener las preguntas del cuestionario
// y se actualiza el estado con los datos obtenidos
}, [quizId]);

const handleFinishQuiz = () => {
// Aquí se maneja la lógica para enviar las respuestas del cuestionario y mostrar los resultados
};

return (
<View>
<Text>Cuestionario</Text>
{questions.map((question) => (
<View key={question.id}>
<Text>{question.text}</Text>
{question.answers.map((answer) => (
<TouchableOpacity key={answer.id}>
<Text>{answer.text}</Text>
</TouchableOpacity>
))}
</View>
))}
<TouchableOpacity onPress={handleFinishQuiz}>
<Text>Enviar respuestas</Text>
</TouchableOpacity>
</View>
);
};

export default QuizScreen;