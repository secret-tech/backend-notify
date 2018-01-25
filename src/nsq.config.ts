import config from './config';

export function getConnectionForReader(): any {
  if (!config.nsq.nsqds.length && !config.nsq.lookupds.length) {
    return {
      nsqdTCPAddresses: ['localhost:4150']
    };
  }
  return {
    nsqdTCPAddresses: config.nsq.nsqds || undefined,
    lookupdHTTPAddresses: config.nsq.lookupds || undefined
  }
}
