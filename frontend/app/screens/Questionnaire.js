import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useQuestionnaire } from '../hooks/questionnaire-service';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const { questions } = useQuestionnaire();
    const navigation = useNavigation();

    // Add a loading state while questions are being fetched
    if (!questions || questions.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.contentContainer, styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#16837D" />
                    <Text style={styles.loadingText}>Loading questions...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Check if we're on the last question
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Handle selection of an answer
    const handleSelectAnswer = (answer) => {
        if (currentQuestion['answer-type'] === 'single') {
            // For single selection, just set the answer
            setResponses({
                ...responses,
                [currentQuestionIndex]: [answer],
            });
        } else if (currentQuestion['answer-type'] === 'multiple') {
            // For multiple selection, toggle the answer in the array
            const currentAnswers = responses[currentQuestionIndex] || [];
            const newAnswers = currentAnswers.includes(answer)
                ? currentAnswers.filter(item => item !== answer)
                : [...currentAnswers, answer];

            setResponses({
                ...responses,
                [currentQuestionIndex]: newAnswers,
            });
        }
    };

    // Check if an answer is selected
    const isAnswerSelected = (answer) => {
        const currentAnswers = responses[currentQuestionIndex] || [];
        return currentAnswers.includes(answer);
    };

    // Move to the next question or complete the questionnaire
    const handleNext = () => {
        if (isLastQuestion) {
            // If it's the last question, call the completion handler
            navigation.navigate('Login');
        } else {
            // Otherwise, move to the next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Move to the previous question
    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Check if the Next button should be enabled
    const isNextEnabled = () => {
        const currentAnswers = responses[currentQuestionIndex] || [];
        return currentAnswers.length > 0;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.contentContainer}>
                <Text style={styles.questionTitle}>{currentQuestion.title}</Text>

                <View style={styles.answersContainer}>
                    {currentQuestion.answers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.answerButton,
                                isAnswerSelected(answer) && styles.answerButtonSelected,
                            ]}
                            onPress={() => handleSelectAnswer(answer)}
                        >
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Back button for navigation between questions */}
            {currentQuestionIndex > 0 && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[
                    styles.nextButton,
                    !isNextEnabled() && styles.nextButtonDisabled,
                ]}
                onPress={handleNext}
                disabled={!isNextEnabled()}
            >
                <Text style={styles.nextButtonText}>
                    {isLastQuestion ? 'Submit' : 'Next'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    answersContainer: {
        marginTop: 20,
    },
    answerButton: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    answerButtonSelected: {
        borderColor: '#16837D',
        backgroundColor: '#f0f9ff',
    },
    answerText: {
        fontSize: 16,
    },
    backButton: {
        padding: 10,
        marginHorizontal: 20,
        alignItems: 'flex-start',
    },
    backButtonText: {
        color: '#16837D',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#16837D',
        padding: 15,
        alignItems: 'center',
        margin: 20,
        borderRadius: 8,
    },
    nextButtonDisabled: {
        backgroundColor: '#a0a0a0',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});