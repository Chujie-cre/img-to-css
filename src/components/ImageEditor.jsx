import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const EditorContainer = Styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafafa;
  animation: fadeIn 0.8s ease;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EditorHeader = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const EditorTitle = Styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, #ff6b9c, #ff4383);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #ff6b9c, #ff4383);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const BackButton = Styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  
  &:hover {
    background-color: #eee;
    transform: translateY(-2px);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
    color: #f0f0f0;
    
    &:hover {
      background-color: #444;
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ControlsContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SliderContainer = Styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
`;

const SliderLabel = Styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  
  @media (prefers-color-scheme: dark) {
    color: #ccc;
  }
`;

const SliderValue = Styled.span`
  font-weight: 700;
  color: #ff4383;
`;

const CustomSlider = Styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #e0e0e0;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff4383;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.2);
    }
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff4383;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.2);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background: #555;
  }
`;

const InputFileButton = Styled.div`
  background-color: #ff6b9c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem auto;
  display: inline-block;
  text-align: center;
  box-shadow: 0 4px 15px rgba(255, 107, 156, 0.3);
  
  &:hover {
    background-color: #ff4383;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 156, 0.4);
  }
  
  input {
    display: none;
  }
`;

const ButtonsContainer = Styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
`;

const ActionButton = Styled.button`
  background-color: ${props => props.color || '#4CAF50'};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.hoverColor || '#388E3C'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ImagePreview = Styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 500px;
    display: block;
    margin: 0 auto;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
`;

const EmptyPreview = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #888;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: #ccc;
  }
`;

const TabContainer = Styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TabButton = Styled.button`
  background-color: ${props => (props.active ? '#ff6b9c' : '#f5f5f5')};
  color: ${props => (props.active ? 'white' : '#333')};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 0.5rem;
  
  &:hover {
    background-color: ${props => (props.active ? '#ff4383' : '#e5e5e5')};
    transform: translateY(-2px);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: ${props => (props.active ? '#ff6b9c' : '#333')};
    color: ${props => (props.active ? 'white' : '#f0f0f0')};
    
    &:hover {
      background-color: ${props => (props.active ? '#ff4383' : '#444')};
    }
  }
`;

const LoadingOverlay = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LoadingSpinner = Styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff4383;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Tooltip = Styled.div`
  position: relative;
  display: inline-block;
  
  .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
  }
  
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

function ImageEditor() {
  const [imageUrl, setImageUrl] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('adjustments');
  const [fileName, setFileName] = useState('');
  const [originalFormat, setOriginalFormat] = useState('');
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const fileType = file.type.split('/')[1];
      setOriginalFormat(fileType);
      setImageUrl(URL.createObjectURL(file));
      resetFilters();
    }
  };

  useEffect(() => {
    if (imageUrl) {
      applyFilters();
    }
  }, [brightness, contrast, saturation, grayscale, blur, hueRotate, sepia, invert, imageUrl]);

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px) hue-rotate(${hueRotate}deg) sepia(${sepia}%) invert(${invert}%)`,
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
    setBlur(0);
    setHueRotate(0);
    setSepia(0);
    setInvert(0);
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    setIsLoading(true);
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 应用滤镜
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px) hue-rotate(${hueRotate}deg) sepia(${sepia}%) invert(${invert}%)`;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      // 创建下载链接
      const downloadLink = document.createElement('a');
      const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      const format = originalFormat === 'png' || originalFormat === 'jpg' || originalFormat === 'jpeg' ? originalFormat : 'png';
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      
      downloadLink.href = canvas.toDataURL(mimeType, 1.0);
      downloadLink.download = `${fileNameWithoutExt}_edited.${format === 'jpeg' ? 'jpg' : format}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      alert('图片加载失败，请重试');
    };
    
    img.src = imageUrl;
  };
  
  const applyFilters = () => {
    if (!imageUrl) return;
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 应用滤镜
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px) hue-rotate(${hueRotate}deg) sepia(${sepia}%) invert(${invert}%)`;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    
    img.src = imageUrl;
  };
  
  const applyPreset = (preset) => {
    switch(preset) {
      case 'vintage':
        setBrightness(110);
        setContrast(85);
        setSaturation(75);
        setSepia(50);
        setHueRotate(0);
        setGrayscale(0);
        setBlur(0);
        setInvert(0);
        break;
      case 'bw':
        setBrightness(100);
        setContrast(120);
        setSaturation(0);
        setSepia(0);
        setHueRotate(0);
        setGrayscale(100);
        setBlur(0);
        setInvert(0);
        break;
      case 'warm':
        setBrightness(105);
        setContrast(105);
        setSaturation(110);
        setSepia(30);
        setHueRotate(15);
        setGrayscale(0);
        setBlur(0);
        setInvert(0);
        break;
      case 'cool':
        setBrightness(100);
        setContrast(105);
        setSaturation(110);
        setSepia(0);
        setHueRotate(180);
        setGrayscale(0);
        setBlur(0);
        setInvert(0);
        break;
      case 'dramatic':
        setBrightness(110);
        setContrast(140);
        setSaturation(110);
        setSepia(0);
        setHueRotate(0);
        setGrayscale(0);
        setBlur(0);
        setInvert(0);
        break;
      default:
        resetFilters();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <EditorContainer>
      <BackButton onClick={goBack}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        返回首页
      </BackButton>
      
      <EditorHeader>
        <EditorTitle>图片编辑器</EditorTitle>
      </EditorHeader>
      
      <InputFileButton as="label">
        选择图片
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
        />
      </InputFileButton>
      
      {imageUrl && (
        <TabContainer>
          <TabButton 
            active={currentTab === 'adjustments'} 
            onClick={() => setCurrentTab('adjustments')}
          >
            基本调整
          </TabButton>
          <TabButton 
            active={currentTab === 'effects'} 
            onClick={() => setCurrentTab('effects')}
          >
            特效
          </TabButton>
          <TabButton 
            active={currentTab === 'presets'} 
            onClick={() => setCurrentTab('presets')}
          >
            预设
          </TabButton>
        </TabContainer>
      )}
      
      <ImagePreview>
        {isLoading && (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        )}
        
        {imageUrl ? (
          <img src={imageUrl} alt="编辑图片" style={imageStyle} />
        ) : (
          <EmptyPreview>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>请选择一张图片进行编辑</span>
          </EmptyPreview>
        )}
      </ImagePreview>
      
      {imageUrl && (
        <ButtonsContainer>
          <ActionButton onClick={resetFilters} color="#f44336" hoverColor="#d32f2f">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            重置滤镜
          </ActionButton>
          
          <ActionButton onClick={downloadImage} color="#2196F3" hoverColor="#1976D2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            下载图片
          </ActionButton>
        </ButtonsContainer>
      )}
      
      {imageUrl && currentTab === 'adjustments' && (
        <ControlsContainer>
          <SliderContainer>
            <SliderLabel>
              亮度
              <SliderValue>{brightness}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              对比度
              <SliderValue>{contrast}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              饱和度
              <SliderValue>{saturation}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              灰度
              <SliderValue>{grayscale}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(e.target.value)}
            />
          </SliderContainer>
        </ControlsContainer>
      )}
      
      {imageUrl && currentTab === 'effects' && (
        <ControlsContainer>
          <SliderContainer>
            <SliderLabel>
              模糊
              <SliderValue>{blur}px</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="20"
              value={blur}
              onChange={(e) => setBlur(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              色相旋转
              <SliderValue>{hueRotate}°</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="360"
              value={hueRotate}
              onChange={(e) => setHueRotate(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              复古
              <SliderValue>{sepia}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="100"
              value={sepia}
              onChange={(e) => setSepia(e.target.value)}
            />
          </SliderContainer>
          
          <SliderContainer>
            <SliderLabel>
              反转
              <SliderValue>{invert}%</SliderValue>
            </SliderLabel>
            <CustomSlider
              type="range"
              min="0"
              max="100"
              value={invert}
              onChange={(e) => setInvert(e.target.value)}
            />
          </SliderContainer>
        </ControlsContainer>
      )}
      
      {imageUrl && currentTab === 'presets' && (
        <ControlsContainer>
          <Tooltip>
            <ActionButton onClick={() => applyPreset('vintage')} color="#9c27b0" hoverColor="#7b1fa2" style={{width: '100%'}}>
              复古风格
            </ActionButton>
            <span className="tooltip-text">褪色复古效果</span>
          </Tooltip>
          
          <Tooltip>
            <ActionButton onClick={() => applyPreset('bw')} color="#333" hoverColor="#111" style={{width: '100%'}}>
              黑白效果
            </ActionButton>
            <span className="tooltip-text">高对比度黑白</span>
          </Tooltip>
          
          <Tooltip>
            <ActionButton onClick={() => applyPreset('warm')} color="#ff9800" hoverColor="#f57c00" style={{width: '100%'}}>
              暖色调
            </ActionButton>
            <span className="tooltip-text">温暖橙色色调</span>
          </Tooltip>
          
          <Tooltip>
            <ActionButton onClick={() => applyPreset('cool')} color="#00bcd4" hoverColor="#0097a7" style={{width: '100%'}}>
              冷色调
            </ActionButton>
            <span className="tooltip-text">冷蓝色调</span>
          </Tooltip>
          
          <Tooltip>
            <ActionButton onClick={() => applyPreset('dramatic')} color="#673ab7" hoverColor="#512da8" style={{width: '100%'}}>
              戏剧效果
            </ActionButton>
            <span className="tooltip-text">高对比度戏剧性效果</span>
          </Tooltip>
        </ControlsContainer>
      )}
    </EditorContainer>
  );
}

export default ImageEditor; 