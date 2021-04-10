import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import useBaseUrl from '@docusaurus/useBaseUrl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@docusaurus/Link';

const sections = {
  fungible: {
    title: "Fungible Token",
    subtitle: "Fungible tokens can be exchanged among individuals for trading, sale and purchase of goods and services.",
    image: "img/template_ft.svg",
    items: [
      { name: "Tezos Fungible Token", desc: "FA 1.2 specification for Tezos Fungible Token.", to: "/docs/templates/fa12" },
      { name: "ERC20", desc: "Transcription to Tezos World of Ethereum ERC20 norm.", to: "/docs/templates/erc20" },
    ]
  },
  nft: {
    title: "NFT",
    subtitle: "A Non-Fungible Token is a unit of data on a digital ledger called a blockchain, where each NFT can represent a unique digital item. NFTs can represent digital files such as art, audio, videos, items in video games and other forms of creative work. ",
    image: "img/template_nft.svg",
    items: [
      { name: "Tezos NFT", desc: "FA 2 specification for Tezos Non Fungible Token", to: '/docs/templates/nft' },
    ]
  },
  defi: {
    title: "DeFi",
    subtitle: "DeFi is short for “decentralized finance”, an umbrella term for a variety of financial applications toward disrupting financial intermediaries.",
    image: "img/template_defi.svg",
    items: [
      { name: "DEX", desc: "A Uniswap-like decentralized exchange.", to: "/docs/templates/dex" },
      { name: "ICO", desc: "An example of ICO process.", to: "/docs/templates/ico" },
      { name: "Zero-Coupon Bond", desc: "A transcription to Tezos of a Zero-Coupon bond.", to: "/docs/templates/zcb" },
      { name: "Autocallable note", desc: "A transcription to the Tezos blockchain of an auto-callable note from Goldman Sachs.", to: "/docs/templates/acn" },
    ]
  },
  payment: {
    title: "Payment",
    subtitle: "Implement decentralised payment process for retail with the blockchain.",
    image: "img/template_payment.svg",
    items: [
      { name: "Escrow", desc: "Escrow the purchase amount and transfer it to seller under conditions.", to: "/docs/templates/escrow" },
      { name: "Miles", desc: "Collect and consume miles.", to: "/docs/templates/miles" },
    ]
  },
  governance: {
    title: "Governance",
    subtitle: "Blockchain traceability and immutability makes it especially suitable for process whose goal is to establish a consensus.",
    image: "img/template_governance.svg",
    items: [
      { name: "Idea Box", desc: "Collect and determine best ideas to improve a process.", to: '/docs/templates/ideabox' },
      { name: "Competition", desc: "Collect submissions and declare the best one.", to: '/docs/templates/competition' },
      { name: "Auction", desc: "Collect bids and determine the winner.", to: '/docs/templates/auction' },
    ]
  },
  insurance: {
    title: "Insurance",
    subtitle: "Disrupt Insurance industries with a decentralised open process which escrows insurance premiums.",
    image: "img/template_insurance.svg",
    items: [
      { name: "Health Care", desc: "Organise consultations and transfer health care premiums to doctors.", to: '/docs/templates/healthcare' },
      { name: "Fizzy", desc: "Archetype transcription of IRL insurance use case.", to: '/docs/templates/fizzy' }
    ]
  }
}

function TemplateSection (props) {
  const section = sections[props.data];
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [true],
  );
  return (<ThemeProvider theme={theme}>
  <Card style={{ marginBottom: '40px', backgroundColor: 'transparent', border: '1px solid #606770', paddingBottom: '8px' }}>
    <Grid container>
      <Grid item xs={8}>
        <Grid container spacing={3} direction="column" justify="center" alignItems="flex-start" style={{ padding: '22px' }}>
          <Grid item>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>{section.title}</Typography>
          </Grid>
          <Grid item>
            <Typography>{section.subtitle}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <img alt="Docusaurus with Keytar" style={{
          width: '65%',
          paddingTop: '0px',
        }} src={useBaseUrl(section.image)} />
      </Grid>
      <Grid item xs={12}>
        <Divider></Divider>
      </Grid>
      <Grid item xs={12}>
      <List component="nav">
      { section.items.map(item =>
        <ListItem button divider component={Link} to={useBaseUrl(item.to)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography style={{ fontWeight: 'bold', marginLeft: '8px' }}>{item.name}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{item.desc}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      ) }
      </List>
      </Grid>
    </Grid>
  </Card>
  </ThemeProvider>);
}

export default TemplateSection;