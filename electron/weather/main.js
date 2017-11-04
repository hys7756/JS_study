var electron = require('electron');
var url = require('url');
var path = require('path');

var message = require('./message').message;

var BrowserWindow = electron.BrowserWindow;
var Tray = electron.Tray;
var app = electron.app;
var Menu = electron.Menu;

var imageDirectory = path.join(__dirname, 'img');
var window, tray;

var windowSize = {
    width: 400,
    height: 350
};

app.on('ready', () => {
    createTray();
    createWindow();
});

function getWindowPosition() {
    var offsetX = 150;
    var macOffsetY = 5;

    var positionX = process.platform == "win32" ? tray.getBounds().x - offsetX : tray.getBounds().x - offsetX;
    var positionY = process.platform == "win32" ? tray.getBounds().y - windowSize.height : tray.getBounds().y + macOffsetY;

    return {
        x: positionX,
        y: positionY
    }
}

function createWindow() {
    var position = getWindowPosition();

    window = new BrowserWindow({
        x: position.x,
        y: position.y,
        width: windowSize.width,
        height: windowSize.height,
        movable: false,
        focusable: false,
        frame: false,
        icon: path.join(imageDirectory, 'ico_wg1.jpg')
    });

    window.loadURL(path.join('file://' + __dirname, 'index.html'));
    window.setMenu(null);
    window.hide();

    window.on('blur', () => {
        window.hide();
    });
}

function createTray() {
    tray = new Tray(path.join(imageDirectory, 'ico_wg1.jpg'))
    tray.setToolTip(message.tooltip);

    var contextMenu = Menu.buildFromTemplate([{
        label: message.close_menu,
        click (item) {
            if (item.label === message.close_menu) {
                window.close();
            }
        }
    }]);
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (window.isVisible()) {
            window.hide();
        } else {
            window.show();
        }
    });
}