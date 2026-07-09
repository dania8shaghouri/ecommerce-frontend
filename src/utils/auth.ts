// axios.ts ile AuthProvider arasında köprü (bridge) görevi görüyor
let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

export const logout = () => {
  logoutHandler?.();
};
