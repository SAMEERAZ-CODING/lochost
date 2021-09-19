const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const url = require("url");
const express = require("express");
const appe = express();

app.disableHardwareAcceleration();

app.allowRendererProcessReuse = true;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,

    // Dislable the system frame
    // frame : false,

    icon: path.join(__dirname, "build", "icon.png"),
    menu: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Choose the folder with your code
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app", "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  win.removeMenu();

  // Let the user to resize the windows
  win.resizable = false;

  win.on("closed", () => {
    win = null;
  });

  // When a link is oppenned on new window, it's oppen on default browser
  win.webContents.on("new-window", function (evt, url) {
    evt.preventDefault();
    shell.openExternal(url);
  });
}

ipcMain.on("startserver", (event, arg, arg3) => {
  console.log(arg, arg3);
  appe.use(express.static(arg));
  appe.listen(arg3, () => {
    console.log(`Your Application Is Running on ${arg3}.`);
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
