import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Deploy = (props) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiStepIcon: {
           root: {
             '&$completed': {
               color: '#ca7c1b',
             },
             '&$active': {
               color: '#ed9222',
             },
           },
           active: {},
           completed: {},
         }
        },
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
  return (<ThemeProvider theme={theme}>
    <Card style={{ backgroundColor: 'transparent', border: '1px solid #606770', marginTop: '20px', marginBottom: '20px' }} raised={false}>
      <Grid container style={{ padding: 22 }} spacing={3}>
        <Grid item xs={7}>
          <TextField variant="outlined" color="primary" fullWidth required id="initalholder" label="Initial Holder"></TextField>
        </Grid>
        <Grid item xs={7}>
          <TextField variant="outlined" color="primary" fullWidth required id="totalsupply" label="Total Supply"></TextField>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" disableElevation >originate</Button>
        </Grid>
      </Grid>
    </Card>
  </ThemeProvider>
  )
}

export default Deploy;