import React, { Fragment, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import tinycolor from 'tinycolor2';
import _ from 'lodash';

import Styled from 'styled-components';

import { imageToRGBMatrix, imageToRawData } from 'canvas-image-utils';
import Features from './components/Features';
import EditorNavButton from './components/EditorNavButton';
import ImageEditor from './components/ImageEditor';
import FormatConverter from './components/FormatConverter';

// 三角形外链组件
const CornerTriangle = Styled.a`
  position: fixed;
  width: 0;
  height: 0;
  z-index: 100;
  transition: all 0.3s ease;
  
  &.left-corner {
    top: 0;
    left: 0;
    border-top: 100px solid #ff6b9c;
    border-right: 100px solid transparent;
    
    &:hover {
      border-top-color: #ff4383;
    }
    
    .icon {
      position: absolute;
      top: -90px;
      left: 15px;
      width: 40px;
      height: 40px;
      color: white;
      transform: rotate(0deg);
    }
  }
  
  &.right-corner {
    top: 0;
    right: 0;
    border-top: 100px solid #ff6b9c;
    border-left: 100px solid transparent;
    
    &:hover {
      border-top-color: #ff4383;
    }
    
    .icon {
      position: absolute;
      top: -90px;
      right: 15px;
      width: 40px;
      height: 40px;
      color: white;
    }
  }
`;

// 现代化样式组件
const AppContainer = Styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafafa;
  animation: fadeIn 0.8s ease;
  
  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = Styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #333;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, #ff6b9c, #ff4383);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  text-shadow: 0 4px 30px rgba(255, 107, 156, 0.3);
`;

const Subtitle = Styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const Card = Styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
  
  @media (prefers-color-scheme: dark) {
    background-color: #2a2a2a;
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
    
    @media (prefers-color-scheme: dark) {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }
  }
`;

const StyledDropzone = Styled.div`
  border: 2px dashed #d0d7de;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: #fafafa;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: linear-gradient(
      45deg,
      rgba(255, 107, 156, 0.05) 0%,
      rgba(255, 107, 156, 0) 50%,
      rgba(255, 107, 156, 0.05) 100%
    );
    transform: rotate(0deg);
    z-index: 0;
    animation: shimmer 3s infinite linear;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) rotate(0deg);
    }
    100% {
      transform: translateX(100%) rotate(0deg);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: #444;
    background-color: #2a2a2a;
  }
  
  &:hover {
    background-color: #fff0f5;
    border-color: #ff6b9c;
    
    @media (prefers-color-scheme: dark) {
      background-color: #333;
    }
  }
  
  input[type="file"] {
    display: none;
  }
`;

const DropzoneText = Styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.5rem;
`;

const DropzoneSubText = Styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const ProcessingText = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  
  &:after {
    content: "...";
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis steps(4, end) 1.5s infinite;
    width: 0px;
  }
  
  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
`;

const TabContainer = Styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background-color: #f0f0f0;
`;

const TabButton = Styled.button`
  flex: 1;
  background-color: ${props => props.active ? '#ff6b9c' : 'transparent'};
  color: ${props => props.active ? '#333' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  border: none;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: ${props => props.active ? '#ff6b9c' : '#e9e9e9'};
  }
`;

const ResultContainer = Styled.div`
  margin-top: 1.5rem;
`;

const ResultTitle = Styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const ResultDescription = Styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ImagePreview = Styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Textarea = Styled.textarea`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  border: none;
  width: 100%;
  height: 180px;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 1rem;
  background-color: #282c34;
  color: #abb2bf;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 107, 156, 0.3);
  }
`;

const SizeInfo = Styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
    color: #aaa;
  }
`;

const SizeText = Styled.span`
  display: inline-flex;
  align-items: center;
  
  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.type === 'original' ? '#ff4383' : '#ff6b9c'};
    margin-right: 0.5rem;
  }
`;

const FooterSection = Styled.footer`
  border-top: 1px solid #eee;
  padding-top: 2rem;
  margin-top: 3rem;
  
  @media (prefers-color-scheme: dark) {
    border-color: #333;
  }
`;

const FooterCredits = Styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  
  a {
    color: #ff6b9c;
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .icp-link {
    display: inline-flex;
    align-items: center;
    color: #888;
    margin-left: 15px;
    
    img {
      margin-right: 5px;
      height: 14px;
    }
    
    &:hover {
      color: #ff6b9c;
    }
  }
`;

function compressColor(rgb) {
  const hex = tinycolor(rgb).toHexString();

  switch (
    hex // based on CSS3 supported color names http://www.w3.org/TR/css3-color/
  ) {
    case '#c0c0c0':
      return 'silver';
    case '#808080':
      return 'gray';
    case '#800000':
      return 'maroon';
    case '#ff0000':
      return 'red';
    case '#800080':
      return 'purple';
    case '#008000':
      return 'green';
    case '#808000':
      return 'olive';
    case '#000080':
      return 'navy';
    case '#008080':
      return 'teal';
  }
  return hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]
    ? '#' + hex[1] + hex[3] + hex[5]
    : hex;
}

function App() {
  const [outputType, outputTypeSet] = useState('SHADOW');
  const [originalSize, originalSizeSet] = useState(0);
  const [base64Data, base64DataSet] = useState('');
  const [rgbMatrix, rgbMatrixSet] = useState(null);
  const [loadingImage, loadingImageSet] = useState(false);

  const onFileSelected = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();

    const dt = event.dataTransfer;
    const files = dt ? dt.files : event.target.files;
    const file = files[0];

    if (!file) return;
    
    originalSizeSet(file.size);
    loadingImageSet(true);

    const fr = new window.FileReader();

    fr.onload = async (data) => {
      const base64src = data.currentTarget.result;
      const dataMatrix = await imageToRGBMatrix(base64src, { size: 200 });
      const canvasRawData = await imageToRawData(base64src, {
        size: 1080,
        crop: false,
      });

      base64DataSet(canvasRawData.ctx.canvas.toDataURL('image/jpeg', 0.75));
      rgbMatrixSet(dataMatrix);
      loadingImageSet(false);
    };
    fr.readAsDataURL(file);
  }, []);

  const onDragOver = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const handleFocus = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.select();
  }, []);
  
  let scale = 1;

  const masterShadow = rgbMatrix
    ? _.map(rgbMatrix, (row, rowIndexSrc) => {
        return _.map(row, (col, colIndexSrc) => {
          const i = colIndexSrc * scale;
          const j = rowIndexSrc * scale;

          const color = compressColor(`rgb(${col.r},${col.g},${col.b})`);

          const scaleCompensation = scale !== 1 ? ` 0 ${scale / 2}px` : ``;

          return `${color} ${j ? j + 'px' : 0} ${
            i ? i + 'px' : 0
          }${scaleCompensation}`;
        }).join(',');
      }).join(',')
    : '';

  return (
    <Routes>
      <Route path="/" element={
        <Fragment>
          <CornerTriangle
            href="https://kingdomofown.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="left-corner"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CornerTriangle>
          <CornerTriangle
            href="https://github.com/Chujie-cre/img-to-css"
            target="_blank"
            rel="noopener noreferrer"
            className="right-corner"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.168 8.839 21.489C9.339 21.582 9.521 21.27 9.521 21.007C9.521 20.742 9.515 20.007 9.51 19.122C6.73 19.761 6.139 17.992 6.139 17.992C5.685 16.927 5.028 16.615 5.028 16.615C4.132 15.968 5.097 15.981 5.097 15.981C6.094 16.052 6.62 17.044 6.62 17.044C7.52 18.518 8.97 18.04 9.54 17.782C9.63 17.132 9.89 16.659 10.175 16.391C7.955 16.122 5.62 15.276 5.62 11.447C5.62 10.36 6.01 9.473 6.639 8.785C6.539 8.529 6.199 7.627 6.739 6.225C6.739 6.225 7.585 5.962 9.499 7.279C10.3 7.063 11.15 6.955 12 6.951C12.85 6.955 13.7 7.063 14.5 7.279C16.415 5.962 17.26 6.225 17.26 6.225C17.8 7.627 17.46 8.529 17.36 8.785C17.99 9.473 18.38 10.36 18.38 11.447C18.38 15.286 16.045 16.12 13.815 16.385C14.174 16.715 14.514 17.369 14.514 18.367C14.514 19.782 14.499 20.662 14.499 21.007C14.499 21.274 14.679 21.587 15.189 21.489C19.158 20.165 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
            </svg>
          </CornerTriangle>
          <AppContainer>
            <Header>
              <Title>图片转CSS</Title>
              <Subtitle>
                快速将图片转换为纯CSS代码或Base64编码，优化网页性能，提升加载速度
              </Subtitle>
            </Header>

            <Card>
              <StyledDropzone
                onClick={() => document.getElementById('file-upload').click()}
                onDrop={onFileSelected}
                onDragOver={onDragOver}
                onDragEnter={onDragOver}
              >
                {loadingImage ? (
                  <ProcessingText>正在处理图片</ProcessingText>
                ) : (
                  <>
                    <DropzoneText>拖放图片到此处</DropzoneText>
                    <DropzoneSubText>或点击选择文件</DropzoneSubText>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  onChange={onFileSelected}
                  accept="image/*"
                  aria-label="拖放图片到此处，或点击选择文件"
                />
              </StyledDropzone>
            </Card>

            {rgbMatrix && (
              <Card delay="0.2s">
                <TabContainer>
                  <TabButton
                    active={outputType === 'SHADOW'}
                    onClick={() => outputTypeSet('SHADOW')}
                  >
                    纯CSS输出
                  </TabButton>
                  <TabButton
                    active={outputType === 'BASE64'}
                    onClick={() => outputTypeSet('BASE64')}
                  >
                    Base64输出
                  </TabButton>
                </TabContainer>

                <ResultContainer>
                  {outputType === 'BASE64' && (
                    <>
                      <ResultTitle>Base64 编码结果</ResultTitle>
                      <ResultDescription>
                        这是您的图片通过Base64编码后的结果。整个图片文件被嵌入到 `&lt;img&gt;` 标签中，
                        因此不需要外部托管即可使用。
                      </ResultDescription>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem 0'
                      }}>
                        <ImagePreview
                          src={base64Data}
                          alt="Base64编码后的图片预览"
                          className="fade-in"
                        />
                      </div>

                      <Textarea
                        onFocus={handleFocus}
                        readOnly
                        value={`<img src="${base64Data}" />`}
                        className="fade-in"
                      />
                      
                      <SizeInfo className="fade-in">
                        <SizeText type="resized">输出大小: {base64Data.length.toLocaleString()}字节</SizeText>
                        <SizeText type="original">原始大小: {Number(originalSize).toLocaleString()}字节</SizeText>
                      </SizeInfo>
                    </>
                  )}

                  {outputType === 'SHADOW' && (
                    <>
                      <ResultTitle>纯CSS结果</ResultTitle>
                      <ResultDescription>
                        这是您的纯CSS（单一div）图片，可以直接使用！通过将每个像素设置为单个像素div的box-shadow属性来创建，
                        无需使用任何`img`标签或`background-image`属性。请注意，这可能会产生较大的输出，
                        除非没有其他选择，否则不建议在生产环境中使用此输出。
                      </ResultDescription>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '2rem 0',
                        overflow: 'hidden',
                        width: '100%'
                      }}>
                        <div style={{
                          height: 1,
                          width: 1,
                          boxShadow: masterShadow,
                          marginBottom: rgbMatrix[0].length * scale,
                          marginRight: rgbMatrix.length * scale,
                          borderRadius: '8px',
                        }} className="fade-in" />
                      </div>

                      <Textarea
                        onFocus={handleFocus}
                        readOnly
                        value={`<div style="margin-right: ${
                          rgbMatrix[0].length * scale
                        }px; margin-bottom: ${
                          rgbMatrix.length * scale
                        }px; height: 1px; width: 1px; box-shadow: ${masterShadow}"></div>`}
                        className="fade-in"
                      />
                      
                      <SizeInfo className="fade-in">
                        <SizeText type="resized">输出大小: {masterShadow.length.toLocaleString()}字节</SizeText>
                        <SizeText type="original">原始大小: {Number(originalSize).toLocaleString()}字节</SizeText>
                      </SizeInfo>
                    </>
                  )}
                </ResultContainer>
              </Card>
            )}

            <EditorNavButton />
            
            <Features />
            
            <FooterSection>
              <FooterCredits>
                由 <a href="https://king.kingdomofown.cn" target="_blank" rel="noopener noreferrer">雏结</a> 开发设计 2025
                <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="icp-link">
                  <img src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="国徽" />
                  黔ICP备2025044143号
                </a>
              </FooterCredits>
            </FooterSection>
          </AppContainer>
        </Fragment>
      } />
      
      <Route path="/image-editor" element={<ImageEditor />} />
      <Route path="/format-converter" element={<FormatConverter />} />
    </Routes>
  );
}

export default App;
