import { useState } from "react";
import axios from "axios";

function App() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {

    // Input validation
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setError("");
    setReply("");
    setLoading(true);

    try {

      // Send request to FastAPI backend
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: message
        }
      );

      // Handle backend errors
      if (response.data.error) {

        if (typeof response.data.error === "object") {
          setError(JSON.stringify(response.data.error));
        } else {
          setError(response.data.error);
        }

      } else {

        setReply(response.data.reply);

      }

    } catch (err) {

      setError("Server error");

    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          AI Chatbot
        </h1>

        {/* Textarea */}
        <textarea
          rows="5"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        {/* Button */}
        <button
          type="button"
          onClick={sendMessage}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Send
        </button>

        {/* Loading */}
        {loading && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center"
            }}
          >
            Loading...
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              textAlign: "center"
            }}
          >
            {error}
          </p>
        )}

        {/* AI Reply */}
        {reply && (
          <div
            style={{
              marginTop: "20px",
              background: "#f9fafb",
              padding: "15px",
              borderRadius: "8px"
            }}
          >

            <h3>AI Reply:</h3>

            <p
              style={{
                lineHeight: "1.6"
              }}
            >
              {reply}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;