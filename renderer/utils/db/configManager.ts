import electron from 'electron';

const ipcRenderer: any = electron.ipcRenderer || false;

// Fetch user data
export const getUser: any = async () => {
  // const user = await settings.get("account");
  // return user;
};

// Update an existing user
export const updateUser: any = async (rawUser: any) => {
  const existingUser = getUser();
  // const user = await settings.set("account", { ...rawUser, ...existingUser });
  // return user;
};

// Create a new user
export const createUser = async (rawUser: any) => {
  return await ipcRenderer.invoke('create-user', rawUser);
};
