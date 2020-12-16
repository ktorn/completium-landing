import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Divider from '@material-ui/core/Divider';
import useWindowDimensions from '../utils/WindowDimension';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Parallax } from "react-parallax";

function Banner() {
  const { width: width } = useWindowDimensions();
  return (
    <Grid container direction='column' justify="center" alignItems="center" style={{
      height: '380px',
      backgroundImage: "linear-gradient(rgba(0 0 78 / 34%), rgba(178 189 77 / 41%))",
/*       backgroundImage: "linear-gradient(rgba(0 0 78 / 34%), rgba(178 189 77 / 41%)), url("+useBaseUrl('img/banner2.svg')+")",
 */
      backgroundSize: width+'px',
      backgroundRepeat: 'repeat-x'
      }}>
      <Grid item style={{ position: 'relative', top: '-10px' }}>
        <Grid container direction='row' justify="flex-start" alignItems="center" spacing={6} style={{ width: width }}>
          <Grid item>
              <Typography component={Link} to={useBaseUrl('docs/')}>Docs</Typography>
          </Grid>
          <Grid item>
            <Link to={useBaseUrl('blog/')}>
              <Typography>Blog</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item><Divider color='textSecondary' style={{ width: width+'px' }}></Divider></Grid>
      <Grid item>
        <Typography variant='h2' style={{ fontFamily : 'Alegreya Sans SC, sans-serif', marginTop: '60px' }}>Completium</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h5' style={{ fontFamily : 'Alegreya Sans SC, sans-serif' }}>From conception to completion</Typography>
      </Grid>
      <Grid item style={{textAlign: 'center', marginTop: '100px'}}>
        <Typography>We create <span style={{ fontWeight: 'bold'}}>Dapps</span> from off-chain application (front&back-ends)<br/> to verified smart contracts</Typography>
      </Grid>
    </Grid>
  )
}

function Illustration(props) {
  return (
    <div style={{ width: props.size, height: props.size, position: 'relative', textAlign: 'center' }}>
        <div style={{
          width: '90%',
          height: '90%',
          backgroundColor: '#212121',
          borderRadius: '100%',
          position: 'absolute',
          bottom: '5%',
          right: '5%' }} />
        <img src={useBaseUrl('img/'+ props.name + '.svg')} style={{
          width: '90%',
          position: 'absolute',
          bottom: '15%',
          right: '5%'
        }}></img>
    </div>
  )
}

function Feature(props) {
  return (
    <Grid container direciton='column' justify="center" alignItems="center">
      <Grid item>
        <Illustration size='250px' name={props.name}/>
      </Grid>
      <Grid item>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>{props.title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{props.text}</Typography>
      </Grid>
    </Grid>
  )
}

function LearnDapps() {
  return (
    <Grid container direction='row' justify="center" alignItems="center" style={{ padding: '50px' }} spacing={3}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          Want to know everything about Dapps?
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography>
          Discover how Dapps work through examples covering real life domains: Defi, Governance, Gaming, ...
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Grid container direction='row' justify="center" alignItems="center" style={{ width: '100%' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Feature name='undraw_annotation' title='Documented Use Cases' text='Read and learn about Dapps business logic and how it impacts technical architecture.'/>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <Feature name='undraw_setup_wizard' title='Step by Step Tutorials' text='Follow step by step instructions to implement, deploy and interact with smart contracts, connect the Dapp to a wallet, ...'/>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Button component={Link} to={useBaseUrl('dapps')} variant='outlined' size='large'>Learn Dapps</Button>
      </Grid>
    </Grid>
  )
}

function Archetype() {

  return (
    <Grid container direction='row' justify="center" alignItems="center" style={{ padding: '50px',
      backgroundImage: "linear-gradient(rgb(15 39 89 / 1), rgba(178 189 77 / 0%))",
      backgroundRepeat: 'repeat-x' }} spacing={3}>
      <Grid item xs={12} style={{ display: 'contents' }}>
      <img src={useBaseUrl('img/archetype.svg')} style={{ width: '300px', marginRight: '60px' }}></img><Typography variant='h5' style={{ fontWeight: 'bold' }}>
          The easiest way to write safe <span style={{ color: '#21C6BE' }}>smart contracts</span>
        </Typography>
      </Grid>
      <Grid item>

      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Grid container direction='row' justify="center" alignItems="center" style={{ width: '100%' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Feature name='undraw_code_thinking' title='High-Level DSL' text='Implement blockchain logic with easy to write and read high-level programming concepts.'/>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Feature name='undraw_Security_on' title='Formal Verification' text='Write formal specification and let Archetype check whether the contract verifies it.'/>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button variant='outlined' size='large'>Discover Archetype</Button>
      </Grid>
    </Grid>
  )
}

function Avatar(props) {
  return (
    <div style={{ display: 'grid', alignItems: 'baselinecenter', justifyContent: 'center', textAlign: 'center' }}>
      <img src={useBaseUrl('img/'+props.portrait+'.jpg')} style={{
        width: '100px',
        borderRadius: '100%',
        justifySelf: 'center',
        marginBottom: '20px',
        border: 'px solid #4a4a4a' }}></img>
      <Typography style={{ fontWeight: 'bold' }}>{props.name}
        <Link target="_blank" rel="noopener" href={"https://www.linkedin.com/in/"+props.url+"/"} underline='none'>
          <LinkedInIcon style={{ verticalAlign: 'bottom', marginLeft: '10px'}}/>
        </Link>
      </Typography>
      <Typography>{props.title}</Typography>
    </div>
  )
}

function Service() {
  return (
    <Grid container direction='column' justify="center" alignItems="center" style={{ padding: '50px' }} spacing={4}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          Nice to meet you! <EmojiEmotionsIcon fontSize="large" style={{  verticalAlign: 'bottom' }}/>
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction='row' justify="center" alignItems="center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <Grid item xs={2}>
            <Typography align='justify'>Benoit and Guillaume created edukera  in 2013 for the passion of sharing and teaching science and technology. In 2017 they became enthousiastic for the blockchain technology and in 2018 started to develop the Archetype language with the support of the Tezos Foundation. </Typography>
          </Grid>
          <Grid item xs={2} >
            <Avatar portrait='br' name='Benoît Rognier' title='CEO edukera' url="benoitrognier"/>
          </Grid>
          <Grid item xs={2}>
            <Avatar portrait='gd' name='Guillaule Duhamel' title='CTO edukera' url="guillaumeduhamel"/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>Can we help you achieve your objective?</Typography>
      </Grid>
      <Grid item style={{ width: '70%' }}>
        <Grid container direction='row' justify="center" alignItems="center">
          <Grid item>
            <EmailIcon style={{ marginRight: '20px', verticalAlign: 'bottom' }}/>
          </Grid>
          <Grid item>
            <Typography>contact@edukera.com</Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item>
            <PhoneIcon style={{ marginRight: '20px', verticalAlign: 'bottom' }}/>
          </Grid>
          <Grid item>
            <Typography>+33 6 18 40 30 62</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='h4' style={{ fontWeight: 'bold', marginTop: '70px' }}>Advisory board</Typography>
      </Grid>
      <Grid item>
        <Grid container direction='row' justify="center" alignItems="center" spacing={6} style={{ marginTop: '10px' }}>
          <Grid item>
            <Avatar portrait='dofp' name='Diego Olivier Fernandez Pons' title='Business Advisor' url="diego-olivier-fernandez-pons"/>
          </Grid>
          <Grid item>
            <Avatar portrait='pys' name='Pierre-Yves Strub' title='Scientific Advisor' url="pierre-yves-strub-9822506"/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Scrollable() {
  const [loaded,setLoaded] = React.useState(false);
  const { height } = useWindowDimensions();
  var thisnode = null;
  if (typeof document !== 'undefined') {
    thisnode = document.getElementById("scrollable");
  }
  React.useEffect(() => (
    setLoaded(true)
  ),[]);
  return (
    <div id="scrollable" style={{ height: height, overflow: 'scroll' }} >
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Parallax bgImage={useBaseUrl('img/banner2.svg')} strength={500} parent={thisnode}>
            <Banner />
          </Parallax>
        </Grid>
        <Grid item xs={12}><Divider></Divider></Grid>
        <Grid item xs={12}>
          <LearnDapps />
        </Grid>
        <Grid item xs={12}><Divider></Divider></Grid>
        <Grid item xs={12}>
          <Archetype />
        </Grid>
        <Grid item xs={12}><Divider></Divider></Grid>
        <Grid item xs={12}>
          <Service />
        </Grid>
      </Grid>
      </div>
  )
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  var prefersDarkMode = true;
  console.log(`from index: ${useBaseUrl('docs/')}`);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Scrollable />
    </ThemeProvider>
  );
}

export default Home;
