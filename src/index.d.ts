declare interface EmailServiceInterface {
  send(sender: string, recipient: string, subject: string, text: string): Promise<any>;
}
