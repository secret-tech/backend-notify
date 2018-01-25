import * as Mailgun from 'mailgun-js';
import * as MailComposer from 'mailcomposer';

import config from '../../config';
import { Logger } from '../../logger';

const {
  EMAIL_MAILGUN_APIKEY,
  EMAIL_MAILGUN_DOMAIN
} = process.env;

export class EmailMailgunService implements EmailServiceInterface {
  private logger: Logger = Logger.getInstance('EMAIL_MAILGUN_SERVICE');
  private api: any;

  /**
   * Initiate concrete provider instance
   */
  constructor() {
    if (!EMAIL_MAILGUN_APIKEY) {
      throw new Error('EMAIL_MAILGUN_APIKEY is empty');
    }
    if (!EMAIL_MAILGUN_DOMAIN) {
      throw new Error('EMAIL_MAILGUN_DOMAIN is empty');
    }

    this.api = new Mailgun({
      apiKey: EMAIL_MAILGUN_APIKEY,
      domain: EMAIL_MAILGUN_DOMAIN
    });
  }

  /**
   * @inheritdoc
   */
  public send(sender: string, recipient: string, subject: string, text: string): Promise<any> {
    this.logger.verbose('Send email', sender, recipient, subject);

    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      let mail = MailComposer({
        from: sender,
        to: recipient,
        subject,
        html: text
      });

      mail.build((mailBuildError, message) => {
        let dataToSend = {
          to: recipient,
          message: message.toString('ascii')
        };

        this.api.messages().sendMime(dataToSend, (err, body) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(body);
        });
      });
    });
  }
}
