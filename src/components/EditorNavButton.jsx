import React from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';

const EditorNavSection = Styled.div`
  width: 100%;
  padding: 3rem 0;
  background: linear-gradient(to bottom, #f5f7fa, #fcfcfc);
  text-align: center;
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom, #1a1a1a, #1f1f1f);
  }
`;

const NavContainer = Styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavTitle = Styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  
  @media (prefers-color-scheme: dark) {
    color: #f0f0f0;
  }
`;

const NavDescription = Styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const ButtonsContainer = Styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const NavButton = Styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${props => props.primary ? '#ff6b9c' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    background-color: ${props => props.primary ? '#ff4383' : '#f5f5f5'};
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: ${props => props.primary ? '#ff6b9c' : '#333'};
    color: ${props => props.primary ? 'white' : '#f0f0f0'};
    
    &:hover {
      background-color: ${props => props.primary ? '#ff4383' : '#444'};
    }
  }
`;

const EditorNavButton = () => {
  return (
    <EditorNavSection>
      <NavContainer>
        <NavTitle>图片工具箱</NavTitle>
        <NavDescription>
          我们提供多种图片处理工具，帮助您快速编辑、处理和转换您的图片
        </NavDescription>
        <ButtonsContainer>
          <NavButton to="/image-editor" primary>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            图片编辑器
          </NavButton>
          
          <NavButton to="/format-converter">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 17L3 12L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 7L21 12L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            格式转换器
          </NavButton>
        </ButtonsContainer>
      </NavContainer>
    </EditorNavSection>
  );
};

export default EditorNavButton; 