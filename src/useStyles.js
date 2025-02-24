import { styled, keyframes } from '@mui/system';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

const useStyles = () => {
  const bottomSheet = styled('div')({
    height: 'auto',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    overflow: 'hidden',
  });

  return { bottomSheet, shake };
};

export default useStyles;
