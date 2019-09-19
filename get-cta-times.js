const request = require('request');
const fs = require('fs');

module.exports = {getUpdate, test};
const key = "";

const stop_ids =[
   "14102", // 81
   "14104", // 81W
   "14110", // 68
   "14109", // 88
   "14103", // 91
   "14101", // 56
   "14106", // 85 nb
   "14105", // 85 sb
   "14107", // 85A
   "14108", // 92
];

/** get updated data from API and return to client */
function getUpdate(req, res, next){
  let url = `http://www.ctabustracker.com/bustime/api/v2/getpredictions?key=${key}&stpid=${stop_ids.join()}&format=json`;
  console.log(url);
  
  request(url, (err, response, body)=>{
    if(err)
      res.sendStatus(500);
    else
      res.send(body).status(200);
  });
}

/** get saved data from disk to save API calls in development */
function test(req, res, next){
  fs.readFile('./sample-predictions.json', (err, data)=>{
    res.send(JSON.parse(data));
  });
}