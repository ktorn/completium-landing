import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const dapps = [
  { name: 'miles' },
  { name: 'iot' },
  { name: 'game' },
]

function Dapps() {
  return(
    <Grid container direction='column'  justify="center" alignItems="center" spacing={4}>
      <Grid item>
        <Typography variant='h3'>Learn Dapps</Typography>
      </Grid>
      { dapps.map(d => {
        return (
          <Grid item>
            <Button component={Link} color='primary' to={useBaseUrl('docs/dapp-'+d.name+'/')} variant='outlined'>{d.name}</Button>
          </Grid>
        )
      }) }
    </Grid>
  )
}

export default Dapps;