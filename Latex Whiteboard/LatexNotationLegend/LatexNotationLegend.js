import React, { useState } from 'react';
import styles from './LatexNotationLegend.module.css'; // Ensure the path is correct
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export const LatexNotationLegend = () => {
  const [isHelpVisible, setHelpVisibility] = useState(false);

  const latexExamples = [
    {
      expression: "$E=mc^2$",
      code: "E=mc^2"
    },
    {
      expression: "$\\frac{a}{b}$",
      code: "\\frac{a}{b}"
    },
    {
      expression: "$\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$",
      code: "\\sum_{n=1}^{\\infty} \\frac{1}{n^2}"
    },
    {
      expression: "$\\int_{0}^{1} x^2 \\, dx$",
      code: "\\int_{0}^{1} x^2 \\, dx"
    },
    {
      expression: "$x^{n+1}$",
      code: "x^{n+1}"
    },
    {
      expression: "$\\frac{d}{dx} x^2$",
      code: "\\frac{d}{dx} x^2"
    },
    {
      expression: "$\\begin{matrix} a & b \\\\ c & d \\end{matrix}$",
      code: "\\begin{matrix} a & b \\\\ c & d \\end{matrix}"
    },
    {
      expression: "$\\lim_{x \\to \\infty} \\frac{1}{x}$",
      code: "\\lim_{x \\to \\infty} \\frac{1}{x}"
    }
  ];

  return (
    <div className={styles.latexNotationLegend}>
      <button
        className={`${styles.latexNotationLegendHelpButton} ${isHelpVisible ? styles.hidden : ''}`}
        onClick={() => setHelpVisibility(!isHelpVisible)}
      >
        ?
      </button>
      {isHelpVisible && (
        <div className={styles.latexNotationLegendModalBackground}>
          <div className={styles.latexNotationLegendModalContent}>
            <h2>User Tips</h2>
            <div className={styles.tipContainer}>
              <h3>Whiteboard Interaction:</h3>
              <p>Write your solutions directly on the whiteboard. The Assistant observes and interprets your inputs to enhance communication.</p>
              <h3>Managing LaTeX Boxes:</h3>
              <p>Add or remove LaTeX boxes as needed to tailor your workspace to your specific requirements.</p>
              <h3>Navigation:</h3>
              <p>Use the TAB key to quickly move between different LaTeX boxes, facilitating efficient data entry.</p>
            </div>

            <h2>LaTeX Syntax Help</h2>
            <div className={styles.exampleContainer}>
              {latexExamples.map((item, index) => (
                <>
                  <div key={index} className={styles.example}>
                    <div className={styles.sectionHeading}>Expression:</div>
                    <Latex className={styles.renderedLatex}>{item.expression}</Latex>
                    <div className={styles.sectionHeading}>LaTeX Code:</div>
                    <code className={styles.codeSnippet}>{item.code}</code>
                  </div>
                  {index < latexExamples.length - 1 && <div className={styles.spacer}></div>}
                </>
              ))}
            </div>
            
            <button
              onClick={() => setHelpVisibility(false)}
              className={styles.latexNotationLegendCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
