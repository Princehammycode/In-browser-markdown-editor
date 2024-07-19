import React, { useState, useEffect, createContext } from "react";
import defaultDocuments from "./data.json";
import { v4 as uuidv4 } from "uuid";

interface Document {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}

interface DocumentContextType {
  documents: Document[];
  activeDocument: Document | null;
  createDocument: () => void;
  deleteDocument: () => void;
  onDocumentContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDocumentNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveDocument: () => void;
  changeActiveDocument: (id: string) => void;
}

export const DocumentContext = createContext<DocumentContextType>({
  documents: defaultDocuments as Document[],
  activeDocument: null,
  createDocument: () => {},
  deleteDocument: () => {},
  onDocumentContentChange: () => {},
  onDocumentNameChange: () => {},
  saveDocument: () => {},
  changeActiveDocument: () => {}
});


const DocumentContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>(
    JSON.parse(localStorage.getItem("documents-browserMarkdownApp") || "[]") || defaultDocuments
  );
  const [activeDocument, setActiveDocument] = useState<Document | null>(
    JSON.parse(
      localStorage.getItem("activeDocument-browserMarkdownApp") || "{}"
    ) || defaultDocuments[0]
  );

  useEffect(() => {
    const storedDocuments = JSON.parse(
      localStorage.getItem("documents-browserMarkdownApp") || "[]"
    );
    if (storedDocuments.length) {
      setDocuments(storedDocuments);
    }
  }, []);

  useEffect(() => {
    const storedActiveDocument = JSON.parse(
      localStorage.getItem("activeDocument-browserMarkdownApp") || "{}"
    );
    if (Object.keys(storedActiveDocument).length) {
      setActiveDocument(storedActiveDocument);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("documents-browserMarkdownApp", JSON.stringify(documents));
    if (activeDocument) {
      localStorage.setItem("activeDocument-browserMarkdownApp", JSON.stringify(activeDocument));
    }
  }, [documents, activeDocument]);

  
  const createDocument = () => {
    const newID = uuidv4();
    const newDateObject = new Date();
    const newDateString =
      newDateObject.toLocaleString("default", {
        day: "numeric",
      }) +
      " " +
      newDateObject.toLocaleString("default", {
        month: "long",
      }) +
      " " +
      newDateObject.toLocaleString("default", {
        year: "numeric",
      });

    const newDocument: Document = {
      id: newID,
      name: "untitled-document.md",
      createdAt: newDateString,
      content: "# Create your new markdown here!",
    };

    setActiveDocument(newDocument);

    setDocuments((existingDocuments) => {
      return [...existingDocuments, newDocument];
    });
  };

  const onDocumentContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeDocument) {
      setActiveDocument({
        ...activeDocument,
        content: event.target.value,
      });
    }
  };

  const onDocumentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (activeDocument) {
      setActiveDocument({
        ...activeDocument,
        name: event.target.value,
      });
    }
  };

  const saveDocument = () => {
    setDocuments((existingDocuments) => {
      return existingDocuments.map((document) => {
        if (document.id === activeDocument?.id) {
          return { ...document, name: activeDocument.name, content: activeDocument.content };
        }
        return document;
      });
    });
  };


  const deleteDocument = () => {
    const existingDocuments = documents.filter((document) => {
      return document.id !== activeDocument?.id;
    });
    setDocuments(existingDocuments);
    setActiveDocument(existingDocuments.length ? existingDocuments[0] : null);
  };

  
  const changeActiveDocument = (id: string) => {
    const selectedDocument = documents.find((document) => document.id === id);
    setActiveDocument(selectedDocument || null);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activeDocument,
        createDocument,
        deleteDocument,
        onDocumentContentChange,
        onDocumentNameChange,
        saveDocument,
        changeActiveDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentContextWrapper;
