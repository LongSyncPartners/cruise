const isDev =
  typeof import.meta !== "undefined" &&
  (import.meta as any).env?.DEV;

export const logger = {
  info: (msg: string, data?: unknown) => {
    if (isDev) {
      console.log(msg, data);
    }
  },
  error: (msg: string, error?: unknown) => {
    console.error(msg, error);
  },
};