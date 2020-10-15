const webpush = require('web-push');
const express = require('express');
const app = express();
const http = require(`http`).createServer(app);
const path = require(`path`);
const Config = require('./Config.all')
 
webpush.setGCMAPIKey(Config.notif.gcm);
webpush.setVapidDetails(Config.notif.mailto,Config.notif.vapid1,Config.notif.vapid2);

const port = process.env.PORT || 5000;

var test;
app.use(function(req, res, next) {
    console.log("Yop un gens c'est co avec lip "+(req.headers['x-forwarded-for'] || req.connection.remoteAddress));
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());

app.use(express.static(path.join(__dirname, `/../build/`)));
app.post('/subscribe',(req,res)=>{
    test=req.body;

    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({"body": "Merci d'avoir accepter les notification","title": "Portfolio Max",	"action": [{"action": "explore","title": "Go to the site"},{"action": "close","title": "Close the notification"}]});
    webpush.sendNotification(test,payload).catch(error=>{
        console.error(error.stack)
    });
})
app.post('/unsubscribe',(req,res)=>{
    if(!test) return res.status(400).json({status:"Error no subscription"})
    test=null;
    res.status(200).json("Unsubscribe done")
})

app.post('/notif',(req,res)=>{
    const payload = JSON.stringify({"body": "Notification template","title": "Notif template",	"action": [{"action": "explore","title": "Go to the site"},{"action": "close","title": "Close the notification"}]});
    webpush.sendNotification(test,payload).catch(error=>{
        console.error(error.stack)
    });
})

app.get(`*`, (req,res) =>{ res.sendFile(path.join(__dirname+`/../build/index.html`));});

http.listen(port);
console.log("app is listening on port "+port)