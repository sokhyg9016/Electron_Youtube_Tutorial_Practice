const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', ()=>
{
    //Create New Window
    mainWindow = new BrowserWindow({});

    //Load HTML File into Window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //This is Complete form --> 'loadURL(..)'
    // -> file://dirname/mainWindow.html

    //Quit App When Closed
    mainWindow.on('closed', ()=>
    {
        app.quit();     
    });

    
    // Build Menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert Menu
    Menu.setApplicationMenu(mainMenu);

});

//Handle create add window
function createAddWindow()
{
    //Create New Window
    
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });

    //Load HTML File into Window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage Colletion handle
    addWindow.on('close', ()=>
    {
        addWindow = null;
    })

}


//Create Menu Template
const mainMenuTemplate = [
    {
        label:'File', 
        submenu:[
            {
                label: 'Add Item',
                accelerator: process.platform == 'darwin' ? 'Command+T' : 
                'Ctrl+Shift+A',
                click()
                {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit', 

                //Add Shortcut
                //*If your Platform is MacOS, you clicked 'Command + Q' to quit the application
                // else, you can quit the application to click 'Ctrl + Q'
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 
                'Ctrl+Q',
                click()
                {
                    //Quit the application.
                    app.quit();
                }
            }
        ]
    }
];