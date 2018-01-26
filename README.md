# Jincor Backend Notify

This microservice is provide ability to notify the consumers through different methods.

## Pre-Requirements

[Nsqd/Nsqlookupd](http://nsq.io) to be installed (used for communication).
Credentials for some of email providers: mailjet, mailgun (other in future).
Other methods (sms, push, etc.) will be soon.

Best is to use a docker for environment.

## Build

* `npm install`
* `npm run build`

or if using docker:

* `docker build -t jincort/backend-notify:latest .`

## Run

* `npm run serve`

or if using docker:

* `docker run -e EMAIL_ENABLED=true -e NSQ_LOOKUPDS=nsqdlookupd:4060 jincort/backend-notify:latest`

## Configuring

#### Common:

* *LOGGING_LEVEL* Output level: debug, verbose, info, warn, error.
* *LOGGING_FORMAT* Log format: text, json.
* *LOGGING_COLORIZE* Colorize output: true, false.

* *NSQ_NSQDS* Host for nsqd (nsqd1:4050,nsqd2:4050).
* *NSQ_LOOKUPDS* Host for nsqlookupd (nsdlookupd1:4060,nsdlookupd2:4060).

* *EMAIL_ENABLED* Set to *true* to enable email sender. Default *false*.
* *EMAIL_DRIVER* Set email driver: dummy, mailjet, mailgun. Default is *dummy* output to console only.
* *EMAIL_TOPIC* Customize nsq topic. Default: notifications.email.default
* *EMAIL_CHANNEL* Customize nsq channel. Default: default

Run several instances to process notifications in parallel.

#### Driver specific:

* *EMAIL_MAILGUN_APIKEY* Mailgun api key
* *EMAIL_MAILGUN_DOMAIN* Mailgun domain

* *EMAIL_MAILJET_APIKEY* Mailjet api key
* *EMAIL_MAILJET_APISECRET* Mailjet secret
