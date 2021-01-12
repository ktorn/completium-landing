
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function DappIcon(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img alt="Docusaurus with Keytar" style={{
          width: '55%',
          marginTop: '60px'
        }} src={useBaseUrl('img/'+props.img+'.svg')} />
    </div>
  )
}

export default DappIcon;