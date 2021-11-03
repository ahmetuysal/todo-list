import { VFC, memo } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  margin: 0;
  font-size: 2.5em;
`;

const TodoHeader: VFC = () => (
  <StyledHeader>To Do List</StyledHeader>
);

export default memo(TodoHeader);
