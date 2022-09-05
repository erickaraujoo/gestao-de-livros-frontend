import styled from 'styled-components';

import { theme } from './../../styles/global';

export const Loading = styled.div`
  @import 'https://fonts.googleapis.com/css?family=Orbitron';

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .text_loading {
    font-family: 'Orbitron', sans-serif;
    font-size: 5px;
    animation: blink 0.9s ease-in-out infinite;
  }

  .triangle {
    stroke-dasharray: 17;
    animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 136;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

export const ProgressLoading = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  background: ${theme.colors.blackWithMediumOpacity};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingDataContainer = styled.section`
  display: flex;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background: ${theme.colors.blackWithGreatOpacity};
  justify-content: center;
  align-items: center;
`;

export const LoadingDataModal = styled.div`
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: 50px 80px;
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
    font-weight: 500;
  }
`;
