import styled from '@emotion/styled';
import React from 'react';
import { Typography } from './Typography';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  collapsed?: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

 const StyledLogo = styled.div<{ collapsed?: boolean }>`
  width: 200px;
  min-width: 45px;
  height: 55px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 36px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  
`;

const StyledLogoCollapsed = styled.div<{ collapsed?: boolean }>`
  width: 52px;

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, collapsed, ...rest }) => {
   
  return (
    <StyledSidebarHeader {...rest}>
      <div onClick={() => window.location.href = '/home'}
      style={{ display: 'flex', alignItems: 'center' }}>
        {!collapsed && <StyledLogo>VIT HUB</StyledLogo>}
        {collapsed && <StyledLogoCollapsed>VH</StyledLogoCollapsed>}
      </div>
    </StyledSidebarHeader>
  );
};
