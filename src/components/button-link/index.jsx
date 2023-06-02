// 这是一个长的想 < a > 的 < button ></button >

import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonLink = styled.button`
  appearance: none;
  border: none;
  background: none;
  color: #023e8a;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #90e0ef;
  }
`;

const ButtonLinkWrapper = ({...rest}) => (
//   <Link to={to}>
    <ButtonLink {...rest} />
//   </Link>
);

export default ButtonLinkWrapper;

