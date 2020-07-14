import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    width: 100%;
    height: 128px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px auto 0;
`;

export const ImageInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
  }
`;

export const Description = styled.div`
  left: 0;
`;
