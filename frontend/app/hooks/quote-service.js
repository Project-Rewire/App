import { useEffect, useState } from "react";

export default function useQuotes() {
    const [quote, setQuote] = useState(null);

    const fetchQuote = async () => {
        try {
            const response = await fetch("https://zenquotes.io/api/random");
            const data = await response.json();
            if (response.ok) {
                setQuote({
                    "quote": data[0].q,
                    "author": data[0].a
                });
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return { quote };
}