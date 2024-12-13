import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ErrorBoundary = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrorEvent = (event) => {
      console.error("Caught error:", event.error || "Unknown error");
      setHasError(true);
    };

    window.addEventListener("error", handleErrorEvent);
    window.addEventListener("unhandledrejection", handleErrorEvent);

    return () => {
      window.removeEventListener("error", handleErrorEvent);
      window.removeEventListener("unhandledrejection", handleErrorEvent);
    };
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
};

ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
