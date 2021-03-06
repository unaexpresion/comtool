const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width : 800,
        height : 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    console.log(process.env.ELECTRON_START_URL)

    const starUrl = process.env.ELECTRON_START_URL
        || url.format({
            pathname : path.join(__dirname, '/../build/index.html'),
            protocol: 'file',
            slashes: true
        });

    mainWindow.loadURL(starUrl);

    mainWindow.webContents.openDevTools();

    mainWindow.on('close', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('active', () => {
    if (mainWindow == null) createWindow();
});

ipcMain.on('message-from-react', (event, arg) => {
    console.log(arg)
    event.reply('message-from-react-reply', 'Hi renderer process!!')
});