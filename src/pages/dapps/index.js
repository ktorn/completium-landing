import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

import Container from '@material-ui/core/Container';

const dapps = [
  { name: 'miles' },
  { name: 'iot' },
  { name: 'game' },
]

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
          <Grid item>
            <Typography variant='h3' style={{ marginTop: '40px' }}>Learn to developp Dapps</Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6' style={{ paddingTop: 0 }}>with examples</Typography>
          </Grid>
          <Grid item>
            <img src={useBaseUrl('/img/undraw_code_review.svg')} style={{ width: '300px' }}></img>
          </Grid>
          <Grid item>
            <Typography>
              Dapps presented below are potential real-life applications that illustrate how to leverage the Tezos blockchain technology to create a new generation of game-changing applications. Tezos brings some key new features and comes with a rich technical ecosystem.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='outlined' size='large'>
              Learn about Tezos
            </Button>
          </Grid>
          { dapps.map(d => {
            return (
              <Grid item>
                <Button component={Link} to={useBaseUrl('docs/dapp-'+d.name+'/')} variant='outlined'>{d.name}</Button>
              </Grid>
            )
          }) }
        </Grid>
      </Container>
      </ThemeProvider>
    </Layout>
  )
}

export default Dapps;