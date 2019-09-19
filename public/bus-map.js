//bus-map.js
const south_routes=["88","68", "81W", "56", "91", "81"];
const north_routes=["85A","85nb", "85sb", "225 226", "270", "92"];

//set up progress cirlce
var timer = new ProgressBar.Circle(document.querySelector('#progress'), {
   strokeWidth: 10,
   easing: 'linear',
   duration: 60*1000,
   color: 'rgb(230,230,230)',
   trailColor: 'rgb(230,230,230)',
   trailWidth: 3,
   svgStyle: null
 });

writeRoutes();

/** update vevery minute */
setInterval(getBusTimes, 60*1000);

getBusTimes(); //first update

/** write route titles */
function writeRoutes(){
   var north = document.querySelector('.north-terminal');
   var south = document.querySelector('.south-terminal');
   
   var html='';
   for(let i of north_routes)
      html+=writeRoute(i);
   north.innerHTML=html;
   html='';

   for(let i of south_routes)
      html+=writeRoute(i);
   south.innerHTML=html;
}

/** write one route title */
function writeRoute(title){
   return `
      <div class="route">
         <div class="route-label">${title}</div>
         <div id="buses_${title}" class="route-buses"></div>
      </div>
   `;
}

/** write all bus times */
function writeBuses(buses){
   for(let route in buses){
      if (buses[route].length){
         let rt = document.querySelector("#buses_"+route);
         let html = '';
         for(let bus of buses[route])
            html+=writeBus(bus);
         rt.innerHTML = html;
      }
   }
}

/** write one bus time */
function writeBus(time){
   let animation ='flipinX';
   let due=''
   if(time=="DUE")
      due = 'flash';
   else if(time=="DLY")
      time = "DLY";
   else
      time = time+" min"; 
   
   return  `<div class="bus animated ${animation} ${due}">${time}</div>`;
}

/** remove old bus times and get updated ones */
async function getBusTimes(){
   await flipOut();
   timer.set(0);
   timer.animate(1);
   console.log('Getting buses at '+new Date());

   fetch(`/getCTATimes`)
   .then(r=>r.json())
   .then(r=>parseBuses(r))
   .then(r=>writeBuses(r))
   .catch(console.log);
}

/** animate each bus route to hide before update */
function flipOut(){
   let buses = document.querySelectorAll(".bus");
   var dones = [];
   for(let bus of buses){
      dones.push(animateCSS(bus, 'flipOutX'))
   }
   
   return Promise.all(dones);
}

/** parse buses into object by route */
function parseBuses(buses){
   buses = buses['bustime-response'].prd;
   let output = {};
   for(let bus of buses){
      if(bus.rt==="85"){
         if(bus.rtdir==="Southbound")
            bus.rt="85sb";
         else
            bus.rt="85nb";
      }
      if(output[bus.rt])
         output[bus.rt].push(bus.prdctdn);
      else
         output[bus.rt] = [bus.prdctdn];
   }
   return output;
}

/** animate flipping out buses */
function animateCSS(node, animationName) {
   return new Promise((resolve, reject)=>{
      node.classList.add('animated', animationName)

      function handleAnimationEnd() {
         node.classList.remove('animated', animationName)
         node.removeEventListener('animationend', handleAnimationEnd)
         node.classList.add('hidden');
         resolve(true);
      }

      node.addEventListener('animationend', handleAnimationEnd)
   });  
}
