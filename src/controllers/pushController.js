const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');
var admin = require("firebase-admin");
const authMiddleware = require('../middlewares/auth');

//router.use(authMiddleware);

/**
 * Create radio
 */
router.post('/registerToken', async (req, res) => {
  pushToken = await PushToken.create({
    ...req.body
  });

  res.send(pushToken);
});


router.post('/send', async (req, res) => {
  // auth on fcm
  var serviceAccount = require("../config/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  var payload = {
    notification: {
      title: "This is a Notification",
      body: "This is the body of the notification message."
    },
    token: 'flKuqC-XotY:APA91bF4EYvnFmRlbGGZ7VcypCXgzZW19cA9I-XCFKs9RqbuRWOCy0NSIbCrG6EpA7V4nhy65Eq8qLxteRbA6_N_TkOR66JduUsczNIX9-fTiMTU7sqOskHEqdgbzBxRgwM_g3dBRvkS'
  };


  admin.messaging().send(payload).then((result) => {
    console.log('send', result)
    res.send(result);
  })
});



module.exports = app => app.use('/push', router);