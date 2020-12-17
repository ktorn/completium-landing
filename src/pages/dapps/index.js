import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

import Container from '@material-ui/core/Container';

import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import useWindowDimensions from '../../utils/WindowDimension';


const dapps = [
  { name: 'miles', title: 'Fidelity program', img:'streamline-icon-takeoff-ticket.svg', chips:['Marketing'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'iot', title: 'Connected bulb', img:'streamline-icon-phone-app-idea.svg', chips:['IoT'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'ideabox', title: 'Idea box', img:'streamline-icon-idea-box.svg', chips:['Governance'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'game', title: '2048 competition', img:'streamline-icon-programming-module.svg', chips:['Gaming','Governance'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'escrow', title: 'Online purchase', img:'streamline-icon-customize-shirt-browser.svg', chips:['Escrow','Payment','DeFi'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'nonfungible', title: 'Collectible cards', img:'streamline-icon-card-poker.svg', chips:['Token','DeFi','Gaming'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'dex', title: 'Dex', img:'streamline-icon-currencies-exchange.svg', chips:['Token','DeFi'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'zerocoupon', title: 'Zero coupon bond', img:'streamline-icon-contract-handshake.svg', chips:['Contract','Payment','DeFi'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { name: 'bid', title: 'Bids', img:'streamline-icon-gavel.svg', chips:['Governance'], text:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
]

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: '300px',
    backgroundColor: 'black',
    border: '2px solid #3e3e3e',
  },
  media: {
    height: 250,
    backgroundSize: '70%'
  },
});


function Dapp(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={useBaseUrl('docs/dapp-'+ props.name +'/')} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image={'/static/img/'+props.img}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
          <div style={{ marginTop: '20px' }}></div>
          { props.chips.map(chip => <Chip style={{ marginRight: '8px' }} variant='outlined' label={chip}/>) }
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function Dapps() {
  var prefersDarkMode = true;
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  const { width: width } = useWindowDimensions();
  var xspan = 4;
  if (width <= 650) {
    xspan = 12;
  } else if (width <= 950) {
    xspan = 6;
  } else {
    xspan = 4;
  }
  console.log(xspan);
  return(
    <Layout>
      <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container direction='column'  justify="center" alignItems="center" spacing={4}>
          <Grid item style={{ textAlign: 'center' }}>
            <Typography variant='h3' style={{ marginTop: '40px' }}>Learn to developp Dapps</Typography>
          </Grid>
          <Grid item style={{ paddingTop: 0 }}>
            <Typography variant='h5'>with examples</Typography>
          </Grid>
          {/* <Grid item>
            <img src={useBaseUrl('/img/undraw_code_review.svg')} style={{ width: '300px' }}></img>
          </Grid> */}
          <Grid item>
            <Typography>
              Dapps presented below are potential real-life applications that illustrate how to leverage the Tezos blockchain technology to create a new generation of game-changing applications. Tezos is a powerfull self-amending blockchain that comes with a rich technical ecosystem.
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: '60px' }}>
            <Button variant='outlined' size='large'>
              Learn about Tezos
            </Button>
          </Grid>
          <Grid item>
            <Grid container direction='row' spacing={4} justify="center" alignItems="center">
              { dapps.map(dapp => <Grid item xs={xspan}>
                  <Dapp name={dapp.name} img={dapp.img} title={dapp.title} text={dapp.text} chips={dapp.chips}></Dapp>
                </Grid>) }
            </Grid>
          </Grid>
          {/* <Grid item>Click on Dapp domain of interest to filter examples</Grid>
          <Grid item style={{ paddingTop: 0 }}>
            <Grid container direction='row'justify="center" alignItems="center" spacing={3} >
              <Grid item><Chip label="DeFi"/></Grid>
              <Grid item><Chip label="Gaming"/></Grid>
              <Grid item><Chip label="Token"/></Grid>
              <Grid item><Chip label="Governance"/></Grid>
              <Grid item><Chip label="Payment"/></Grid>
              <Grid item><Chip label="IOT"/></Grid>
            </Grid>
          </Grid> */}
          <Grid item style={{ marginTop: '60px', marginBottom: '60px' }}>
            <Typography>
              Each Dapp comes with several documents:
              <ul>
                <li>an introduction that explains the business issue it solves with a focus on the rationale behind the use of blockchain, and how the business logic is split between on-chain and off-chain process</li>
                <li>an open source live demo of the Dapp</li>
                <li>a user manual that presents how to use the Dapp</li>
                <li>a technical implementation that presents step-by-step instructions to implement the required interactions between the Dapp, the smart contract, and the wallet; the user is invited to test and implement these instructions in a gitpod environment.</li>
                <li>a commented presentation of the smart contract's source code</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      </ThemeProvider>
    </Layout>
  )
}

export default Dapps;