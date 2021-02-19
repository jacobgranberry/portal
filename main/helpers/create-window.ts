import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";
import Store from "electron-store";

const DEFAULT_CONFIG = {
  account: {
    accessToken: null,
    availableProfiles: [{ id: null, name: null }],
    clientToken: null,
    selectedProfile: { id: null, name: null },
    user: { id: null, username: null },
  },
};

export default (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;

  const windowStore = new Store({ name });
  const configStore = new Store({ defaults: DEFAULT_CONFIG });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {};
  let win;

  const restore = () => windowStore.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    windowStore.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  ipcMain.handle("clear-all-settings", async () => {
    await configStore.clear();
    return true;
  });

  ipcMain.handle("reset-settings", async (event, arg) => {
    if (!arg) {
      return { error: true, errorMessage: "Needs key to reset" };
    }
    const result = await configStore.reset(arg);
    return result;
  });

  ipcMain.handle("create-user", async (event, arg) => {
    const result = await configStore.set("account", arg);
    return result;
  });

  ipcMain.handle("get-all-settings", async (event, arg) => {
    const result = await configStore.store;
    return result;
  });

  ipcMain.handle("add-message", async (event, arg) => {
    const messages: any = (await configStore.get("account")) || [];
    messages.push(arg);
    configStore.set("account", messages);
  });

  ipcMain.handle("get-setting", async (event, arg) => {
    const result = await configStore.get(arg);
    return result;
  });

  ipcMain.handle("subscribe-to-changes", async (event, arg) => {
    const callback = (newValue, oldValue) => {
      // console.log('newValue', newValue);
      // console.log('oldValue', oldValue);
    };
    if (callback) {
      await configStore.onDidChange("account", callback);
    }
  });

  ipcMain.handle("get-tokens", async (event, arg) => {
    const AT = await configStore.get("account.accessToken");
    const CT = await configStore.get("account.clientToken");
    return { accessToken: AT, clientToken: CT };
  });

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true,
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);

  win.on("close", saveState);

  return win;
};
