export const SERVER_CONFIG = {
  ESP32_IP: process.env.ESP32_IP || 'http://192.168.1.126',
  PORT: process.env.PORT || 3000,
  USB_PORT: 'COM5',
  SERIAL_BAUDRATE: parseInt(process.env.SERIAL_BAUDRATE) || 115200
};

export const TELEGRAM_CONFIG = {
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
  ALLOWED_USERS: process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',') : []
};

export const PWM_CONFIG = {
  // Convert to integer since the environment variables are strings
  MAX_PWM: parseInt(process.env.MAX_PWM) || 255,
  MIN_PWM: parseInt(process.env.MIN_PWM) || 35
};

export const POWER_STATUS = {
  ON: 'ON',
  OFF: 'OFF'
};

export const PATTERN = {
  PATTERN0: 0,
  PATTERN1: 1,
  PATTERN2: 2,
  PATTERN3: 3,
  PATTERN4: 4,
  PATTERN5: 5,
  PATTERN6: 6,
  PATTERN7: 7,
  PATTERN8: 8,
  PATTERN9: 9,
  PATTERN10: 10
};
