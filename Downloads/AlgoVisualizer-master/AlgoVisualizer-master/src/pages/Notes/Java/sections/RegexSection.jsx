import React from "react";

const RegexSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-search"></i> 6. Regular Expressions</h2>
      <p>
        Regular expressions (regex) are used to match patterns in strings.
        <ul>
          <li>Use <code>Pattern</code> and <code>Matcher</code> classes in Java.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "regex_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// RegexExample.java
import java.util.regex.*;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Java123";
        Pattern pattern = Pattern.compile("[A-Za-z]+\\d+");
        Matcher matcher = pattern.matcher(text);

        if (matcher.matches())
            System.out.println("Pattern matched!");
        else
            System.out.println("No match found.");
    }
}`,
              "regex_code"
            )
          }
        >
          {copiedCode === "regex_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// RegexExample.java
import java.util.regex.*;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Java123";
        Pattern pattern = Pattern.compile("[A-Za-z]+\\d+");
        Matcher matcher = pattern.matcher(text);

        if (matcher.matches())
            System.out.println("Pattern matched!");
        else
            System.out.println("No match found.");
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Use <code>matcher.find()</code> to find occurrences in long texts.</p>
    </div>
  </section>
);

export default RegexSection;
