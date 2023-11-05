import styled from '@emotion/styled';
import React from 'react';

export const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 260px;
  min-width: 35px;
  height: 90px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 56px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  
`; 