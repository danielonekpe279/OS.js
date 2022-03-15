import React, { Component } from 'react';
import axios from 'axios';
import QrReader from 'react-qr-reader';

export default class App extends Component {
    constructor(props)
    {
        super(props);
        this.check = this.check.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.handleModuleChange = this.handleModuleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            result : 'No result',
            appSTATE : 'Verification',
            currentID : null,
            currentOTP : null,
            venue : 'eolaslab1',
            module : '',
        }
    }

    check(id, otp)
    {
        const regular = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9]*[a-zA-Z0-9]$');
        if(id.length == 24 && otp.length == 12 && regular.test(id) && regular.test(otp)) return true;
        return false;
    }

    handleError = err => {
        console.log(err);
        this.setState({appState : 'Error'});
    }

    handleScan = data => {
        if(data)
        {
            const [id, otp] = data.split('/');
            if(this.check(id, otp) == true)
            {
                this.setState({appSTATE: 'Result', currentID: id, currentOTP: otp});
            }

            else
            {
                this.handleError();
            }
        }
    }

    handleVenueChange(event)
    {
        this.setState({venue: event.target.value});
    }

    handleModuleChange(event)
    {
        this.setState({module: event.target.value});
    }

    handleSubmit(event)
    {
        event.preventDefault();
        const data = 
        {
            module : this.state.module,
            venue : this.state.venue,
            otp: this.state.currentOTP,
            id : this.state.currentID,
        };

        axios.put('/apps/QrScannerReact/update-otp', data)
        .then(response => {
            console.log(response);
            this.setState({appSTATE : 'Verification'});
        })
        .catch((error) => {
            this.setState({appSTATE: 'Error'})
        })
    }

    render(){
        const appState = this.state.appSTATE;
        let view;

        if(appState === "Verification")
        {
            view = <QrReader
            delay={0}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
            />
        }

        else if(appState === "Result")
        {

            view =  <form onSubmit={this.handleSubmit}>
                    <label>
                        What room are you in? 
                        <select value={this.state.venue} onChange={this.handleVenueChange}>            
                            <option value="eolaslab1">Eolas Lab 1</option>
                            <option value="eolaslab2">Eolas Lab 2</option>
                            <option value="callanlab1">Callan Lab 1</option>
                            <option value="callanlab2">Callan Lab 2</option>
                        </select>
                    </label>

                    <label>
                        What module is going on in this room?
                        <input type="text" value={this.state.module} onChange={this.handleModuleChange} />
                    </label>
                    <input type="submit" value="Verify now!!" />
                </form>
        }

        else
        {
            view = <div>
                <h1>An error occured during scanning</h1>
                <button onClick={() => {this.setState({appState : 'Verification'})}}>Keep Scanning</button>
            </div>
        }
        console.log(view);
        return(
            <div>
                {view}
            </div>
        );
    }
}