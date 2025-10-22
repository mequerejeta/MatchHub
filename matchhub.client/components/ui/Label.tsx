"use client";

import React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label {...props} className={`block text-sm font-medium text-gray-700 ${className ?? ""}`}>
      <span className="inline-flex items-center gap-1">
        {children}
        {required ? <span className="text-red-600" aria-hidden> *</span> : null}
      </span>
    </label>
  );
};

export default Label;