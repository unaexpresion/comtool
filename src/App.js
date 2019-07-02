import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

    constructor() {
        super();
        ipcRenderer.on('ipcResponse', (event, arg) => {
            console.log(arg);
            console.log(event);
        });
    }

    componentDidMount = () => {
        this.notifyMe();
    }

    notifyMe = () => {
        Notification.requestPermission().then(result => {
            let notification = new Notification('My Notification', {
                'body' : 'This is a notification',
                'icon' : 'https://placekitten.com/300/300'
            })

            notification.onclick = () => {
                console.log("notification was clicked");
            }
        });
    }

    executeAnotherThing = () => {
        ipcRenderer.send('execute-another-thing', 'hola');
    }

    render() {
        return (
            <div>
                <button onClick={ this.notifyMe }>Notify me!!</button>
                <button onClick={ this.executeAnotherThing }>Execute another thing</button>
            </div>
        );
    }
}

export default App;
