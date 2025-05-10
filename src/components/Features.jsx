import React from 'react';
import Styled from 'styled-components';

const FeaturesSection = Styled.div`
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(to bottom, #fcfcfc, #f5f7fa);
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom, #1f1f1f, #1a1a1a);
  }
`;

const FeaturesContainer = Styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeaturesGrid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = Styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #2a2a2a;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    
    &:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    }
  }
`;

const IconContainer = Styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.bgColor || '#f1c40f'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const FeatureTitle = Styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
  
  @media (prefers-color-scheme: dark) {
    color: #f0f0f0;
  }
`;

const FeatureDescription = Styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const Features = () => {
  const featuresData = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "纯CSS模式",
      description: "将图片的每个像素转换为box-shadow属性，实现纯CSS的图片效果，无需任何图像文件。",
      bgColor: "#f1c40f"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L5 10.5V19H13.5L20.24 12.24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Base64编码",
      description: "将图片转换为Base64编码后嵌入HTML中，无需外部图片链接，减少HTTP请求数量。",
      bgColor: "#2ecc71"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "即时预览",
      description: "图片处理后立即在界面中显示效果，方便用户查看转换结果和获取CSS代码。",
      bgColor: "#3498db"
    }
  ];

  return (
    <FeaturesSection>
      <FeaturesContainer>        
        <FeaturesGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} delay={`${0.1 * (index + 1)}s`} className="fade-in">
              <IconContainer bgColor={feature.bgColor}>
                {feature.icon}
              </IconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default Features;