import styled, { css } from 'styled-components';

const fieldSharedStyle = css`
  width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgray;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`;

export const ImageComponent = styled.img`
  width: 100%;
  height: 100%;
`;

export const ValuesContainer = styled.span`
  ${fieldSharedStyle}
`;

export const QuantityContainer = styled.span`
  ${fieldSharedStyle}
  display: flex;
`;

export const ArrowStyle = styled.div`
  cursor: pointer;
`;

export const QuantityValue = styled.span`
  margin: 0 10px;
`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
