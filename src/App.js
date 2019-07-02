import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

    constructor() {
        super();
        ipcRenderer.on('message-from-react-reply', (event, arg) => {
            console.log(arg);
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

    sendMessage = () => {
        ipcRenderer.send('message-from-react', 'Hello Main process :)');
    }

    render() {
        return (
            <div>
                <button onClick={ this.notifyMe }>Notify me!!</button>
                <button onClick={ this.sendMessage }>Send message to Main Process</button>
            </div>
        );
    }
}

export default App;
