import { RotateSpinner } from 'react-spinners-kit';

import { Loading, ProgressLoading, LoadingDataContainer, LoadingDataModal } from './styles';
import { theme } from '../../styles/global';
import { ClipLoader } from 'react-spinners';

export const LoadingPage: React.FC = () => {
  return (
    <Loading>
      <svg width="250" height="250" viewBox="0 0 40 60">
        <polygon className="triangle" fill="none" stroke={theme.colors.blue} strokeWidth="1" points="16,1 32,32 1,32" />
        <text className="text_loading" x="0" y="42.5" fill={theme.colors.blue}>
          Carregando...
        </text>
      </svg>
    </Loading>
  );
};

export const ProgressLoadingPage = ({ loading }: { loading: string }) => {
  if (loading)
    return (
      <ProgressLoading>
        <RotateSpinner size={85} color={theme.colors.white} />
      </ProgressLoading>
    );
  return null;
};

export const WaitOneMomentModal = ({ visible }: { visible: boolean }) => (
  <LoadingDataContainer visible={visible}>
    <LoadingDataModal>
      <p>Aguarde um instante...</p>
      <ClipLoader size={30} />
    </LoadingDataModal>
  </LoadingDataContainer>
);
