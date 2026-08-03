import React from "react";

const ErrorPage = ({ statusCode, message }) => {
  return (
    <div>
      <h1>{statusCode} - {message}</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
