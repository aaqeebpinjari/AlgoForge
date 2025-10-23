import React from "react";
import { FaCopy } from "react-icons/fa";

const DOMManipulationSection = ({ copyCode, copiedCode }) => {
  const codeExamples = {
    selecting: `// Select an element by its ID
const title = document.getElementById('main-title');

// Select the first element matching a CSS selector
const firstButton = document.querySelector('.btn');

// Select all elements matching a CSS selector
const allButtons = document.querySelectorAll('.btn');

// Select elements by tag name
const allParagraphs = document.getElementsByTagName('p');`,
    modifying: `const title = document.getElementById('main-title');

// Change the text content
title.textContent = 'Welcome to the DOM!';

// Change the inner HTML
const container = document.querySelector('.container');
container.innerHTML = '<h2>New Section</h2><p>This was added by JavaScript.</p>';

// Modify an attribute
const link = document.querySelector('a');
link.setAttribute('href', 'https://www.example.com');

// Add or remove CSS classes
title.classList.add('highlight');
title.classList.remove('old-class');`,
    creating: `// Create a new <li> element
const newItem = document.createElement('li');
newItem.textContent = 'New Item';

// Get the parent <ul> element
const list = document.querySelector('ul');

// Append the new item to the list
list.appendChild(newItem);

// Remove an element
const itemToRemove = list.children[0];
list.removeChild(itemToRemove);`,
    events: `const button = document.getElementById('myButton');

// Add an event listener for clicks
button.addEventListener('click', () => {
  alert('Button was clicked!');
});

// You can also define a function separately
function handleMouseOver() {
  console.log('Mouse is over the button!');
}
button.addEventListener('mouseover', handleMouseOver);`,
  };

  return (
    <div className="card">
      <h2>
        <i className="fas fa-mouse-pointer" style={{ marginRight: "0.5rem" }}></i>
        DOM Manipulation
      </h2>
      <p>
        The Document Object Model (DOM) is a programming interface for web
        documents. It represents the page so that programs can change the
        document structure, style, and content.
      </p>

      <h3>Selecting Elements</h3>
      <p>To manipulate an element, you first need to select it.</p>
      <div className="code-container">
        <pre><code>{codeExamples.selecting}</code></pre>
        <button className={`copy-btn ${copiedCode === "selecting" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.selecting, "selecting")}>
          <FaCopy />
        </button>
      </div>

      <h3>Modifying Elements</h3>
      <p>Once selected, you can change an element's content, attributes, and styles.</p>
      <div className="code-container">
        <pre><code>{codeExamples.modifying}</code></pre>
        <button className={`copy-btn ${copiedCode === "modifying" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.modifying, "modifying")}>
          <FaCopy />
        </button>
      </div>

      <h3>Creating and Deleting Elements</h3>
      <p>You can dynamically add new elements to the page or remove existing ones.</p>
      <div className="code-container">
        <pre><code>{codeExamples.creating}</code></pre>
        <button className={`copy-btn ${copiedCode === "creating" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.creating, "creating")}>
          <FaCopy />
        </button>
      </div>

      <h3>Handling Events</h3>
      <p>
        Events are actions that happen in the browser, such as a user clicking a
        button or resizing a window. You can "listen" for these events and run
        code in response.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.events}</code></pre>
        <button className={`copy-btn ${copiedCode === "events" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.events, "events")}>
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default DOMManipulationSection;