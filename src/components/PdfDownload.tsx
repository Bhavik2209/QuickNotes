import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const downloadExplanationAsPDF = (explanation) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set up fonts and styles
  doc.setFont('helvetica');
  
  // Title
  doc.setFontSize(18);
  doc.setTextColor(50, 50, 50);
  doc.text('QuickTube Explanation', 15, 20);

  // Separate the explanation into sections
  const sections = explanation.split(/\n\n/);

  let yPosition = 30;
  
  sections.forEach((section) => {
    // Check for headers (## or ###)
    const headerMatch = section.match(/^(#{2,3})\s*(.+)/);
    
    if (headerMatch) {
      const headerLevel = headerMatch[1];
      const headerText = headerMatch[2];
      
      // Set different font sizes for different header levels
      doc.setFontSize(headerLevel === '##' ? 16 : 14);
      doc.setTextColor(70, 70, 120);
      
      // Add header
      yPosition += 10;
      doc.text(headerText, 15, yPosition);
      yPosition += 10;
    } else {
      // Regular text
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Remove Markdown formatting
      const cleanedSection = section
        .replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
        .replace(/\*(.*?)\*/g, '$1')      // Italic
        .replace(/`(.*?)`/g, '$1');       // Code

      // Split text into lines that fit the page width
      const lines = doc.splitTextToSize(cleanedSection, 180);
      
      doc.text(lines, 15, yPosition);
      yPosition += lines.length * 7;  // Adjust line spacing
    }
    
    // Add some extra space between sections
    yPosition += 5;
    
    // Add new page if content is too long
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Save the PDF
  doc.save('video_explanation.pdf');
};