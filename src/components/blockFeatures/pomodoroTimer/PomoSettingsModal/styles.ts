import { styled } from 'styled-components';

export const CloseButton = styled.button<{ $hoverColor: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.4em;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
    color: white;
  }
`;
