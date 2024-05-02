const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');
const createMenuTemplate  = require('./src/core/menuTemplate');
const APP_ENV = process.env.APP_ENV || 'development'; 

if (APP_ENV === 'development') { 
    require('electron-reload')(__dirname, { 
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'), 
        hardResetMethod: 'exit'
    }); 
}

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(createMenuTemplate (mainWindow));
    Menu.setApplicationMenu(mainMenu);

    // Set update feed URL
    autoUpdater.setFeedURL({
        provider: 'github',
        repo: 'https://github.com/Muhammad-Sarfaraz/Bonfire',
        owner: 'Muhammad-Sarfaraz',
        releaseType: 'release'
    });

    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        message: 'A new update is available. Do you want to download and install it now?',
        buttons: ['Yes', 'No']
    }).then((response) => {
        if (response.response === 0) {
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        message: 'Update downloaded. It will be installed on restart. Restart now?',
        buttons: ['Yes', 'No']
    }).then((response) => {
        if (response.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
});
