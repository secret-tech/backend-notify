import { Reader } from 'nsqjs';

import config from './config';

import { getConnectionForReader } from './nsq.config';

import { EmailMailgunService } from './email/providers/mailgun.service';
import { EmailMailjetService } from './email/providers/mailjet.service';
import { EmailDummyService } from './email/providers/dummy.service';

export function GetEmailService(): EmailServiceInterface {
  switch(config.email.driver) {
    case 'mailgun':
      return new EmailMailgunService();
    case 'mailjet':
      return new EmailMailjetService();
    case 'dummy':
      return new EmailDummyService();
    default:
      throw new Error('Unknown email service driver ' + config.email.driver);
  }
}

export class EmailChannelReader {
  private reader: Reader;

  constructor(protected emailService: EmailServiceInterface, protected topic: string, protected channel: string) {
  }

  run() {
    this.reader = new Reader(this.topic, this.channel, {
      ...getConnectionForReader(),
      deflate: true,
      deflateLevel: 9
    });

    this.reader.connect();

    this.reader.on('message', async msg => {
      try {
        const email: {
          sender: string;
          recipient: string;
          subject: string;
          body: string;
        } = msg.json();
        await this.emailService.send(email.sender, email.recipient, email.subject, email.body);
      } catch (err) {
        msg.finish();
      } finally {
        msg.finish();
      }
    });
  }
}
