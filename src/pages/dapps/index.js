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

const dapps = [
  { name: 'miles', title: 'Fidelity program', img:'streamline-icon-takeoff-ticket.svg', chips:['Marketing'], text:'Customers of a service (transport, gaming, grocery, ...) receive miles and trade them in for gifts, cash-back, or any kind of reward.' },
  { name: 'iot', title: 'Connected object', img:'streamline-icon-phone-app-idea.svg', chips:['IoT'], text:'Switch on for a certain duration or interrupt an online bulb connected to a Tezos smart contract, by transferring fund to this smart contract.' },
  { name: 'ideabox', title: 'Idea box', img:'streamline-icon-idea-box.svg', chips:['Governance'], text:'An online retail company provides an ideabox for customers and/or employees to post ideas to improve customer experience.' },
  { name: 'game', title: '2048 competition', img:'streamline-icon-programming-module.svg', chips:['Gaming','Oracle'], text:'Win the competition of the famous 2048 game by sliding numbered tiles that pops up at random position on the grid and obtain the highest score.' },
  { name: 'escrow', title: 'Online purchase', img:'streamline-icon-customize-shirt-browser.svg', chips:['Escrow','Payment','DeFi'], text:'An online retailer provides a decentralized process to transfer payment from buyer to seller without the need for a third party.' },
  { name: 'nonfungible', title: 'Collectible cards', img:'streamline-icon-card-poker.svg', chips:['Token','DeFi','Gaming'], text:'The cryptobot company is issuing a hundred collectible robot cards. Build your optimal card deck by buying and selling them online!' },
  { name: 'dex', title: 'Dex', img:'streamline-icon-currencies-exchange.svg', chips:['Token','DeFi'], text:'A Decentralized Exchange (DEX) enbable customers to trade cryptocurrencies without the need for an intermediary.' },
  { name: 'zcb', title: 'Zero coupon bond', img:'streamline-icon-contract-handshake.svg', chips:['Legal','Payment','DeFi'], text:'Use your company’s online DeFi solution to deploy a templated Zero Coupon bond contract on the Tezos blockchain for your customers.' },
  { name: 'bids', title: 'Auction', img:'streamline-icon-gavel.svg', chips:['Governance'], text:'Participate in an blockchain-powered online auction of exceptional rare paintings and don’t forget to overbid! (coming soon ...)' },
]

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: '300px',
    backgroundColor: '#101010',
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
          image={useBaseUrl('img/'+props.img)}
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

function getxspan(width) {
  if (width <= 650) {
    return 12;
  } else if (width <= 950) {
    return 6;
  } else {
    return 4;
  }
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
              Dapps presented below are potential real-life applications that illustrate how to leverage the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain technology to create a new generation of game-changing applications. Tezos is a powerfull self-amending blockchain that comes with a rich technical ecosystem. Click button below to discover the technical stack used to developp these DApps.
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: '60px' }}>
            <Button component={Link} to={useBaseUrl('docs/dapp-tools/')} variant='outlined' size='large'>
              Technical Stack
            </Button>
          </Grid>
          <Grid item>
            <Grid container direction='row' spacing={4} justify="center" alignItems="center">
              { dapps.map(dapp => <Grid item md={4} sm={6} xs={12}>
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