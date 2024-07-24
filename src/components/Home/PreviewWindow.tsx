import React, { useContext } from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import { ThemeContext } from "../../themes/themeContext";
import { DocumentContext } from "../../documents/documentContext";
import PreviewButton from "./PreviewButton";

const StyledPreview = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: ${({ showPreview }) => (showPreview ? "100%" : "50%")};
  color: ${(props) => props.theme.color.markdownbody};
  background-color: ${(props) => props.theme.background.main};

  @media screen and (max-width: 768px) {
    width: ${({ showPreview }) => (showPreview ? "100%" : "0%")};
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: ${({ showPreview }) => (showPreview ? "100%" : "50%")}; 
  }
`;
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
const ShowMarkdownButton = styled(PreviewButton)``;
const MarkdownContainer = styled.div`
  height: calc(100% - 120px);
  padding-left: ${({ showPreview }) => (showPreview ? "380px" : "16px")};
  padding-right: ${({ showPreview }) => (showPreview ? "380px" : "24px")};
  overflow: auto;

    @media screen and (max-width: 768px) {
    padding-left: ${({ showPreview }) => (showPreview ? "16px" : "8px")};
    padding-right: ${({ showPreview }) => (showPreview ? "16px" : "8px")};
  }
    
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding-left: ${({ showPreview }) => (showPreview ? "24px" : "12px")}; 
    padding-right: ${({ showPreview }) => (showPreview ? "24px" : "12px")};
  }
`;

const PreviewWindow = ({ showPreview, handlePreview }) => {
  const { theme } = useContext(ThemeContext);
  const { activeDocument } = useContext(DocumentContext);

  return (
    <StyledPreview showPreview={showPreview} theme={theme}>
      <TitleContainer theme={theme}>
        <div>PREVIEW</div>
        <ShowMarkdownButton
          showPreview={showPreview}
          handlePreview={handlePreview}
          isPreviewWindow={true}
        />
      </TitleContainer>
      <MarkdownContainer showPreview={showPreview} theme={theme}>
        <Markdown>{activeDocument ? activeDocument.content : "asdf"}</Markdown>
      </MarkdownContainer>
    </StyledPreview>
  );
};

PreviewWindow.displayName = "MarkdownEditor";
export default PreviewWindow;
