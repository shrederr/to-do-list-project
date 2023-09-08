declare global {
  interface Window {
    SERVER_URI: string | undefined;
  }
}

export const SERVER_URI = window.SERVER_URI || 'http://localhost:5000';
