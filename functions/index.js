const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true
});

var dwolla = require("dwolla-v2");
var plaid = require("plaid");

const {DWOLLA_APP_KEY, DWOLLA_APP_SECRET, PLAID_CLIENT_ID, PLAID_ENV, PLAID_PUBLIC_KEY, PLAID_SECRET, DATABASE_URL} = require('./keys');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: DATABASE_URL
});
const db = admin.firestore();


exports.getIP = functions.https.onRequest((req, res) => {
  res.set(`Access-Control-Allow-Origin`, "*");
  res.json({ ip: req.ip });
});

exports.proccessPlaidUser = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    res.set(`Access-Control-Allow-Origin`, "*");
    res.set(`Accept`, "application/json");

    res.set(`Content-Type`, "application/javascript");
    var client = new dwolla.Client({
      key: DWOLLA_APP_KEY,
      secret: DWOLLA_APP_SECRET,
      environment: "sandbox"
    });

    console.log(req.body, "token", req.body.publicPlaid);

    var plaidClient = new plaid.Client(
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_PUBLIC_KEY,
      plaid.environments[PLAID_ENV],
      { version: "2018-05-22" }
    );

    const dwelloCusData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      type: "receive-only",
      businessName: req.body.businessName,
      ipAddress: req.ip
    };

    //STEP 1: FIRST WE INIT OUR APPTOKEN WITH DWELLO
    client.auth.client().then(function(appToken) {
      //STEP 2: WE CREATE A NEW CUSTOMER ON DWELLO WITH THE dwelloCusData
      appToken
        .post("customers", dwelloCusData)
        .then(cus => {
          //dwello new customer address i.e. https://api-sandbox.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
          const cus_local = cus.headers.get("location");

          PUBLIC_TOKEN = req.body.publicPlaid;

          //STEP 3: WE CREATE A PLAID ACCESSTOKEN USING req.body.publicPlaid
          plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(
            error,
            tokenResponse
          ) {
            if (error != null) {
              var msg = "Could not exchange public_token!";
              console.log(msg + "\n" + JSON.stringify(error));
              return res.json({
                error: msg,
                cus_local
              });
            } else {
              ACCESS_TOKEN = tokenResponse.access_token;
              ITEM_ID = tokenResponse.item_id;
              //STEP 4 CREATE PLAID PROCESSOR TOKEN FROM ACCESS TOKEN
              plaidClient.createProcessorToken(
                ACCESS_TOKEN,
                req.body.plaidAccount.id,
                "dwolla",
                function(err, proccessorPlaidResponse) {
                  if (err) {
                    res.json({
                      error: err,
                      cus_local
                    });
                  }
                  var PROCESSOR_TOKEN = proccessorPlaidResponse.processor_token;
                  console.log("procesor", PROCESSOR_TOKEN);

              var cusAuthBody = {
                plaidToken: PROCESSOR_TOKEN,
                name: ITEM_ID
              };
                  //STEP 5: we use our plaid PROCCESSORTOKEN to create a dwolla funding source
                  appToken
                    .post(`${cus_local}/funding-sources`, cusAuthBody)
                    .then(fund => {
                      console.log(
                        "created funding sourch",
                        fund.headers.get("location")
                      );
                       // example of fund.headers.get("location") => 'https://api-sandbox.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
                      
                      
                       let data = {
                        plaidAccount: req.body.plaidAccount,
                        dwollaAccount: {
                          customerLocation: cus_local,
                          fundingSourceLocation: fund.headers.get("location")
                        },
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        businessName: req.body.businessName,
                        ipAddress: req.ip,
                      };
                      
                      // Add a new document in collection "cities" with ID 'LA'
                      let setDoc = db.collection('Users').doc(req.body.firebaseID).set(data).then(set =>{
                        res.json({
                          error: false,
                          success: true,
                          message: 'data saved to db'
                        });
                      }).catch(err =>{
                        res.json({
                          error: true,
                          success:false,
                          err: err
                        });
                      });
                      
                    
                    })
                    .catch(err => {
                      res.json({
                        access_token: ACCESS_TOKEN,
                        item_id: ITEM_ID,
                        error: true,
                        cus_local,
                        err: err
                      });
                    });
                }
              );

             
            }
          });
        })
        .catch(err => {
          res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID,
            error: true,
            err: err
          });
        }); 
    });

    
  });
});
