//test.js

const times = require('./get-times.js');

var test ={};
test.send = (data)=>{

   //is there data
   if(data) ok('data');
   else {fail(); return;}

   //is there bus data
   if(data["bustime-response"].prd.length) ok('data length');
   else {fail(); return;}

   // does the bus data have the right fields
   if(
      data["bustime-response"].prd[0].rt &&
      data["bustime-response"].prd[0].prdctdn
   ) ok('data fields');
   else {fail(); return;}

   // is the bus data for jefferson park
   var buses = data["bustime-response"].prd;

   for(let bus of buses){
      if(bus.stpnm.toLowerCase().includes('jefferson park')) ok('stop name '+bus.stpnm);
      else fail('stop name '+bus.stpnm);
   }

};
test.send.status=(status)=>{
   if(status==200) ok('status');
   else fail();
}

times.test(null, test, null);


function ok(msg=''){console.log("OK "+msg)}
function fail(msg=''){console.log("FAIL "+msg)}

