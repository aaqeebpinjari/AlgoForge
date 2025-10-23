import React from "react";

const JDBCSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-database"></i> 7. JDBC (Java Database Connectivity)</h2>
      <p>
        JDBC allows Java to connect and execute queries in a database.
        <ul>
          <li>Use <code>Connection</code>, <code>Statement</code>, and <code>ResultSet</code> classes.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "jdbc_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// JDBCExample.java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "password");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
              "jdbc_code"
            )
          }
        >
          {copiedCode === "jdbc_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// JDBCExample.java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "password");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Always close <code>Connection</code> and <code>ResultSet</code> to avoid memory leaks.</p>
    </div>
  </section>
);

export default JDBCSection;
