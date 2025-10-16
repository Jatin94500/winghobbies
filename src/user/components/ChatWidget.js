import React, { useState } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! How can I help you today?', sender: 'bot', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Track my order',
    'Return policy',
    'Product warranty',
    'Payment options'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        text: 'Thanks for your message! Our team will respond shortly. For immediate assistance, call +91 7985079854.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="btn btn-warning rounded-circle shadow-lg position-fixed"
          style={{ bottom: '20px', right: '20px', width: '60px', height: '60px', zIndex: 9998 }}
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-comments fs-4"></i>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="card border-0 shadow-lg position-fixed"
          style={{ bottom: '20px', right: '20px', width: '350px', height: '500px', zIndex: 9998 }}
        >
          {/* Header */}
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="bg-warning rounded-circle p-2 me-2">
                <i className="fas fa-headset text-dark"></i>
              </div>
              <div>
                <h6 className="mb-0">Customer Support</h6>
                <small className="text-success"><i className="fas fa-circle" style={{fontSize: '8px'}}></i> Online</small>
              </div>
            </div>
            <button className="btn btn-sm btn-link text-white" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="card-body overflow-auto" style={{height: '340px'}}>
            {messages.map(msg => (
              <div key={msg.id} className={`mb-3 ${msg.sender === 'user' ? 'text-end' : ''}`}>
                <div 
                  className={`d-inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-warning text-dark' : 'bg-light'}`}
                  style={{maxWidth: '80%'}}
                >
                  <p className="mb-1" style={{fontSize: '0.9rem'}}>{msg.text}</p>
                  <small className="text-muted" style={{fontSize: '0.7rem'}}>{msg.time}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2">
            <div className="d-flex flex-wrap gap-1">
              {quickReplies.map((reply, index) => (
                <button 
                  key={index}
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleQuickReply(reply)}
                  style={{fontSize: '0.75rem'}}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="card-footer bg-white border-top">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="btn btn-warning" onClick={handleSend}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
