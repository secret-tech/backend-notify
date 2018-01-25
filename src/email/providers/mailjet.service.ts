import config from '../../config';
import { Logger } from '../../logger';

const {
  EMAIL_MAILJET_APIKEY,
  EMAIL_MAILJET_APISECRET
} = process.env;

export class EmailMailjetService implements EmailServiceInterface {
  private logger: Logger = Logger.getInstance('EMAIL_MAILJET_SERVICE');
  private api: any;

  /**
   * Initiate concrete provider instance
   */
  constructor() {
    if (!EMAIL_MAILJET_APIKEY) {
      throw new Error('EMAIL_MAILJET_APIKEY is empty');
    }
    if (!EMAIL_MAILJET_APISECRET) {
      throw new Error('EMAIL_MAILJET_APISECRET is empty');
    }
    this.api = require('node-mailjet').connect(EMAIL_MAILJET_APIKEY, EMAIL_MAILJET_APISECRET);
  }

  /**
   * @inheritdoc
   */
  public send(sender: string, recipient: string, subject: string, text: string): Promise<any> {
    this.logger.verbose('Send email', sender, recipient, subject);

    const sendEmail = this.api.post('send');

    const emailData = {
      'FromEmail': sender,
      'Subject': subject,
      'Html-part': text,
      'Recipients': [ { 'Email': recipient } ]
    };

    return sendEmail.request(emailData);
  }
}
