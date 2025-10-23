import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import '../styles/faq.css';

const FAQ = () => {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is AlgoVisualizer, and how does it help in learning algorithms?",
          answer: "AlgoVisualizer is an interactive web application designed to help users visualize and understand various sorting, searching, and graph algorithms in real-time. It provides step-by-step visual representations that make complex algorithmic concepts easier to understand, perfect for students, educators, and anyone interested in computer science fundamentals."
        },
        {
          question: "Is AlgoVisualizer free to use?",
          answer: "Yes! AlgoVisualizer is completely free and open source. You can use all features without any cost, and there are no advertisements or premium subscriptions required."
        },
        {
          question: "How do I run this project locally?",
          answer: "To run AlgoVisualizer locally: 1) Fork and clone the repository from GitHub (https://github.com/RhythmPahwa14/AlgoVisualizer), 2) Install dependencies with 'npm install', 3) Start the development server with 'npm run dev', 4) Open your browser to the provided local URL (usually http://localhost:3000)."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Can I run the visualizations step by step?",
          answer: "Yes! AlgoVisualizer provides step-by-step visualization controls. You can pause, play, and navigate through each step of the algorithm execution. This allows you to understand exactly what happens at each stage of the algorithm's operation."
        },
        {
          question: "Is there a way to adjust the speed of algorithm visualization?",
          answer: "Absolutely! Each visualizer includes speed controls that let you adjust the animation speed from very slow (for detailed study) to fast (for quick overviews). You can customize the speed to match your learning pace and preferences."
        },
        {
          question: "What are the main features of AlgoVisualizer?",
          answer: "Key features include: • Real-time algorithm visualization • Interactive step-by-step controls • Speed adjustment options • Performance statistics (comparisons, swaps, execution time) • Export capabilities (GIFs, videos, snapshots) • Responsive design for all devices • Educational tools perfect for classrooms and tutorials"
        },
        {
          question: "Can I export or record visualizations?",
          answer: "Yes! You can export visualizations as GIFs, record them as videos, or take snapshots. This is perfect for presentations, sharing with others, or including in educational materials."
        }
      ]
    },
    {
      category: "Algorithms & Coverage",
      questions: [
        {
          question: "Does AlgoVisualizer cover all sorting, searching, and graph algorithms?",
          answer: "AlgoVisualizer covers many fundamental algorithms including: Sorting: Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, Heap Sort, and more. Searching: Linear Search, Binary Search, Jump Search, Exponential Search. Graph Algorithms: BFS, DFS, Dijkstra's Algorithm. We're continuously adding new algorithms based on user feedback and contributions."
        },
        {
          question: "Which algorithms are currently supported?",
          answer: "Currently supported algorithms include:\n\n**Sorting Algorithms:**\n• Bubble Sort, Insertion Sort, Selection Sort\n• Merge Sort, Quick Sort, Heap Sort\n• Radix Sort, Tim Sort, Shell Sort\n\n**Searching Algorithms:**\n• Linear Search, Binary Search\n• Jump Search, Exponential Search, Ternary Search\n\n**Graph Algorithms:**\n• Breadth-First Search (BFS), Depth-First Search (DFS)\n• Dijkstra's Shortest Path Algorithm\n\n**Data Structures:**\n• Linked Lists, Binary Trees, Binary Search Trees\n• Stacks, Queues"
        },
        {
          question: "What are sorting algorithms?",
          answer: "Sorting algorithms are methods for rearranging a collection of items (like numbers or names) into a specific order, such as ascending or descending. They are fundamental to computer science and are used in many applications. AlgoVisualizer helps you understand how different sorting methods work through visual demonstrations."
        },
        {
          question: "What are searching algorithms?",
          answer: "Searching algorithms are designed to find and retrieve a specific element from a data structure. The efficiency of a search algorithm depends heavily on whether the data is sorted. AlgoVisualizer demonstrates various searching techniques and their performance characteristics."
        }
      ]
    },
    {
      category: "Community & Contribution",
      questions: [
        {
          question: "Can I contribute new algorithms or improvements?",
          answer: "Yes! Contributions are highly encouraged. To contribute: 1) Fork the repository on GitHub, 2) Create a new branch for your feature/improvement, 3) Implement your changes following our coding standards, 4) Submit a pull request with a clear description, 5) Participate in the code review process. You can also report bugs or suggest features through GitHub issues."
        },
        {
          question: "How do I participate in the leaderboard/community?",
          answer: "You can participate in our community by: • Contributing code, documentation, or bug reports • Participating in discussions on GitHub • Sharing your visualizations and insights • Helping other users with questions • Joining our contributor leaderboard by making meaningful contributions to the project"
        },
        {
          question: "How can I get help or support?",
          answer: "If you need help: • Use our FAQ chatbot for quick answers • Check the Documentation section for detailed guides • Visit our GitHub repository for technical issues • Contact us through the Contact page • Browse through existing GitHub issues for common problems and solutions"
        }
      ]
    },
    {
      category: "Technical & Learning",
      questions: [
        {
          question: "What are graphs in data structures?",
          answer: "A graph is a non-linear data structure consisting of nodes (or vertices) and edges that connect pairs of nodes. They are used to model relationships between objects, such as social networks, computer networks, or road maps. AlgoVisualizer provides interactive graph algorithm demonstrations to help you understand these concepts."
        },
        {
          question: "Can you recommend resources to study algorithms?",
          answer: "Great learning resources include:\n\n**Online Platforms:**\n• GeeksforGeeks and Programiz for tutorials\n• LeetCode and HackerRank for practice problems\n• Coursera and edX for structured courses\n\n**Books:**\n• 'Introduction to Algorithms' by Cormen, Leiserson, Rivest, and Stein\n• 'Algorithms' by Robert Sedgewick and Kevin Wayne\n\n**Practice:**\n• Use AlgoVisualizer to understand algorithm behavior\n• Solve coding problems on competitive programming platforms\n• Build your own implementations"
        },
        {
          question: "Is this suitable for beginners?",
          answer: "Absolutely! AlgoVisualizer is designed to be beginner-friendly while also being valuable for advanced users. The visual representations make complex concepts easier to understand, and the step-by-step controls let you learn at your own pace."
        }
      ]
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">
        <div className="faq-title-section">
          <HelpCircle className="faq-icon" size={48} />
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find answers to common questions about AlgoVisualizer, its features, and how to get started.
          </p>
        </div>
      </div>

      <div className="faq-content">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2 className="faq-category-title">{category.category}</h2>
            <div className="faq-questions">
              {category.questions.map((faq, questionIndex) => {
                const accordionKey = `${categoryIndex}-${questionIndex}`;
                const isOpen = openAccordions[accordionKey];
                
                return (
                  <div key={questionIndex} className="faq-item">
                    <button 
                      className={`faq-question ${isOpen ? 'active' : ''}`}
                      onClick={() => toggleAccordion(accordionKey)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <div className="faq-chevron">
                        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </button>
                    
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <div className="faq-answer-content">
                        {faq.answer.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="faq-footer-content">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Try our FAQ chatbot for instant answers, check out our documentation, or contact us directly.</p>
          <div className="faq-footer-actions">
            <a href="/documentation" className="faq-footer-link">
              View Documentation
            </a>
            <a href="/contact" className="faq-footer-link">
              Contact Us
            </a>
            <a href="https://github.com/RhythmPahwa14/AlgoVisualizer" target="_blank" rel="noopener noreferrer" className="faq-footer-link">
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
