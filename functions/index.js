const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const admin = require('firebase-admin');
admin.initializeApp();

/* exports.create = functions.database.ref().onCreate(handler => {
    console.log('onCreate');
    handler.data.forEach(function(element) {
        console.log(element.toJSON());
      });
});
exports.delete = functions.database.ref().onDelete(handler => {
    console.log('onDelete');
    handler.data.forEach(function(element) {
        console.log(element.toJSON());
      });
});
exports.update = functions.database.ref().onUpdate(handler => {
    console.log('onUpdate');
    handler.data.forEach(function(element) {
        console.log(element.toJSON());
      });
});
 */
exports.write = functions.database.ref().onWrite(handler => {
    console.log('onWrite');
    /* handler.data.forEach(function(element) {
        console.log(element.toJSON());
      }); */
        // Grab the current value of what was written to the Realtime Database.
        var eventSnapshot = handler.data;
        //console.log(eventSnapshot.);
        //var str1 = "Author is ";
        //var str = str1.concat(eventSnapshot.child("author").val());
        //console.log(str);

        // Notification details.
        const payload = {
          notification: {
            title: 'You have a new message!',
          }
        };

        // Send a message to devices subscribed to the provided topic.
        //return admin.messaging().sendToTopic(topic, payload)
        admin.messaging().sendToTopic("connect",payload)
        //admin.messaging().send(payload)
        .then(function(response) {
            console.log("Successfully sent message:", response);
            return 0;
          })
          .catch(function(error) {
            console.log("Error sending message:", error);
          });
            /* .then(function (response) {
                // See the MessagingTopicResponse reference documentation for the
                // contents of response.
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            }); */
});

exports.hourly_job =
  functions.pubsub.topic('hourly-tick').onPublish((event) => {
    console.log("This job is ran every hour!")
    //sendNotification();
  });

  exports.test_job =
  functions.pubsub.topic('test-tick').onPublish((event) => {
    console.log("job running every minute!")
    sendNotification();
  });

  function sendNotification(){

    const payload = {
      notification: {
        title: 'You have a new message!',
      }
    };

    admin.messaging().sendToTopic("connect",payload)
    .then(function(response) {
        console.log("Successfully sent message:", response);
        return 0;
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
  }