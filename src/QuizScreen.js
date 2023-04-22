import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import cuestionario from './cuestionario.json';

const QuizScreen = () => {
  const [questions, setQuestions] = useState(cuestionario.questions);
  const [answers, setAnswers] = useState([]);
  const scrollViewRef = useRef(null);

  const handleAnswerQuestion = (questionId, optionId) => {
    const updatedAnswers = [...answers];
    const questionIndex = updatedAnswers.findIndex((answer) => answer.questionId === questionId);
    if (questionIndex !== -1) {
      updatedAnswers[questionIndex] = { questionId, optionId };
    } else {
      updatedAnswers.push({ questionId, optionId });
    }
    setAnswers(updatedAnswers);
  };

  const handleFinishQuiz = () => {
    let score = 0;
    questions.forEach((question) => {
      const selectedAnswer = answers.find((answer) => answer.questionId === question.id)?.optionId;
      const correctAnswer = question.options.find((option) => option.isCorrect)?.id;
      if (selectedAnswer === correctAnswer) {
        score++;
      }
    });
    alert(`Tu puntaje es: ${score} de ${questions.length}`);
  };

  const handleScroll = (questionId) => {
    const questionIndex = questions.findIndex((question) => question.id === questionId);
    if (questionIndex !== -1) {
      scrollViewRef.current.scrollTo({ y: questionIndex * 350, animated: true });
    }
  };

  const isAnswerSelected = (questionId, optionId) => {
    const selectedAnswer = answers.find((answer) => answer.questionId === questionId)?.optionId;
    return selectedAnswer === optionId;
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <Text style={styles.title}>{cuestionario.title}</Text>
        <Text style={styles.description}>{cuestionario.description}</Text>
        {questions.map((question) => (
          <View key={question.id}>
            <Text style={styles.question}>{question.text}</Text>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleAnswerQuestion(question.id, option.id)}
                style={[
                  styles.option,
                  isAnswerSelected(question.id, option.id) && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity onPress={handleFinishQuiz} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    },
    selectedOption: {
    backgroundColor: '#00FF00',
    },
    optionText: {
    fontSize: 16,
    },
    scrollButton: {
    backgroundColor: '#00CED1',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    },
    scrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    submitButton: {
    backgroundColor: '#00CED1',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    },
    submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    });
    
    export default QuizScreen;