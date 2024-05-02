const { app, BrowserWindow, Menu, shell, dialog } = require("electron");

const createMenuTemplate = (mainWindow) => {
  return [
    {
      label: "File",
      submenu: [{ role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Ctrl+R',
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: "Toggle Full Screen",
          accelerator: "F11",
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          },
        },
        { type: "separator" },
       
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About Bonfire",
          click() {
            dialog.showMessageBox({
              type: "info",
              message: `XApp Version: ${app.getVersion()}\n\nCopyright © 2024xy Sarfaraz Muhammad Sajib `,
              buttons: ["OK"],
            });
          },
        },
        {
          label: "View Project on GitHub",
          click() {
            shell.openExternal("https://github.com/Muhammad-Sarfaraz/Bonfire");
          },
        },
      ],
    },
  ];
};

module.exports = createMenuTemplate;
