import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const ConverterContainer = Styled.div`
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

const ConverterHeader = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ConverterTitle = Styled.h1`
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

const Card = Styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.1s;
  opacity: 0;
  
  @media (prefers-color-scheme: dark) {
    background-color: #2a2a2a;
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
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

const FormatSelector = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const FormatButton = Styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#ff6b9c' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(255, 107, 156, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background-color: ${props => props.active ? '#ff4383' : '#e5e5e5'};
    transform: translateY(-2px);
    box-shadow: ${props => props.active ? '0 6px 20px rgba(255, 107, 156, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
  }
  
  &:disabled {
    background-color: #eee;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: ${props => props.active ? '#ff6b9c' : '#333'};
    color: ${props => props.active ? 'white' : '#f0f0f0'};
    
    &:hover {
      background-color: ${props => props.active ? '#ff4383' : '#444'};
    }
    
    &:disabled {
      background-color: #444;
      color: #777;
    }
  }
`;

const ConvertButton = Styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  
  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ImagePreview = Styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f0f0f0;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  
  img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
`;

const DownloadLink = Styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  margin: 1rem auto;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
  
  &:hover {
    background-color: #0d8bf2;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Description = Styled.p`
  text-align: center;
  color: #666;
  margin: 1rem 0;
  line-height: 1.6;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const SettingsContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SettingCard = Styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
`;

const SettingLabel = Styled.label`
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

const SettingValue = Styled.span`
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

const CustomSelect = Styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #ff6b9c;
    box-shadow: 0 0 0 2px rgba(255, 107, 156, 0.2);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #444;
    border-color: #555;
    color: #eee;
    
    &:focus {
      border-color: #ff6b9c;
    }
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

const EmptyPreview = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #888;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: #ccc;
  }
`;

const StatsBox = Styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const StatItem = Styled.div`
  text-align: center;
  padding: 1rem;
  
  .label {
    font-size: 0.8rem;
    color: #777;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${props => props.color || '#333'};
  }
  
  @media (prefers-color-scheme: dark) {
    .label {
      color: #aaa;
    }
    
    .value {
      color: ${props => props.color || '#eee'};
    }
  }
`;

const FormatInfo = Styled.div`
  font-size: 0.85rem;
  color: #666;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  
  strong {
    color: #ff4383;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #ccc;
    background-color: #333;
  }
`;

const FormatConverter = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [originalFormat, setOriginalFormat] = useState('');
  const [targetFormat, setTargetFormat] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState(92);
  const [resizeOption, setResizeOption] = useState('none');
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [currentTab, setCurrentTab] = useState('basic');
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0, fileSize: 0 });
  const [convertedSize, setConvertedSize] = useState(0);

  const formats = [
    { id: 'jpeg', name: 'JPEG', info: '适用于照片，压缩率高' },
    { id: 'png', name: 'PNG', info: '支持透明背景，适合图标和图形' },
    { id: 'webp', name: 'WEBP', info: '现代网页格式，兼具压缩率和质量' },
    { id: 'gif', name: 'GIF', info: '支持动画，色彩有限' },
    { id: 'bmp', name: 'BMP', info: '无损格式，体积大' }
  ];
  
  const resizeOptions = [
    { value: 'none', label: '不调整大小' },
    { value: 'small', label: '小尺寸 (480px)' },
    { value: 'medium', label: '中等尺寸 (800px)' },
    { value: 'large', label: '大尺寸 (1200px)' },
    { value: 'custom', label: '自定义尺寸' }
  ];

  useEffect(() => {
    if (imageUrl) {
      // 获取原始图片尺寸和大小
      const img = new Image();
      img.onload = () => {
        setOriginalSize({
          width: img.width,
          height: img.height,
          fileSize: 0 // 稍后填充
        });
      };
      img.src = imageUrl;
      
      // 估算文件大小（仅基于Base64串长度的粗略估计）
      fetch(imageUrl).then(response => {
        return response.blob();
      }).then(blob => {
        setOriginalSize(prev => ({
          ...prev,
          fileSize: blob.size
        }));
      });
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      
      // 获取原始文件格式
      const fileType = file.type.split('/')[1];
      setOriginalFormat(fileType);
      
      // 设置新文件名（不带扩展名）
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setFileName(nameWithoutExt);
      
      // 重置之前的转换结果
      setConvertedUrl('');
      setTargetFormat('');
    }
  };

  const getResizeDimensions = (origWidth, origHeight) => {
    if (resizeOption === 'none') {
      return { width: origWidth, height: origHeight };
    } else if (resizeOption === 'custom') {
      return { width: customWidth, height: customHeight };
    } else {
      // 计算等比例缩放
      let maxDimension = 800; // 默认为medium
      
      if (resizeOption === 'small') maxDimension = 480;
      if (resizeOption === 'large') maxDimension = 1200;
      
      if (origWidth > origHeight) {
        return {
          width: maxDimension,
          height: Math.round((origHeight / origWidth) * maxDimension)
        };
      } else {
        return {
          width: Math.round((origWidth / origHeight) * maxDimension),
          height: maxDimension
        };
      }
    }
  };

  const convertImage = () => {
    if (!imageUrl || !targetFormat) return;
    
    setIsConverting(true);
    
    // 创建一个Canvas元素来做格式转换
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      // 计算调整后的尺寸
      const { width, height } = getResizeDimensions(img.width, img.height);
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      
      // 绘制图像并调整大小
      ctx.drawImage(img, 0, 0, width, height);
      
      // 根据目标格式转换
      let mimeType = 'image/jpeg';
      let convQuality = quality / 100;
      
      switch (targetFormat) {
        case 'png':
          mimeType = 'image/png';
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'bmp':
          mimeType = 'image/bmp';
          break;
        default:
          mimeType = 'image/jpeg';
      }
      
      const dataUrl = canvas.toDataURL(mimeType, convQuality);
      setConvertedUrl(dataUrl);
      
      // 估算转换后的文件大小
      fetch(dataUrl).then(response => {
        return response.blob();
      }).then(blob => {
        setConvertedSize(blob.size);
      });
      
      setIsConverting(false);
    };
    
    img.onerror = () => {
      console.error('Error loading image');
      setIsConverting(false);
    };
    
    img.src = imageUrl;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const getCompressionRate = () => {
    if (!originalSize.fileSize || !convertedSize) return '0%';
    
    const saving = originalSize.fileSize - convertedSize;
    const percentage = (saving / originalSize.fileSize) * 100;
    
    if (percentage < 0) {
      return `增加 ${Math.abs(percentage).toFixed(1)}%`;
    } else {
      return `节省 ${percentage.toFixed(1)}%`;
    }
  };

  const getFormatInfo = (formatId) => {
    const format = formats.find(f => f.id === formatId);
    return format ? format.info : '';
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <ConverterContainer>
      <BackButton onClick={goBack}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        返回首页
      </BackButton>
      
      <ConverterHeader>
        <ConverterTitle>图片格式转换</ConverterTitle>
      </ConverterHeader>
      
      <Description>
        将图片从一种格式转换为另一种格式，支持JPEG、PNG、WEBP、GIF和BMP格式互转，可调整质量和大小
      </Description>
      
      <Card>
        <InputFileButton as="label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          选择图片
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
          />
        </InputFileButton>
        
        {imageUrl ? (
          <>
            <ImagePreview>
              {isConverting && (
                <LoadingOverlay>
                  <LoadingSpinner />
                </LoadingOverlay>
              )}
              <img src={imageUrl} alt="原始图片" />
            </ImagePreview>
            
            <StatsBox>
              <StatItem>
                <div className="label">原始格式</div>
                <div className="value" style={{ color: '#ff6b9c' }}>{originalFormat.toUpperCase()}</div>
              </StatItem>
              <StatItem>
                <div className="label">尺寸</div>
                <div className="value">{originalSize.width} × {originalSize.height}</div>
              </StatItem>
              <StatItem>
                <div className="label">文件大小</div>
                <div className="value">{formatFileSize(originalSize.fileSize)}</div>
              </StatItem>
            </StatsBox>
            
            {targetFormat && (
              <FormatInfo>
                <strong>{targetFormat.toUpperCase()}</strong>: {getFormatInfo(targetFormat)}
              </FormatInfo>
            )}
            
            <TabContainer>
              <TabButton 
                active={currentTab === 'basic'} 
                onClick={() => setCurrentTab('basic')}
              >
                基本转换
              </TabButton>
              <TabButton 
                active={currentTab === 'advanced'} 
                onClick={() => setCurrentTab('advanced')}
              >
                高级选项
              </TabButton>
            </TabContainer>
            
            {currentTab === 'basic' && (
              <FormatSelector>
                {formats.map((format) => (
                  <FormatButton 
                    key={format.id}
                    active={targetFormat === format.id}
                    disabled={format.id === originalFormat}
                    onClick={() => setTargetFormat(format.id)}
                  >
                    {format.name}
                  </FormatButton>
                ))}
              </FormatSelector>
            )}
            
            {currentTab === 'advanced' && (
              <SettingsContainer>
                <SettingCard>
                  <SettingLabel>
                    图片质量
                    <SettingValue>{quality}%</SettingValue>
                  </SettingLabel>
                  <CustomSlider
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                  />
                </SettingCard>
                
                <SettingCard>
                  <SettingLabel>
                    调整大小
                  </SettingLabel>
                  <CustomSelect
                    value={resizeOption}
                    onChange={(e) => setResizeOption(e.target.value)}
                  >
                    {resizeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CustomSelect>
                </SettingCard>
                
                {resizeOption === 'custom' && (
                  <>
                    <SettingCard>
                      <SettingLabel>
                        自定义宽度
                        <SettingValue>{customWidth}px</SettingValue>
                      </SettingLabel>
                      <CustomSlider
                        type="range"
                        min="100"
                        max="3000"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                      />
                    </SettingCard>
                    
                    <SettingCard>
                      <SettingLabel>
                        自定义高度
                        <SettingValue>{customHeight}px</SettingValue>
                      </SettingLabel>
                      <CustomSlider
                        type="range"
                        min="100"
                        max="3000"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                      />
                    </SettingCard>
                  </>
                )}
              </SettingsContainer>
            )}
            
            <ConvertButton 
              onClick={convertImage} 
              disabled={!targetFormat || isConverting || targetFormat === originalFormat}
            >
              {isConverting ? (
                <>
                  <LoadingSpinner style={{ width: '20px', height: '20px', borderWidth: '3px' }} />
                  正在转换...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 17H13V13H17V17ZM11 17H7V13H11V17ZM17 11H13V7H17V11ZM11 11H7V7H11V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  转换图片
                </>
              )}
            </ConvertButton>
          </>
        ) : (
          <EmptyPreview>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>请选择一张图片进行转换</span>
          </EmptyPreview>
        )}
        
        {convertedUrl && (
          <>
            <ImagePreview>
              <img src={convertedUrl} alt="转换后的图片" />
            </ImagePreview>
            
            <StatsBox>
              <StatItem>
                <div className="label">新格式</div>
                <div className="value" style={{ color: '#4CAF50' }}>{targetFormat.toUpperCase()}</div>
              </StatItem>
              <StatItem>
                <div className="label">新文件大小</div>
                <div className="value">{formatFileSize(convertedSize)}</div>
              </StatItem>
              <StatItem>
                <div className="label">压缩比</div>
                <div className="value" style={{ color: convertedSize < originalSize.fileSize ? '#4CAF50' : '#f44336' }}>
                  {getCompressionRate()}
                </div>
              </StatItem>
            </StatsBox>
            
            <div style={{ textAlign: 'center' }}>
              <DownloadLink 
                href={convertedUrl} 
                download={`${fileName}.${targetFormat}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                下载 {targetFormat.toUpperCase()} 格式图片
              </DownloadLink>
            </div>
          </>
        )}
      </Card>
    </ConverterContainer>
  );
};

export default FormatConverter; 