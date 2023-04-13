import tw, { styled } from 'twin.macro'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  position: absolute;
  // 不要这样设置，不然根页面相当于没有滚动条，滚动逻辑不自然，也不便于后面的动效组件获取页面滚动条位置
  // top: 0;
  // bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  
  overflow: auto;
`