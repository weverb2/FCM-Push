var admin = require("firebase-admin");

var serviceAccount = require("./keys/<INSERT YOUR SERVICE JSON>");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "<INSERT DATABASE URL>"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = "<INSERT YOUR TOKEN>";

// See documentation on defining a message payload.
var client_app_data = {
  media_url:
    "https://www.rd.com/wp-content/uploads/2018/02/19_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_391191067_chris_tina-760x506.jpg"
};

var message = {
  data: {
    title: "title",
    client_app_data: JSON.stringify(client_app_data)
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin
  .messaging()
  .send(message)
  .then(response => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
    process.exit(0);
  })
  .catch(error => {
    console.log("Error sending message:", error);
    process.exit(1);
  });
