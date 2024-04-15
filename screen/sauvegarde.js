import React, { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import DataQuiz from "./utile/DataQuiz";
import CategoriesName from "./utile/CategoriesName";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import colors from "./utile/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebcafd",
  },
  containerScore: {
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebcafd",
  },
  text: {
    paddingTop: 120,
    fontSize: 30,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    marginBottom: 20,
  },
  score: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },
});

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const loadQuiz = useCallback(async (itemKey) => {
    try {
      const response = await DataQuiz(itemKey);
      setQuizData(response);
    } catch (error) {
      setLoadingError(true);
    }
  }, []);

  // const loadQuiz = useCallback(async (itemKey) => {
  //   try {
  //     const response = await DataQuiz(itemKey);
  //     setQuizData((prevQuizData) => [...prevQuizData, ...response]);
  //   } catch (error) {
  //     setLoadingError(true);
  //   }
  // }, []);

  const handleAnswer = (selectedOption, correctAnswer) => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const renderQuestion = () => {
    if (!quizData[currentQuestionIndex]) return null;
    const question = quizData[currentQuestionIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleAnswer(option, question.answer)}
            style={{
              backgroundColor: "#b38bd4",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <FontAwesome name="gears" size={30} color="grey" />
        <Text
          style={{ color: colors.Thistle, fontSize: 50, fontWeight: "bold" }}
        >
          QUIZ
        </Text>
        <FontAwesome5 name="brain" size={30} color="grey" />
      </View>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => setShowHomeScreen(false)}
      >
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScoreScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.containerScore}>
            <Text style={styles.score}>
              Your score : {score} / {quizData.length}
            </Text>
            {quizData.map((question, index) => (
              <View key={question._id} style={styles.item}>
                <Text style={styles.question}>{question.question}</Text>
                <Text>Correct answer: {question.answer}</Text>
                <Text>Your response: {userAnswers[index]}</Text>
                <Text>
                  {userAnswers[index] === question.answer
                    ? "Status : Correct"
                    : "Status : Incorrect"}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              style={{
                backgroundColor: "#b38bd4",
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                setQuizData([]);
                setQuizFinished(false);
                setCurrentQuestionIndex(0);
                setUserAnswers({});
                setScore(0);
                setShowHomeScreen(false);
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Return to the beginning
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  if (loadingError) {
    return (
      <View style={styles.container}>
        <Text>Error loading quiz data. Please try again later.</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#b38bd4",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => setLoadingError(false)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showHomeScreen ? (
        renderHomeScreen()
      ) : quizFinished ? (
        renderScoreScreen()
      ) : quizData && quizData.length > 0 ? ( // Ajoutez la vérification ici
        renderQuestion()
      ) : (
        <View>
          <Text style={styles.text}>Choose the category</Text>
          <View>
            <FlatList
              data={Object.keys(CategoriesName)}
              renderItem={(itemData) => {
                const categoryKey = itemData.item;
                const categoryString = CategoriesName[categoryKey];
                return (
                  <TouchableOpacity
                    onPress={() => loadQuiz(categoryKey)}
                    style={{
                      backgroundColor: "#b38bd4",
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {categoryString}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
