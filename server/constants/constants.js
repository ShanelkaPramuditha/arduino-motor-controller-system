export const SERVER_CONFIG = {
  ESP32_IP: process.env.ESP32_IP || 'http://192.168.1.126',
  PORT: process.env.PORT || 3000,
  SERIAL_PORT: process.env.SERIAL_PORT || 'COM5',
  SERIAL_BAUDRATE: parseInt(process.env.SERIAL_BAUDRATE) || 115200
};

export const TELEGRAM_CONFIG = {
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
  ALLOWED_USERS: process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',') : []
};
