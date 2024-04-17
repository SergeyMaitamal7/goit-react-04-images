import styled from 'styled-components';
export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  padding-top: 24px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
