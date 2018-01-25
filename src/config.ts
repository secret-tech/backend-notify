import * as fs from 'fs';

require('dotenv').config();

const {
  LOGGING_LEVEL,
  LOGGING_FORMAT,
  LOGGING_COLORIZE,

  NSQ_NSQDS,
  NSQ_LOOKUPDS,

  EMAIL_ENABLED,
  EMAIL_DRIVER,
  EMAIL_TOPIC,
  EMAIL_CHANNEL
} = process.env;

export default {
  logging: {
    level: LOGGING_LEVEL || 'warn',
    format: LOGGING_FORMAT || 'text',
    colorize: LOGGING_COLORIZE === 'true'
  },
  nsq: {
    nsqds: (NSQ_NSQDS || '').split(',').filter(t => t),
    lookupds: (NSQ_LOOKUPDS || '').split(',').filter(t => t)
  },
  email: {
    enabled: EMAIL_ENABLED === 'true',
    queue: {
      topicPrefix: EMAIL_TOPIC || 'notifications.email.default',
      channelPrefix: EMAIL_CHANNEL || 'default'
    },
    driver: EMAIL_DRIVER || 'dummy'
  }
};
