import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.scheduleMonthlyNotification = functions.pubsub.schedule('0 0 1 * *')
  .timeZone('America/Los_Angeles') // Change to your timezone
  .onRun((context: functions.EventContext) => {
    const message = {
      notification: {
        title: 'Monthly Reminder',
        body: 'Check out the latest updates in the app!',
      },
      topic: 'all-users', // Use a topic to send to multiple users
    };

    return admin.messaging().send(message)
      .then((response: admin.messaging.MessagingTopicResponse) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error: Error) => {
        console.log('Error sending message:', error);
      });
  });
