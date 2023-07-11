import { styled } from 'styled-components';

export const ResetButton = styled.button<{ $hoverColor: string }>`
  position: absolute;
  top: 0;
  right: -15px;
  font-size: 1.4em;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;
