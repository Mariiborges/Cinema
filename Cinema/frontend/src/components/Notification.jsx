// src/components/Notification.js
import React from 'react';
import '../App.css';

const Notification = ({ type, message }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
