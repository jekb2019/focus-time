import { styled } from 'styled-components';

export const SettingItem = styled.li<{ $hoverColor: string }>`
  cursor: pointer;
  border-top: 1px solid rgb(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  padding: 10px 24px;
  transition: 0.2s all;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
    color: white;
  }
`;
