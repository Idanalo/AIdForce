
import { useState, useEffect } from "react"
import { Trash2, Send, MessageCircle } from "lucide-react"
import { startSession, sendMessage, finishSession } from "../../api.js"
import "./chat-bot.styles.scss"

// Custom Button Component
const CustomButton = ({ children, onClick, className = "", disabled = false, ...props }) => {
  return (
    <button onClick={onClick} className={`custom-button ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

// Custom Input Component
const CustomInput = ({ type, placeholder, value, onChange, onKeyPress, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className={`custom-input ${className}`}
      {...props}
    />
  )
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
)

function ChatBot({ chats, setChats, currentChatIndex, setCurrentChatIndex }) {
  const [input, setInput] = useState("")
  const [email, setEmail] = useState("")
  const [session, setSession] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!session) {
      setEmail("amitai.malka@gmail.com")
      const initSession = async () => {
        setLoading(true)
        try {
          // Replace with your actual API call
          const newSession = await startSession("amitai.malka@gmail.com")
          console.log(newSession.session)
          setSession(newSession.session)

        } catch (error) {
          console.error("Failed to start session:", error)
        } finally {
          setLoading(false)
        }
      }
      initSession()
    }
  }, [session])

  const send_message = async () => {
    if (!session || !input.trim()) return

    const userMessage = { text: input.trim(), sender: "user" }
    const updatedChats = [...chats]
    updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], userMessage]
    setChats(updatedChats)
    setInput("")

    try {
      // Replace with your actual API call
      const res = await sendMessage(email, input.trim())

      // Mock bot response for demo
      setTimeout(() => {
        const botReply = {
          text: res.message,
          sender: "bot",
        }
        updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], botReply]
        setChats([...updatedChats])
      }, 1000)
    } catch (error) {
      const errorReply = { text: "אירעה שגיאה בשרת, אנא נסה שוב.", sender: "bot" }
      updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], errorReply]
      setChats([...updatedChats])
    }
  }

  const startNewChat = async () => {
    if (!email) return
    setLoading(true)

    try {
      // Replace with your actual API calls
      await finishSession(email)
      const newSession = await startSession(email)
      setSession(newSession.session || newSession)

      const newChat = [{ text: "שלום! איך אפשר לעזור?", sender: "bot" }]
      setChats([newChat])
      setCurrentChatIndex(0)
    } catch (err) {
      console.error("Failed to start new session:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      send_message()
    }
  }

  // const [input, setInput] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [session, setSession] = useState("");
  //   const [loading, setLoading] = useState(false);
  
  //   useEffect(() => {
  //     if (!session) {
  //       setEmail("amitai.malka@gmail.com");
  //       const initSession = async () => {
  //         setLoading(true);
  //         const newSession = await startSession("amitai.malka@gmail.com");
  //         console.log(`session: ${newSession.session}`);
  //         setSession(newSession.session);
  //         setLoading(false);
  //       };
  //       initSession();
  //     }
  //   }, []);
  
  //   const send_message = async () => {
  //     if (!session || !input.trim()) return;
  //     const userMessage = { text: input.trim(), sender: "user" };
  //     const updatedChats = [...chats];
  //     updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], userMessage];
  //     setChats(updatedChats);
  //     setInput("");
  
  //     try {
  //       const res = await sendMessage(email, input.trim());
  //       const botReply = { text: res.message || "חלה שגיאה בקבלת תגובה", sender: "bot" };
  //       updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], botReply];
  //       setChats([...updatedChats]);
  //     } catch {
  //       const errorReply = { text: "אירעה שגיאה בשרת, אנא נסה שוב.", sender: "bot" };
  //       updatedChats[currentChatIndex] = [...updatedChats[currentChatIndex], errorReply];
  //       setChats([...updatedChats]);
  //     }
  //   };
  
  //   const startNewChat = async () => {
  //     if (!email) return;
  //     setLoading(true);
  //     try {
  //       await finishSession(email);
  //     } catch {}
  //     try {
  //       const newSession = await startSession(email);
  //       setSession(newSession.session || newSession);
  //       const newChat = [{ text: "שלום! איך אפשר לעזור?", sender: "bot" }];
  //       setChats([newChat]);
  //       setCurrentChatIndex(0);
  //     } catch (err) {
  //       console.error("Failed to start new session:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') send_message();
  //   };

  const messages = chats[currentChatIndex] || []

  if (loading || !session) {
    return (
      <div className="chatbot-loading">
        <LoadingSpinner />
        <p className="loading-text">טוען שיחה חדשה...</p>
      </div>
    )
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-wrapper">
        <div className="chatbot-card">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chat-icon-container">
              <div className="chat-icon">
                <MessageCircle className="chat-icon-svg" strokeWidth={2} />
              </div>
            </div>
            <div className="chat-title">
              <h2 className="title-text">צ'אט עם הבוט</h2>
              <span className="subtitle-text">שאל כל שאלה שתרצה</span>
            </div>
            <CustomButton className="new-chat-button" onClick={startNewChat} title="התחל שיחה חדשה">
              <Trash2 className="new-chat-icon" />
            </CustomButton>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <div className="input-wrapper">
              <CustomInput
                type="text"
                placeholder="כתוב הודעה..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <CustomButton
                onClick={send_message}
                disabled={!input.trim() || !session}
                className="send-button"
                title="שלח הודעה"
              >
                <Send className="send-icon" />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
