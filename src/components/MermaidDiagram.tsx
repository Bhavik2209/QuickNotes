import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }) => {
  useEffect(() => {
    // Reinitialize Mermaid for new diagrams
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <div className="mermaid">
      {chart || "Diagram loading..."}
    </div>
  );
};

export default MermaidDiagram;
