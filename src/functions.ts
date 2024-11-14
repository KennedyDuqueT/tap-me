
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generateQuestion = async (
    setGptResponse: (value: React.SetStateAction<string | null>) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    setImageUrl: (value: React.SetStateAction<string | null>) => void,
    setQuestion: (value: React.SetStateAction<string>) => void
) => {
    setLoading(true);
    setGptResponse(null);
    setImageUrl(null);
    try {

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: apiKey ? `Bearer ${apiKey}` : "",
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Eres un generador de preguntas creativas para juegos.",
                        },
                        {
                            role: "user",
                            content:
                                "Genera una pregunta divertida para un juego, sobre dibujar con retos creativos, solo debes decirme la pregunta.",
                        },
                    ],
                    max_tokens: 500,
                }),
            }
        );

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const textGenrate = data.choices[0].message.content.trim();
            setQuestion(textGenrate);
        } else {
            setQuestion("No se pudo generar una pregunta. Intenta de nuevo.");
            console.error("Respuesta inesperada de la API:", data);
        }
    } catch (error) {
        console.error("Error al generar la pregunta:", error);
        setQuestion("Hubo un problema al generar la pregunta. Intenta de nuevo.");
    } finally {
        setLoading(false);
    }
};


export const generateGptResponse = async (
    question: string | null,
    setGptResponse: (value: React.SetStateAction<string | null>) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    setImageUrl: (value: React.SetStateAction<string | null>) => void
) => {
    if (!question) {
        setGptResponse("Primero genera una pregunta.");
        return;
    }
    setLoading(true);
    try {
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: apiKey ? `Bearer ${apiKey}` : "",
                },
                body: JSON.stringify({
                    prompt: question,
                    n: 1,
                    size: "512x512",
                }),
            }
        );

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const imageUrlGenerated = data.data[0].url;
            setImageUrl(imageUrlGenerated);
        } else {
            setGptResponse("No se pudo generar una respuesta de GPT.");
            console.error("Respuesta inesperada de la API:", data);
        }
    } catch (error) {
        console.error("Error al generar la respuesta:", error);
        setGptResponse("Hubo un problema al generar la respuesta.");
    } finally {
        setLoading(false);
    }
};