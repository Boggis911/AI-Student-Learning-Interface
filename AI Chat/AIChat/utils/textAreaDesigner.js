// textAreaDesigner.js
// Hierarchy: AIChat > utils > textAreaDesigner

export const designTextArea = (instructionRoutingStr) => {
  // Base style for all text areas
let textAreaStyleObj = {
    padding: '10px',
    borderRadius: '8px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    margin: '10px 0',
    resize: 'vertical',
    lineHeight: '1.5',      
    fontSize: '16px', // Corrected from font-size to fontSize
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    height: '100px', 
    width: '300px',  
};


  // Placeholder text for text area
  let placeholderText = "Enter your message...";

  // Customize styles and placeholders based on instruction routing
  switch (instructionRoutingStr) {
    case 'checkUserSolutionWithAI':
      textAreaStyleObj.height = '100px';  // Larger height for more extensive input
      textAreaStyleObj.width = '300px'
      placeholderText = "Check your whiteboard solution or ask for help...";
      break;
    case 'haveAGeneralChatWithAI':
      textAreaStyleObj.height = '100px';  // Larger height for more extensive input
      textAreaStyleObj.width = '800px';  // Wider area for longer messages
      placeholderText = "Enter your message...";
      break;
    // Add additional cases as needed
    case 'checkAISolution':
      textAreaStyleObj.height = '100px';  // Larger height for more extensive input
      textAreaStyleObj.width = '300px';  // Wider area for longer messages
      placeholderText = "Ask for additional explanation...";
      break;
      
      
    case 'generateMoreProblemsChef':
      textAreaStyleObj.height = '100px';  // Larger height for more extensive input
      textAreaStyleObj.width = '500px';
      placeholderText = "Message new question uploader...";
      break;
      
    default:
      break;
  }

  return { style: textAreaStyleObj, placeholder: placeholderText };
};
