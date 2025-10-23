import React from "react";
import { FaCopy } from "react-icons/fa";

const AsyncProgrammingSection = ({ copyCode, copiedCode }) => {
  const codeExamples = {
    callbacks: `function fetchData(callback) {
  // Simulate a network request
  setTimeout(() => {
    const data = { user: 'John Doe' };
    callback(data); // Execute the callback with the data
  }, 2000);
}

fetchData((data) => {
  console.log('Data received:', data);
});

console.log('Request sent...');`,
    promises: `const fetchData = new Promise((resolve, reject) => {
  // Simulate a network request
  setTimeout(() => {
    const success = true;
    if (success) {
      const data = { user: 'Jane Doe' };
      resolve(data); // Fulfill the promise
    } else {
      reject('Failed to fetch data!'); // Reject the promise
    }
  }, 2000);
});

fetchData
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
    asyncAwait: `function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ user: 'Alex Ray' });
    }, 2000);
  });
}

async function displayUser() {
  try {
    console.log('Fetching user...');
    const data = await fetchData(); // Pauses execution until the promise settles
    console.log('User found:', data.user);
  } catch (error) {
    console.error('Could not fetch user:', error);
  }
}

displayUser();`,
  };

  return (
    <div className="card">
      <h2>
        <i className="fas fa-hourglass-half" style={{ marginRight: "0.5rem" }}></i>
        Asynchronous Programming
      </h2>
      <p>
        Asynchronous programming allows your program to start a long-running
        task (like a network request) and continue to run other tasks in the
        meantime, rather than blocking until the first task has finished.
      </p>

      <h3>Callbacks</h3>
      <p>
        A callback is a function passed as an argument to another function,
        which is then invoked inside the outer function to complete some kind of
        routine or action.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.callbacks}</code></pre>
        <button className={`copy-btn ${copiedCode === "callbacks" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.callbacks, "callbacks")}>
          <FaCopy />
        </button>
      </div>

      <h3>Promises</h3>
      <p>
        A Promise is an object representing the eventual completion (or failure)
        of an asynchronous operation. It allows you to associate handlers with
        an asynchronous action's eventual success value or failure reason.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.promises}</code></pre>
        <button className={`copy-btn ${copiedCode === "promises" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.promises, "promises")}>
          <FaCopy />
        </button>
      </div>

      <h3>Async/Await</h3>
      <p>
        <code>async/await</code> is modern syntax built on top of Promises that
        makes asynchronous code look and behave more like synchronous code,
        making it easier to read and write.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.asyncAwait}</code></pre>
        <button className={`copy-btn ${copiedCode === "asyncAwait" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.asyncAwait, "asyncAwait")}>
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default AsyncProgrammingSection;