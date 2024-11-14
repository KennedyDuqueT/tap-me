import React, { useState } from "react";
import { generateGptResponse, generateQuestion } from "./functions";

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <button
        onClick={() =>
          generateQuestion(setGptResponse, setLoading, setImageUrl, setQuestion)
        }
        disabled={loading}
        className={`px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {loading ? "Generando..." : "¡Genera una pregunta!"}
      </button>

      {question && (
        <p className="mt-6 text-xl font-medium text-gray-800 bg-white p-4 rounded-lg shadow-md">
          {question}
        </p>
      )}

      {question && (
        <button
          onClick={() =>
            generateGptResponse(
              question,
              setGptResponse,
              setLoading,
              setImageUrl
            )
          }
          disabled={loading}
          className={`mt-4 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Generando..." : "¿Qué haría GPT?"}
        </button>
      )}

      {imageUrl && (
        <div className="mt-6">
          <img
            src={imageUrl}
            alt="Generada por GPT"
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      {gptResponse && !imageUrl && (
        <div className="mt-6 text-xl font-medium text-gray-800 bg-white p-4 rounded-lg shadow-md">
          <p>{gptResponse}</p>
        </div>
      )}
    </div>
  );
};

export default App;
