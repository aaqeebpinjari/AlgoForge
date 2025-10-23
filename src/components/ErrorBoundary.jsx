import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Avoid noisy console in production; keep visibility in dev
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Visualizer crashed:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: 16 }}>
          <h3>Something went wrong while rendering the visualization.</h3>
          <p>Please try changing inputs or reload the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}


