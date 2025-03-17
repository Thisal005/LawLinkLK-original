// configs/pdfConfig.js
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

let pdfContent = "";

// Load PDF at startup
const loadPDF = async () => {
  const pdfPath = path.join(__dirname, "../LegalServicesGuide.pdf"); // Adjust path as needed
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    pdfContent = data.text.slice(0, 30000); // Limit to ~30k chars for Gemini token limit
    console.log("PDF loaded successfully. Length:", pdfContent.length);
  } catch (error) {
    console.error("Error loading PDF:", error);
    pdfContent = "Default content: This is a legal case management platform.";
  }
};

// Load immediately
loadPDF();

// Export function to get PDF content
const getPDFContent = async () => {
  if (!pdfContent) {
    await loadPDF(); // Reload if somehow cleared
  }
  return pdfContent;
};

export { getPDFContent };