import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function DappFigure(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img alt="Docusaurus with Keytar" style={{
          width: props.width,
          paddingTop: '40px',
          paddingBottom: '40px',
        }} src={useBaseUrl('img/'+props.img)} />
    </div>
  )
}

export default DappFigure;