import React, { useState, useEffect, useRef } from 'react';

// Simple debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}



export const MathQuillField = ({ id, onUpdate }) => {
  //onUpdate is a callback function
  const mathFieldRef = useRef(null);

  useEffect(() => {
    if (window.MathQuill && mathFieldRef.current) {
      const MQ = window.MathQuill.getInterface(2);
      const mathField = MQ.MathField(mathFieldRef.current, {
        spaceBehavesLikeTab: true,
        handlers: {
          edit: debounce((mathField) => {
            onUpdate(id, mathField.latex()); // This updates the fields variable with id and Latex value
          }, 50), // Adjust debounce time as needed
        },
      });
    }
  }, [id, onUpdate]);

  return <div ref={mathFieldRef} style={{ border: '1px solid #ccc', padding: '5px', minHeight: '70px', minWidth: '25vw' }}></div>;
};
