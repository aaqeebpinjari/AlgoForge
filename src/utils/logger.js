// Lightweight scoped logger that can be toggled at runtime
// Use localStorage.debug = '1' in the browser to enable verbose logs

const isBrowser = typeof window !== "undefined";

const isDebugEnabled = () => {
  if (isBrowser) {
    try {
      return localStorage.getItem("debug") === "1";
    } catch {
      return false;
    }
  }
  return process.env.NODE_ENV !== "production";
};

const makeLogger = (namespace) => {
  const prefix = `[${namespace}]`;
  return {
    info: (...args) => {
      if (isDebugEnabled()) console.log(prefix, ...args);
    },
    warn: (...args) => console.warn(prefix, ...args),
    error: (...args) => console.error(prefix, ...args),
  };
};

export default makeLogger;


