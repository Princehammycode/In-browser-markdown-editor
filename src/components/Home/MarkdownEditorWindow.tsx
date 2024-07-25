import React, { forwardRef, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../themes/themeContext";
import { DocumentContext } from "../../documents/documentContext";
import PreviewButton from "./PreviewButton";

interface MarkdownEditorWindowProps {
  showPreview: boolean;
  handlePreview: () => void;
}

//Markdown Text Editor Container
const StyledEditorContainer = styled.div<{ showPreview: boolean }>`
  display: ${({ showPreview }) => (showPreview ? "none" : "flex")};
  flex-flow: column nowrap;
  height: 100%;
  width: 50%;
  outline: none;
  border: none;

  @media screen and (max-width: 768px) {
    width: ${({ showPreview }) => (showPreview ? "0%" : "100%")};
  }
`;

//Markdown Editor Title
const TitleContainer = styled.div`
  height: 42px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 2px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.sectionheader};
  background-color: ${({ theme }) => theme.background.sectionheader};
`;

const ShowPreviewButton = styled(PreviewButton)`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

//Markdown Text Editor Content
const Editor = styled.textarea`
  height: calc(100% - 120px);
  padding-left: 16px;
  outline: none;
  border: none;
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.markdownbody};
  background-color: ${({ theme }) => theme.background.main};
`;

const MarkdownEditorWindow = forwardRef<HTMLTextAreaElement, MarkdownEditorWindowProps>(
  ({ showPreview, handlePreview }, ref) => {
    const { theme } = useContext(ThemeContext);
    const { activeDocument, onDocumentContentChange } = useContext(DocumentContext);

    return (
      <StyledEditorContainer showPreview={showPreview}>
        <TitleContainer theme={theme}>
          MARKDOWN
          <ShowPreviewButton
            showPreview={showPreview}
            handlePreview={handlePreview}
            isPreviewWindow={false}
          />
        </TitleContainer>
        <Editor
          value={activeDocument?.content || ""}
          onChange={onDocumentContentChange}
          ref={ref}
          theme={theme}
        />
      </StyledEditorContainer>
    );
  }
);

MarkdownEditorWindow.displayName = "MarkdownEditorWindow";
export default MarkdownEditorWindow;
