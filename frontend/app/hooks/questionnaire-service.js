import { useState, useEffect } from "react";

export function useQuestionnaire() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Simulate fetching questions (could be an API call in a real app)
        const sampleQuestions = [
            {
                "title": "How often do you feel the need to engage in the activity?",
                "answer-type": "single",
                "answers": [
                    "Almost every hour",
                    "Several times a day",
                    "A few times a week",
                    "Rarely, but I still think about it often"
                ],
            },
            {
                "title": "Which symptoms do you experience after engaging in the activity?",
                "answer-type": "multiple",
                "answers": [
                    "Relief",
                    "Guilt",
                    "Satisfaction",
                    "Anxiety"
                ],
            }
        ];

        // You could add a setTimeout here to simulate a network delay if needed
        setQuestions(sampleQuestions);
    }, []);

    return { questions };
}