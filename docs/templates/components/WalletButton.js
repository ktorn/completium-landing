import React from 'react';
import { useReady, useWallet, useConnect } from '../dappstate';
import { network } from '../settings';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';

const WalletButton = (props) => {
  const theme = useTheme();
  const ready = useReady();
  const wallet = useWallet();
  const connect= useConnect();
  const handleConnect = React.useCallback((main) => async () => {
    try {
      await connect(main?"mainnet":network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);
  return ((ready) ? (
        <div></div>
      ) :(wallet ? (
          <Button variant="outlined"
            color={theme.palette.text.primary}
            onClick={ handleConnect(props.main) }>
            connect to wallet
          </Button>
        ):(
          <Link href="https://templewallet.com/" rel="noopener" underline="none">
            <Button variant="contained" disableElevation
              style={{
                backgroundColor: '#ed8936',
                color: 'white',
                fontWeight: 'bold',
                }}>
              install Temple
            </Button>
          </Link>
      )));
}

export default WalletButton;