import styled from '@emotion/styled';
import React from 'react';
import { Typography } from './Typography';
import packageJson from '../../package.json';
import { Avatar } from '@chakra-ui/avatar';
import { UserAuth } from '../context/AuthContext';

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

const StyledButton = styled.a`
  padding: 5px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  color: #484848;
  text-decoration: none;
`;

const StyledSidebarFooter = styled.div`
margin-top: 90px; 
width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

const StyledCollapsedSidebarFooter = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;


export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {
  const {user} = UserAuth();
  const profileLink = user?.photoURL ? user?.photoURL : "https://www.gravatar.com/avatar/00";
  // console.log("profileLink", profileLink);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '20px',
      }}
    >
      {collapsed ? (
        <StyledCollapsedSidebarFooter href={"/e"} target="_blank">
          <div >
            <Avatar src = {profileLink} size="s"  />
          </div>
        </StyledCollapsedSidebarFooter>
      ) : (
        <StyledSidebarFooter {...rest}>
          <div style={{ marginBottom: '12px' }}>
            <Avatar src = {profileLink} size="m"  />
          </div>
        
          <div style={{ marginTop: '16px' }}>
            <StyledButton href={"/e"} target="_blank">
              <Typography variant="caption" color="#607489" fontWeight={600}>
                Hello {user?.displayName}
              </Typography>
            </StyledButton>
          </div>
        </StyledSidebarFooter>
      )}
    </div>
  );
};
