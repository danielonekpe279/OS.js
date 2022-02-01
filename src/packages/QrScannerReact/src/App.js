import React from 'react';
import QrReader from 'react-qr-reader';

class Test extends React.Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    const answer = {
      color: "white",
      backgroundColor: "DodgerBlue",
      fontFamily: "Arial"
    };

    return (
      <div>
        <QrReader
          delay={0}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '90%' }}
        />

        <p style={answer}>Decoded QR Code: {this.state.result}</p>
      </div>
    )
  }
}

export default Test;