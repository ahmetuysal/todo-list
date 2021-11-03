import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  padding: 0.25em 1em;
  background: #2d70fd;
  color: white;
  border: 2px solid #2d70fd;
  border-radius: 3px;
  cursor: pointer;
  
  &:focus {
    background: #5792ff;
  }

  &:hover {
    background: #5792ff;
  }
`;

export default Button;


