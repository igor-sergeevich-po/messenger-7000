import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './hoc/AuthContext';
import { ChatProvider } from './hoc/ChatContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
    <ChatProvider>
        <App />
    </ChatProvider>
</AuthContextProvider>

);