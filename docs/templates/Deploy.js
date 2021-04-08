import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DAppProvider, useAccountPkh, useReady, useTezos } from './dappstate';
import Snack from './components/Snack';
import { SnackProvider, useSnackContext } from './snackstate';
import WalletButton from './components/WalletButton';
import { getStorage, code } from './fa12.js';
import Link from '@docusaurus/Link';

const Connect = (props) => {
  const ready = useReady();
  if (ready) {
    const address = useAccountPkh();
    return (<Grid container direction="column"
    justify="center"
    alignItems="center">
      <Typography variant='subtitle2'>Connected with:</Typography>
      <Typography variant='subtitle2' style={{ fontFamily: 'Courier Prime, monospace' }}>{ address }</Typography>
    </Grid>);
  } else {
    return <WalletButton />;
  }
}

function isInvalidAddress (v) {
  const lgt = v.length;
  const tz1 = v.startsWith('tz1');
  return (lgt !== 36) | !tz1;
}

const Contract = (props) => {
  return (<Grid container direction="column"
  justify="center"
  alignItems="center">
    <Typography variant='subtitle2'>Contract available at:</Typography>
    <Typography component={Link} to={ 'https://better-call.dev/edo2net/'+props.contract+'/operations' } variant='subtitle2' style={{ fontFamily: 'Courier Prime, monospace' }}>{ props.contract }</Typography>
  </Grid>)
}

const DeployWidget = () => {
  const [ addr, setAddr ] = React.useState("");
  const [ totalsupply, setTotalSupply ] = React.useState(1000000);
  const [ contract, setContract ] = React.useState("");
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const tezos = useTezos();
  const ready = useReady();
  const handleAddr = (event) => {
    setAddr(event.target.value);
  }
  const isAddrError = () => {
    return addr.length > 0 & isInvalidAddress(addr);
  }
  const handleSupply = (event) => {
    setTotalSupply(event.target.value);
  }
  const isSupplyError = () => {
    return !(Math.round(totalsupply) == totalsupply & totalsupply > 0);
  }
  const isOriginateDisabled = () => {
    return !ready | isSupplyError() | isAddrError() | addr.length == 0;
  }
  const originate = async () => {
    try {
      const operation = await tezos.wallet.originate({
        code: code,
        init: getStorage(addr,totalsupply)
      }).send();
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      const contract = await operation.contract();
      hideSnack();
      console.log(`Origination completed for ${contract.address}.`);
      setContract(contract.address);
    } catch (error) {
      console.log(error);
      setErrorSnack(error.message);
      setTimeout(hideSnack, 4000);
    }
  }
  const isContractCreated = () => { return (contract !== "") }
  return (
    <Card style={{ backgroundColor: 'transparent', border: '1px solid #606770', marginTop: '20px', marginBottom: '20px' }} raised={false}>
      <Grid container style={{ padding: 22 }} spacing={3}>
        <Grid item xs={6}>
          <TextField
            onChange={ handleAddr }
            value={addr}
            variant="outlined"
            color="primary"
            fullWidth required
            id="initalholder"
            label="Initial Holder"
            error={ isAddrError() }
            helperText={(isAddrError())?"Invalid address format":""}></TextField>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Connect />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            onChange={ handleSupply }
            error={ isSupplyError() }
            helperText={(isSupplyError())?"Invalid Natural Integer":""}
            value={totalsupply}
            variant="outlined"
            color="primary"
            fullWidth required
            id="totalsupply"
            label="Total Supply"></TextField>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center', marginTop: '10px' }}>
        { isContractCreated()?<Contract contract={contract} />:
          <Button
            variant="contained"
            color="primary"
            disableElevation disabled={isOriginateDisabled()}
            onClick={ originate }
          >originate</Button>}
        </Grid>
      </Grid>
    </Card>
  )
}

const Deploy = (props) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            light: '#1dc5ff',
            main: '#00ACE7',
            dark: '#0a90bf',
            contrastText: '#fff',
          }
        },
      }),
    [true],
  );
  return (
  <DAppProvider appName={ "Completium FA 1.2" }>
  <SnackProvider>
  <ThemeProvider theme={theme}>
    <DeployWidget />
    <Snack />
  </ThemeProvider>
  </SnackProvider>
  </DAppProvider>
  )
}

export default Deploy;