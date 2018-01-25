import config from '../../config';
import { Logger } from '../../logger';

export class EmailDummyService implements EmailServiceInterface {
  private logger: Logger = Logger.getInstance('EMAIL_DUMMYMAIL_SERVICE');

  /**
   * @inheritdoc
   */
  public send(sender: string, recipient: string, subject: string, text: string): Promise<any> {
    this.logger.debug('Send email', sender, recipient, subject, text);

    return Promise.resolve(text);
  }
}
