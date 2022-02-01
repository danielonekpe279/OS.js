import React from 'react';
import QRCode from 'react-qr-code';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <QRCode size="400" value= "https://www.youtube.com/channel/UCcLu36AHjFnMzOgevKc70tg"/> 
        <br></br>
        <div>The QR code value is a link to all the audiobook you can get</div>
      </div>
    );
  }
}