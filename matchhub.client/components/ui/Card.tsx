"use client";

import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  as?: "div" | "article" | "section";
};

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  className,
  as = "div",
  ...props
}) => {
  const Component: any = as;
  return (
    <Component
      className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-md p-4 ${className ?? ""}`}
      {...props}
    >
      {header ? <div className="mb-2">{header}</div> : null}
      <div>{children}</div>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </Component>
  );
};

export default Card;