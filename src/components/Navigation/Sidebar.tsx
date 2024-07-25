import React, { useContext } from "react";
import styled from "styled-components";
import iconDocument from "../../assets/icon-document.svg";
import { DocumentContext } from "../../documents/documentContext";
import ThemeSelection from "./ThemeSelection";
import CreateButton from "./CreateButton";

//SideBar Container
const StyledSidebar = styled.div`
  height: 940px;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1d1f22;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  transform: translateX(
    ${({ showSidebar }) => (showSidebar ? "0px" : "-250px")}
  );
  transition: 0.3s;

  @media screen and (max-width: 767px) {
    height: 800px;
   }

  @media screen and (min-width: 768px) and (max-width: 1120px){
    height: 1250px;
  }
`;

//SideBar Inner Content Container
const DocumentsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-left: 24px;
`;

//SideBar Title
const DocumentsTitle = styled.div`
  margin-top: 27px;
  margin-bottom: 29px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 2px;
  color: #7c8187;
`;

//SideBar List all DocumentCreated
const DocumentsList = styled.div`
  max-height: calc(100vh - 208px);
  margin-top: 24px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

//SideBar Each Single Document Created in the List
const DocumentLink = styled.div`
  height: 36px;
  margin-bottom: 26px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
const DocumentIcon = styled.img`
  margin-right: 16.29px;
`;

//SideBar Document Info (Date, Name)
const DocumentInformation = styled.div``;
const DocumentDate = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 15px;
  color: #7c8187;
`;
const DocumentName = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;

  ${DocumentLink}:hover & {
    color: #e46643;
  }
`;

//The Dark and White Theme Selector Div
const ThemeContainer = styled.div`
  padding-left: 24px;
  padding-bottom: 300px;
`;

const Sidebar = ({ showSidebar, handleSidebar }) => {
  const { documents, changeActiveDocument } = useContext(DocumentContext);

  return (
    <StyledSidebar showSidebar={showSidebar}>
      <DocumentsContainer>
        <DocumentsTitle>MY DOCUMENTS</DocumentsTitle>
        <CreateButton />
        <DocumentsList>
          {documents &&
            documents.map((document) => {
              return (
                <DocumentLink
                  onClick={() => {
                    changeActiveDocument(document.id);
                    handleSidebar();
                  }}
                  key={document.id}
                >
                  <DocumentIcon src={iconDocument} />
                  <DocumentInformation>
                    <DocumentDate>{document.createdAt}</DocumentDate>
                    <DocumentName>
                      {document.name.length > 21
                        ? document.name.slice(0, 20) + "..."
                        : document.name}
                    </DocumentName>
                  </DocumentInformation>
                </DocumentLink>
              );
            })}
        </DocumentsList>
      </DocumentsContainer>
      <ThemeContainer>
        <ThemeSelection />
      </ThemeContainer>
    </StyledSidebar>
  );
};

export default Sidebar;
