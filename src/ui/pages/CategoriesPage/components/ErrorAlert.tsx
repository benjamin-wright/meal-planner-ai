import React from 'react';
import './ErrorAlert.css';

export interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="error-alert" role="alert">
      {message}
    </div>
  );
};
