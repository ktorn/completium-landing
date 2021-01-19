import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

function DappButton(props) {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [true],
  );
  return (
    <div style={{ textAlign: 'center', paddingTop: '0px', paddingBottom: '40px' }}>
    <ThemeProvider theme={theme}>
      {(props.internal)? (
        <Button variant='outlined' size='large' component={Link} to={useBaseUrl('docs/'+ props.url +'/')}>
        {props.txt}
      </Button>
      ): (
      <Button variant='outlined' size='large' onClick={() => window.open(props.url, "_blank")}>
        {props.txt}
      </Button>
      )}
    </ThemeProvider>

    </div>
  )
}

export default DappButton;