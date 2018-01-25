import { GetEmailService, EmailChannelReader } from "./email.notify.app";
import config from "./config";
import { Logger } from "./logger";

class Application {
  protected logger = Logger.getInstance('APP');
  protected emailQueue: EmailChannelReader;

  protected startEmailProcessing() {
    const emailService = GetEmailService();
    this.emailQueue = new EmailChannelReader(emailService,
      config.email.queue.topicPrefix, config.email.queue.channelPrefix);
    this.emailQueue.run();
  }

  start() {
    this.logger.info('Start');
    if (config.email.enabled) {
      this.logger.info('Start email processing');
      this.startEmailProcessing();
    }
  }
}

const app = new Application();

app.start();
