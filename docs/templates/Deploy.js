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
import { getStorage, getStorageWithMetadata, code, code_with_metadata } from './fa12.js';
import Link from '@docusaurus/Link';
import Switch from '@material-ui/core/Switch';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

function getMetadata(symbol, name, decimals, description, iconUri) {
  const obj = {
    symbol: symbol,
    name: name,
    decimals: decimals,
    description: description,
    thumbnailUri: iconUri,
  };
  const res = Buffer.from(JSON.stringify(obj)).toString('hex');
  return res;
}

const DeployWidget = () => {
  const [ addr, setAddr ] = React.useState("");
  const [ totalsupply, setTotalSupply ] = React.useState(10000000);
  const [ contract, setContract ] = React.useState("");
  const [ meta, setMeta ] = React.useState(false);
  const [ symbol, setSymbol ] = React.useState("CMPL");
  const [ name, setName ] = React.useState("Completium Token");
  const [ decimals, setDecimals ] = React.useState(1);
  const [ url, setUrl ] = React.useState("https://completium.com/img/logo_completium_128.png");
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
        code: meta ? code_with_metadata : code,
        init: meta ? getStorageWithMetadata(addr,totalsupply, getMetadata(symbol, name, decimals, "", url)) : getStorage(addr,totalsupply)
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
  const handleMeta = (event, isExpanded) => {
    setMeta(isExpanded);
  }
  const handleSymbol = (event) => {
    setSymbol(event.target.value);
  }
  const isSymbolError = () => { return false; }

  const handleName = (event) => {
    setName(event.target.value);
  }
  const isNameError = () => { return false; }

  const handleDecimals = (event) => {
    setDecimals(event.target.value);
  }
  const isDecimalsError = () => { return false; }

  const handleUrl = (event) => {
    setUrl(event.target.value);
  }
  const isUrlError = () => { return false; }
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
          <Connect main={main} setMain={setMain} />
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
        { isContractCreated()?<Contract contract={contract} main={main}/>:
          <Button
            variant="contained"
            color="primary"
            disableElevation disabled={isOriginateDisabled()}
            onClick={ originate }
          >originate</Button>}
        </Grid>
      </Grid>
      <Accordion expanded={meta} onChange={ handleMeta } style={{ backgroundColor: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography style={{ marginLeft: '10px' }}>Metadata</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} style={{ marginLeft: '0px' }}>
            <Grid item xs={6}>
            <TextField
              onChange={ handleSymbol }
              error={ isSymbolError() }
              helperText={(isSymbolError())?"Invalid Token Symbol":"Token symbol, like 'USD' for United States Dollar."}
              value={symbol}
              variant="outlined"
              color="primary"
              fullWidth required
              id="symbol"
              label="Symbol"></TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
              onChange={ handleName }
              error={ isNameError() }
              helperText={(isNameError())?"Invalid Token Name":"Token name, like 'Bitcoin' for BTC asset."}
              value={name}
              variant="outlined"
              color="primary"
              fullWidth required
              id="name"
              label="Name"></TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
              type="number"
              onChange={ handleDecimals }
              error={ isDecimalsError() }
              helperText={(isDecimalsError())?"Invalid Decimals Value":"A number of decimal places after point."}
              value={decimals}
              variant="outlined"
              color="primary"
              fullWidth required
              id="decimals"
              label="Decimals"></TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
              onChange={ handleUrl }
              error={ isUrlError() }
              helperText={(isUrlError())?"Invalid Icon URL":"Image URL for token logo."}
              value={url}
              variant="outlined"
              color="primary"
              fullWidth required
              id="url"
              label="Icon URL"></TextField>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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