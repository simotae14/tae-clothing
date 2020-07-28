import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  BackgroundImageContainer,
  ContentContainer,
  MenuItemContainer,
  SubtitleContainer,
  TitleContainer
} from './menu-item.styles'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        className='background-image'
        imageUrl={imageUrl}
      />
      <ContentContainer className='content'>
        <TitleContainer>{ title.toUpperCase() }</TitleContainer>
        <SubtitleContainer>SHOP NOW</SubtitleContainer>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem);