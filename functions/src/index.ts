import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.scheduleMonthlyNotification = functions.pubsub.schedule('0 0 1 * *')
  .timeZone('Asia/Singapore')
  .onRun(async (context: functions.EventContext) => {
    const message = {
      notification: {
        title: 'Monthly Reminder',
        body: 'Check out the latest updates in the app!',
      },
      topic: 'all-users', // Use a topic to send to multiple users
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  });
