import React, { useState } from 'react';
import { MathQuillField } from './MathQuillField/MathQuillField';
import './MathQuill.css';

export const MathQuill = ({ setMathquillLatexValuesArrStr }) => {
  // Naming reflects an array of objects
  const [fieldsArrObj, setFieldsArrObj] = useState([{ id: 1, latex: '' }, { id: 2, latex: '' }]);

  const addFieldFn = () => {
    // Use a high-resolution timestamp to ensure uniqueness
    const newIdNum = Date.now(); // Much less likely to create duplicates
    const newFieldObj = { id: newIdNum, latex: '' };
    setFieldsArrObj(prevFieldsArrObj => [...prevFieldsArrObj, newFieldObj]);
  };

  const removeFieldFn = (idNum) => {
    setFieldsArrObj(prevFieldsArrObj => prevFieldsArrObj.filter(fieldObj => fieldObj.id !== idNum));
  };

  const updateFieldFn = (idNum, newLatexStr) => {
    setFieldsArrObj(prevFieldsArrObj => {
      const updatedFieldsArrObj = prevFieldsArrObj.map(fieldObj => 
        fieldObj.id === idNum ? { ...fieldObj, latex: newLatexStr } : fieldObj
      );

      const newArrayStr = updatedFieldsArrObj.map(itemObj => `$$${itemObj.latex}$$`);
      setMathquillLatexValuesArrStr(newArrayStr); // Update the parent component's state

      return updatedFieldsArrObj; // Return updated fields for the state update
    });
  };

 return (
    <div>
      {fieldsArrObj.map((fieldObj) => (
        <div className="mathquill-wrapper" key={fieldObj.id}>
          <MathQuillField id={fieldObj.id} onUpdate={updateFieldFn} />
          <button className="remove-button" onClick={() => removeFieldFn(fieldObj.id)}>X</button>
        </div>
      ))}
      <button className="button add-button" onClick={addFieldFn}>+</button>
    </div>
  );
};
