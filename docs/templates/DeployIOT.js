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
import { getStorage, code } from './iot.js';
import Link from '@docusaurus/Link';
import Switch from '@material-ui/core/Switch';

const Connect = (props) => {
  const ready = useReady();
  const handleChange = (event) => {
    props.setMain(event.target.checked);
  }
  if (ready) {
    const address = useAccountPkh();
    return (<Grid container direction="column"
    justify="center"
    alignItems="center">
      <Typography variant='subtitle2'>Connected with:</Typography>
      <Typography variant='subtitle2' style={{ fontFamily: 'Courier Prime, monospace' }}>{ address }</Typography>
    </Grid>);
  } else {
    return (<Grid container>
      <Grid item xs={8}>
        <WalletButton main={props.main}/>
      </Grid>
      <Grid item xs={2}>
        <Switch checked={props.main}
            onChange={ handleChange }
            name="checkedB"
            color="primary"></Switch>
      </Grid>
      <Grid item xs={2}><Typography variant='subtitle2' style={{marginTop: '8px'}}>Mainnet</Typography></Grid>
    </Grid>);
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
    <Typography component={Link} to={ 'https://better-call.dev/'+(props.main?"mainnet":"edo2net")+'/'+props.contract+'/operations' } variant='subtitle2' style={{ fontFamily: 'Courier Prime, monospace' }}>{ props.contract }</Typography>
  </Grid>)
}

const DeployWidget = () => {
  const [ addr, setAddr ] = React.useState("");
  const [ rate, setRate ] = React.useState(1.5);
  const [ contract, setContract ] = React.useState("");
  const [main,setMain] = React.useState(false);
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const tezos = useTezos();
  const ready = useReady();
  const handleAddr = (event) => {
    setAddr(event.target.value);
  }
  const isAddrError = () => {
    return addr.length > 0 & isInvalidAddress(addr);
  }
  const handleRate = (event) => {
    setRate(event.target.value);
  }
  const isRateError = () => {
    return !(rate > 0);
  }
  const isOriginateDisabled = () => {
    return !ready | isRateError() | isAddrError() | addr.length == 0;
  }
  const originate = async () => {
    try {
      const Fraction = require('fractional').Fraction
      const rat = new Fraction(rate);
      const vrate = {  "prim": "Pair", "args": [ {  "int": rat.numerator.toString()  }, {  "int": rat.denominator.toString()  } ] }
      const operation = await tezos.wallet.originate({
        code: code,
        init: getStorage(addr, vrate)
      }).send();
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      const contract = await operation.contract();
      hideSnack();
      console.log(`Origination completed for ${contract.address}.`);
      setTimeout(() => setContract(contract.address), 5000);
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
            label="Owner"
            error={ isAddrError() }
            helperText={(isAddrError())?"Invalid address format":""}></TextField>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Connect main={main} setMain={setMain} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            onChange={ handleRate }
            error={ isRateError() }
            helperText={(isRateError())?"Invalid Number":""}
            value={rate}
            variant="outlined"
            color="primary"
            fullWidth required
            id="totalsupply"
            label="Rate"></TextField>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center', marginTop: '10px' }}>
        { isContractCreated()?<Contract contract={contract} main={main}/>:
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

const DeployIOT = (props) => {
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
  <DAppProvider appName={ "Completium IOT" }>
  <SnackProvider>
  <ThemeProvider theme={theme}>
    <DeployWidget />
    <Snack />
  </ThemeProvider>
  </SnackProvider>
  </DAppProvider>
  )
}

export default DeployIOT;