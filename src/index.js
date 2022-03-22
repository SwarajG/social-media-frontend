import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { client } from './api/client';
import Dashboard from './pages/Dashboard';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
