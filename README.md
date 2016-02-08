# Botkit demo using Express and Mongo

The folks at [Botkit](https://github.com/howdyai/botkit) have done an amazing job at building a framework for (Slack) bots applications. They have included an [example](https://github.com/howdyai/botkit/blob/master/examples/slackbutton_bot.js) of creating a Slack app that can be installed with just an "Add to Slack" button, as well as an [adapter](https://github.com/howdyai/botkit-storage-mongo) allowing to use MongoDB for storage.

However, the example used Botkit's webserver to manage requests such as authentication, but also serving webpages. Instead, I wanted to use [Express](http://expressjs.com).

## Features

* Serves webpages through standard express routes
``` app/routes/routes.js ```

* Uses Monk as MongoDB driver
* Includes by default the three Botkit collections : Teams, Users, and Channels

## Configuration

First, [create a Slack app](https://api.slack.com/slack-apps).
You'll get your app ID and Secret, and you'll be able to enter authentication redirect URL. To be able to use the app both on a local machine and in cloud hosting, enter two URLs:
```
http://localhost:5000/
http://yourwebsite.com/
```

Then, you need to set up several environment variables before using this app.

* For local deployment

Create a .env file at the root of the project with the following infos:

```
SLACK_ID=your.id
SLACK_SECRET=yourslacksecret
SLACK_REDIRECT=http://localhost:5000/
PORT=5000
```

* For Heroku deployment

You need to add from the Heroku dashboard the SLACK_ID, SLACK_SECRET and SLACK_REDIRECT (set it to your website root).

You can use MongoLab add-on to add Mongo storage, they have a free tier.

## Author
[Matthieu Varagnat](https://twitter.com/MVaragnat)

## Licence
Shared under [MIT licence](http://choosealicense.com/licenses/mit/)
