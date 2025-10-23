import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Enhanced Back to Top Component with Modern Design
 * Features:
 * - Modern, professional appearance with gradients and smooth animations
 * - Theme-aware styling (light/dark mode support)
 * - Responsive design for different screen sizes
 * - Accessibility features (ARIA labels, keyboard navigation, reduced motion support)
 * - Scroll progress indicator
 * - Multiple animation options
 * - Performance optimized with requestAnimationFrame
 */
export default function EnhancedScrollToTop({ 
  showProgressIndicator = false,
  animationStyle = 'gentle', // 'gentle', 'bounce', 'slide'
  threshold = 200 
}) {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();
  const ticking = useRef(false);

  const forceScrollTop = useCallback((smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";

    // Window scroll
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior });
    }

    // Document fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Inner container fallback
    const main = document.querySelector(".main-content");
    if (main) {
      if (typeof main.scrollTo === "function") {
        main.scrollTo({ top: 0, behavior });
      } else {
        main.scrollTop = 0;
      }
    }
  }, []);

  // Prevent browser auto-restore
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll listener with progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          setShowButton(scrollTop > threshold);
          
          if (showProgressIndicator) {
            const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
            setScrollProgress(progress);
          }
          
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, showProgressIndicator]);

  // Scroll to top on route change
  useEffect(() => {
    forceScrollTop(false);
    const timeout = setTimeout(() => forceScrollTop(true), 120);
    setShowButton(false);
    setScrollProgress(0);

    return () => clearTimeout(timeout);
  }, [pathname, forceScrollTop]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      forceScrollTop(true);
    }
  }, [forceScrollTop]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      {showProgressIndicator && (
        <div 
          className={`scroll-progress-indicator ${showButton ? 'visible' : ''}`}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
          aria-hidden="true"
        />
      )}

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={() => forceScrollTop(true)}
        onKeyDown={handleKeyDown}
        aria-label="Scroll to top of page"
        title="Back to top"
        className={`enhanced-floating-btn enhanced-scroll-to-top-btn ${animationStyle} ${showButton ? 'show' : ''}`}
        tabIndex={showButton ? 0 : -1}
      >
        <div className="button-icon">
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        </div>
        <div className="button-ripple" aria-hidden="true"></div>
        <span className="sr-only">Back to top</span>
      </button>

      <style>
        {`
          /* Enhanced Back to Top Button Styles */
          .enhanced-floating-btn {
            position: fixed;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1001;
            border: none;
            font-family: inherit;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            transform: translateY(100px) scale(0.8);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            isolation: isolate;
          }

          .enhanced-floating-btn.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          /* Button positioning to avoid overlap with FAQ chatbot */
          .enhanced-scroll-to-top-btn {
            bottom: 150px; /* reduced spacing to sit closer to feedback FAB */
            right: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 20px;
            box-shadow: 
              0 8px 32px rgba(102, 126, 234, 0.25),
              0 4px 16px rgba(118, 75, 162, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          /* Dark theme adaptation */
          [data-theme="dark"] .enhanced-scroll-to-top-btn {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            box-shadow: 
              0 8px 32px rgba(79, 70, 229, 0.3),
              0 4px 16px rgba(124, 58, 237, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          /* Button Icon Container */
          .button-icon {
            position: relative;
            z-index: 2;
            transition: transform 0.3s ease;
          }

          /* Ripple Effect */
          .button-ripple {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            opacity: 0;
            transition: all 0.6s ease;
          }

          /* Hover Effects */
          .enhanced-scroll-to-top-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 
              0 12px 40px rgba(102, 126, 234, 0.35),
              0 6px 20px rgba(118, 75, 162, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }

          [data-theme="dark"] .enhanced-scroll-to-top-btn:hover {
            box-shadow: 
              0 12px 40px rgba(79, 70, 229, 0.4),
              0 6px 20px rgba(124, 58, 237, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          .enhanced-scroll-to-top-btn:hover .button-icon {
            transform: translateY(-2px);
          }

          .enhanced-scroll-to-top-btn:hover .button-ripple {
            transform: scale(1);
            opacity: 1;
          }

          /* Active/Click Effect */
          .enhanced-scroll-to-top-btn:active {
            transform: translateY(-2px) scale(0.95);
            transition: all 0.1s ease;
          }

          .enhanced-scroll-to-top-btn:active .button-ripple {
            transform: scale(1.2);
            opacity: 0.7;
          }

          /* Focus styles for accessibility */
          .enhanced-scroll-to-top-btn:focus {
            outline: none;
            box-shadow: 
              0 8px 32px rgba(102, 126, 234, 0.25),
              0 4px 16px rgba(118, 75, 162, 0.15),
              0 0 0 3px rgba(102, 126, 234, 0.4);
          }

          [data-theme="dark"] .enhanced-scroll-to-top-btn:focus {
            box-shadow: 
              0 8px 32px rgba(79, 70, 229, 0.3),
              0 4px 16px rgba(124, 58, 237, 0.2),
              0 0 0 3px rgba(79, 70, 229, 0.4);
          }

          /* Animation Styles */
          .enhanced-floating-btn.gentle {
            animation: gentleFloat 3s ease-in-out infinite;
          }

          .enhanced-floating-btn.bounce {
            animation: bounceFloat 2s ease-in-out infinite;
          }

          .enhanced-floating-btn.slide {
            animation: slideFloat 2.5s ease-in-out infinite;
          }

          /* Animation Keyframes */
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1); }
          }

          @keyframes bounceFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-6px) scale(1.02); }
            50% { transform: translateY(-2px) scale(1); }
            75% { transform: translateY(-4px) scale(1.01); }
          }

          @keyframes slideFloat {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
            33% { transform: translateY(-2px) rotate(1deg) scale(1.01); }
            66% { transform: translateY(-4px) rotate(-1deg) scale(1.01); }
          }

          /* Scroll Progress Indicator */
          .scroll-progress-indicator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent 0%, #667eea 50%, #764ba2 100%);
            z-index: 1002;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0;
          }

          .scroll-progress-indicator.visible {
            opacity: 1;
          }

          [data-theme="dark"] .scroll-progress-indicator {
            background: linear-gradient(90deg, transparent 0%, #4f46e5 50%, #7c3aed 100%);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .enhanced-scroll-to-top-btn {
              width: 48px;
              height: 48px;
              font-size: 18px;
              bottom: 160px;
              right: 20px;
            }
          }

          @media (max-width: 480px) {
            .enhanced-scroll-to-top-btn {
              width: 44px;
              height: 44px;
              font-size: 16px;
              bottom: 120px;
              right: 16px;
            }

          /* Ensure enhanced arrow icon is white */
          .enhanced-scroll-to-top-btn i,
          .enhanced-scroll-to-top-btn .fa-solid {
            color: #ffffff !important;
          }

            .scroll-progress-indicator {
              height: 2px;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .enhanced-scroll-to-top-btn {
              background: #000000 !important;
              color: #ffffff !important;
              border: 2px solid #ffffff !important;
            }

            [data-theme="dark"] .enhanced-scroll-to-top-btn {
              background: #ffffff !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }

            .scroll-progress-indicator {
              background: #000000 !important;
            }

            [data-theme="dark"] .scroll-progress-indicator {
              background: #ffffff !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .enhanced-floating-btn {
              transition: opacity 0.2s ease, visibility 0.2s ease !important;
              animation: none !important;
            }

            .enhanced-scroll-to-top-btn:hover {
              transform: none !important;
            }

            .button-icon,
            .button-ripple {
              transition: none !important;
            }

            .scroll-progress-indicator {
              transition: opacity 0.2s ease !important;
            }
          }

          /* Screen reader only text */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          /* Print styles */
          @media print {
            .enhanced-floating-btn,
            .scroll-progress-indicator {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}