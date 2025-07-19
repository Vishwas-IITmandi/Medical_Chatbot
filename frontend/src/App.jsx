import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- SVG Icons ---
const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
    <path d="M4 14a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4z"/>
    <path d="M8 10V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3"/>
    <path d="m18 10-1.29 2.59a1 1 0 0 1-1.42.36l-1.42-.71a1 1 0 0 0-1.42.36L11 15"/>
    <circle cx="20" cy="16" r="2"/>
  </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Add a welcome message on component mount
  useEffect(() => {
    setMessages([
      { text: "Hello! I'm MediBot. How can I help you today? You can ask about medical conditions or describe symptoms.", sender: 'bot' }
    ]);
  }, []);

  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { text: data.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Failed to fetch response:", error);
      const errorMessage = { text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <StethoscopeIcon />
        <h1>MediBot</h1>
      </header>
      <main className="chat-main">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper bot">
            <div className="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>
      <footer className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about a disease or symptoms..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          <SendIcon />
        </button>
      </footer>
    </div>
  );
}

export default App;
