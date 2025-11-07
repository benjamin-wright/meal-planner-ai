import React from 'react';
import './FormField.css';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  hint,
  children,
}) => {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-indicator"> *</span>}
      </label>
      {children}
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  );
};
