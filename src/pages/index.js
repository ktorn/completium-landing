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
import { Parallax, Background } from "react-parallax";
import Container from '@material-ui/core/Container';

function Banner() {
  const { width: width } = useWindowDimensions();
  return (
    <Grid container direction='row' justify="center" alignItems="center" style={{
      height: '380px',
      width: '100%',
      backgroundImage: "linear-gradient(rgba(0 0 78 / 34%), rgba(178 189 77 / 41%))",
/*       backgroundImage: "linear-gradient(rgba(0 0 78 / 34%), rgba(178 189 77 / 41%)), url("+useBaseUrl('img/banner2.svg')+")",
 */
      backgroundRepeat: 'repeat-x'
      }}>
      <Grid item xs={0} style={{ height: '30px' }}/>
      <Grid item xs={1}> <Typography component={Link} to={useBaseUrl('docs/')}>Docs</Typography> </Grid>
      <Grid item xs={11}> <Typography component={Link} to={useBaseUrl('blog/')}>Blog</Typography> </Grid>
      <Grid item xs={12}><Divider color='textSecondary'></Divider></Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h2' style={{ fontFamily : 'Alegreya Sans SC, sans-serif', marginTop: '40px' }}>Completium</Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h5' style={{ fontFamily : 'Alegreya Sans SC, sans-serif' }}>From conception to completion</Typography>
      </Grid>
      <Grid item style={{textAlign: 'center', marginTop: '80px'}}>
        <Typography variant='h6'>Dapp design and implementation, smart contract verification</Typography>
      </Grid>
    </Grid>
  )
}

function Illustration(props) {
  return (
    <div style={{ width: props.size, height: props.size, position: 'relative', justifySelf: 'center', }}>
        <div style={{
          width: '90%',
          height: '90%',
          backgroundColor: 'black',
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
    <Grid container direciton='row' justify="center" alignItems="center" style={{ marginBottom: '40px' }}>
      <Grid item xs={12} style={{ display: 'grid' }}>
        <Illustration size='250px' name={props.name}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>{props.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{props.text}</Typography>
      </Grid>
    </Grid>
  )
}

function LearnDapps() {
  return (
    <Grid container direction='row' justify="center" alignItems="center" style={{ padding: '50px' }}>
      <Grid item xs={12} style={{ textAlign: 'center'}}>
        <Typography variant='h4' style={{ fontWeight: 'bold', marginBottom: '12px' }}>
          Want to know everything about Dapps?
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography>
          Discover how Dapps work through examples covering real life domains: Defi, Governance, Gaming, ...
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Grid container direction='row' justify="center" alignItems="center" style={{ width: '100%',  paddingTop: '60px' }}>
          <Grid item md={1} sm={0} xs={0}></Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Feature name='undraw_annotation' title='Documented Use Cases' text='Read and learn about Dapps business logic and how it impacts technical architecture.'/>
          </Grid>
          <Grid item md={1} sm={0} xs={0}></Grid>
          <Grid item md={2} sm={12} xs={12} style={{ textAlign: 'center' }}>
            <Feature name='undraw_setup_wizard' title='Step by Step Tutorials' text='Follow step by step instructions to implement, deploy and interact with smart contracts, connect the Dapp to a wallet, ...'/>
          </Grid>
          <Grid item md={1} sm={0} xs={0}></Grid>
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
      backgroundRepeat: 'repeat-x' }}>
      <Grid item xs={12} style={{ display: 'contents', textAlign: 'center' }}>
        <img src={useBaseUrl('img/archetype.svg')} style={{ width: '300px', marginRight: '60px', marginBottom: '20px' }}></img>
        <Typography variant='h5' style={{ fontWeight: 'bold', marginBottom: '20px' }}>
            The easiest way to write safe <span style={{ color: '#21C6BE' }}>smart contracts</span>
        </Typography>
      </Grid>
      <Grid item>

      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Grid container direction='row' justify="center" alignItems="center" style={{ width: '100%', paddingTop: '40px' }}>
          <Grid item md={1} sm={0} xs={0}></Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Feature name='undraw_code_thinking' title='High-Level DSL' text='Implement blockchain logic with easy to write and read high-level programming concepts.'/>
          </Grid>
          <Grid item md={1} sm={0} xs={0}></Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Feature name='undraw_Security_on' title='Formal Verification' text='Write formal specification and let Archetype check whether the contract verifies it.'/>
          </Grid>
          <Grid item md={1} sm={0} xs={0}></Grid>
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
    <Grid container direction='column' justify="center" alignItems="center" style={{ padding: '50px' }}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          Nice to meet you! <EmojiEmotionsIcon fontSize="large" style={{  verticalAlign: 'bottom' }}/>
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction='row' justify="center" alignItems="center" style={{ paddingTop: '80px', paddingBottom: '50px' }} spacing={4}>
          <Grid item md={2} sm={12} xs={12}>
            <Typography align='justify'>Benoit and Guillaume created edukera  in 2013 for the passion of sharing and teaching science and technology. In 2017 they became enthousiastic for the blockchain technology and in 2018 started to develop the Archetype language with the support of the Tezos Foundation. </Typography>
          </Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Avatar portrait='br' name='Benoît Rognier' title='CEO edukera' url="benoitrognier"/>
          </Grid>
          <Grid item md={2} sm={12} xs={12}>
            <Avatar portrait='gd' name='Guillaule Duhamel' title='CTO edukera' url="guillaumeduhamel"/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ textAlign: 'center' }}>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>Can we help you achieve your objective?</Typography>
      </Grid>
      <Grid item style={{ width: '70%' }}>
        <Grid container direction='row' justify="center" alignItems="center" style={{  padding: '20px' }}>
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
        <Grid container direction='row' justify="center" alignItems="center" spacing={6} style={{ marginTop: '10px', padding: '40px' }}>
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
  const [loaded, setLoaded] = React.useState(false);
  const { width } = useWindowDimensions();
  var scalef = 2;
  if (width <= 1000) {
    scalef = 5;
  }
  React.useEffect(() =>
    setLoaded(true)
  ,[])
  return (
      <Container style={{ paddingLeft: 0, paddingRight: 0, maxWidth: '100%' }}>
      <Grid container direction="row" justify="center" alignItems="center" style={{ width: '100%' }}>
        <Grid item xs={12}>
          <Parallax strength={400}>
            <Background>
              <img src={useBaseUrl('img/banner2.svg')} style={{ transform: 'scale('+scalef+')'}}/>
            </Background>
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
      </Container>
  )
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
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
  return (
    <ThemeProvider theme={theme}>
      <Scrollable />
    </ThemeProvider>
  );
}

export default Home;
