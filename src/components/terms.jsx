import React, { useState } from "react";
import "../styles/terms.css"; // Import the CSS file

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
    setIsMobile(window.innerWidth <= 768); // Example breakpoint for mobile
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            By accessing or using our platform, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, you must
            discontinue use of our services immediately.
          </p>
          <p>
            Your continued use of the platform constitutes acceptance of any
            updates or modifications to these terms.
          </p>
        </>
      ),
    },
    {
      title: "2. Account Registration",
      content: (
        <>
          <p>
            To access certain features of our platform, you must create an
            account. By registering, you agree to:
          </p>
          <ul>
            <li>
              <strong>Accuracy:</strong> Provide truthful, accurate, and
              complete information during registration
            </li>
            <li>
              <strong>Security:</strong> Maintain the confidentiality and
              security of your login credentials
            </li>
            <li>
              <strong>Responsibility:</strong> Accept full responsibility for
              all activities that occur under your account
            </li>
            <li>
              <strong>Updates:</strong> Keep your account information current
              and up-to-date
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. User Responsibilities",
      content: (
        <>
          <p>
            As a user of our platform, you agree to comply with all applicable
            laws and regulations. You specifically agree not to:
          </p>
          <ul>
            <li>
              Use the service for any illegal, harmful, or unauthorized purposes
            </li>
            <li>
              Attempt to disrupt, damage, or impair service operations or
              infrastructure
            </li>
            <li>
              Upload, share, or distribute content that violates intellectual
              property rights
            </li>
            <li>
              Use automated tools, bots, or scripts to access our services
              without permission
            </li>
            <li>
              Engage in harassment, abuse, or any form of harmful behavior
              toward other users
            </li>
            <li>
              Attempt to gain unauthorized access to other user accounts or
              system resources
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Intellectual Property Rights",
      content: (
        <>
          <p>
            All content on our platform, including but not limited to
            visualizations, educational materials, software code, designs, and
            documentation, is protected by intellectual property laws.
          </p>
          <div className="ip-notice">
            <h4>Personal Use:</h4>
            <p>
              You may use our content for personal, non-commercial educational
              purposes.
            </p>
            <h4>Commercial Use:</h4>
            <p>
              Any commercial use, reproduction, or redistribution requires prior
              written consent from us.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "5. Service Availability & Termination",
      content: (
        <>
          <p>
            We strive to maintain continuous service availability, but we
            reserve the right to:
          </p>
          <ul>
            <li>
              Suspend or terminate your account for violations of these Terms
            </li>
            <li>Modify or discontinue services with reasonable notice</li>
            <li>
              Perform maintenance that may temporarily affect service
              availability
            </li>
          </ul>
          <p>
            You may terminate your account and stop using our services at any
            time. Upon termination, certain provisions of these Terms will
            survive, including intellectual property rights and limitation of
            liability clauses.
          </p>
        </>
      ),
    },
    {
      title: "6. Limitation of Liability",
      content: (
        <>
          <p>
            To the fullest extent permitted by law, we disclaim all warranties
            and are not liable for:
          </p>
          <div className="liability-grid">
            <div className="liability-item">
              <h4>Content Accuracy</h4>
              <p>
                Inaccuracies in algorithm representations or educational content
              </p>
            </div>
            <div className="liability-item">
              <h4>Service Interruptions</h4>
              <p>Temporary outages, maintenance, or technical difficulties</p>
            </div>
            <div className="liability-item">
              <h4>User Actions</h4>
              <p>
                Consequences arising from your use of our educational materials
              </p>
            </div>
            <div className="liability-item">
              <h4>Third-Party Content</h4>
              <p>
                External links or third-party integrations and their content
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "7. Privacy & Data Protection",
      content: (
        <>
          <p>
            Your privacy is important to us. Our data collection and usage
            practices are governed by our Privacy Policy, which is incorporated
            into these Terms by reference.
          </p>
          <p>
            By using our services, you consent to the collection, use, and
            processing of your data as described in our Privacy Policy.
          </p>
        </>
      ),
    },
    {
      title: "8. Updates & Modifications",
      content: (
        <>
          <p>
            We reserve the right to modify these Terms at any time. When we make
            material changes, we will:
          </p>
          <ul>
            <li>Notify users through our platform or via email</li>
            <li>Provide reasonable notice before changes take effect</li>
            <li>Update the "Last Updated" date at the top of this document</li>
          </ul>
          <p>
            Your continued use of our services after such modifications
            constitutes acceptance of the updated Terms.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="terms-container">
      <div className="terms-content">
        {/* Header */}
        <div className="terms-header">
          <div className="header-content">
            <div className="header-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div className="header-text">
              <h1>Terms of Service</h1>
              <p>Please read these terms carefully before using our platform</p>
            </div>
          </div>
          <div className="effective-date">
            <span className="date-label">Last Updated</span>
            <span className="date-value">August 13, 2025</span>
          </div>
        </div>

        {/* Sections */}
        <div className="terms-sections">
          {sections.map((section, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className="terms-section"
            >
              <div
                className="section-header"
                onClick={() => toggleSection(index)}
              >
                <h2>{section.title}</h2>
                <button
                  className={`expand-btn ${
                    activeSection === index ? "active" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
              <div
                className={`section-content ${
                  activeSection === index ? "active" : ""
                }`}
              >
                {activeSection === index && section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;