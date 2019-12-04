/**************************************
Ninja Bucks Chrome Extension
By: Karthik Sankar
***************************************/

recurs();

function addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
  }

  function fire(){
    for(src of document.getElementsByTagName("script")){
        if(src.src.includes("firebase"))
            return true;
    }
    return false;
}

function recurs(){
    if(document.readyState == "complete"){
	if(fire()){
		console.log("fire");
		    var script = document.createElement("script")
    script.innerHTML = `    
  var firebaseConfig = {
    apiKey: "AIzaSyB9qbG1G1TBucaoEZvvsevtQ172HHGDyXQ",
    authDomain: "cnninjabucks.firebaseapp.com",
    databaseURL: "https://cnninjabucks.firebaseio.com",
    projectId: "cnninjabucks",
    storageBucket: "cnninjabucks.appspot.com",
    messagingSenderId: "426732205898",
    appId: "1:426732205898:web:5d11252b9d17f44ac7f3b3",
    measurementId: "G-8MLP00E16H"
  };
    firebase.initializeApp(firebaseConfig); 
var ninjaData = {};
function addNinBucks(){
console.log("NB")
for(card of document.getElementsByClassName("s-card-container")){
	var ninBucksEl;
	var needRender = true;

	console.log(card.getElementsByClassName("s-card-name")[0].getElementsByTagName("span")[0].innerText)
	var ninjaBucks = 0;
	if(ninjaData[card.getElementsByClassName("s-card-name")[0].getElementsByTagName("span")[0].innerText])
		ninjaBucks = ninjaData[card.getElementsByClassName("s-card-name")[0].getElementsByTagName("span")[0].innerText];
	else
		firebase.database().ref().update({
    [card.getElementsByClassName("s-card-name")[0].getElementsByTagName("span")[0].innerText]: 0,
	});
	for(textEl of card.getElementsByClassName("s-card-footer")[0].getElementsByTagName("span")){
		if(textEl.innerText.includes("Ninja Bucks")){
			needRender = false;
			ninBucksEl = textEl;
        }
    }
	if(needRender){
        var element = (card.getElementsByClassName("s-card-footer")[0].getElementsByTagName("span")[0]).cloneNode(true)

        element.style.fontWeight = "bold";
	element.style.color = "green!important";
        element.innerText = "Ninja Bucks: "+ninjaBucks;
	element.classList.add("NinjaBucks")

        var br = document.createElement("BR")
	card.getElementsByClassName("s-card-footer")[0].style.display = "block";
	card.getElementsByClassName("s-card-footer")[0].style.height = "80px!important";
        card.getElementsByClassName("s-card-footer")[0].appendChild(br)
        card.getElementsByClassName("s-card-footer")[0].appendChild(element)
	

        card.getElementsByClassName("s-card-footer")[0].style.height="90px"
		ninBucksEl = element;
    }else{
	var element = card.getElementsByClassName("NinjaBucks")[0];
	element.innerText = "Ninja Bucks: "+ninjaBucks;
	}
}


}
console.log("update")
	firebase.database().ref().on('value', function(snapshot) {
	console.log("update")
		ninjaData = snapshot.val()
	  addNinBucks(snapshot.val());
	});

	setInterval(addNinBucks,30000)

    `
    document.body.appendChild(script)


}else{
addScript("https://www.gstatic.com/firebasejs/5.9.3/firebase.js")
setTimeout(recurs, 1000);
}
        console.log("inside");
    } else {
        setTimeout(recurs, 1000);
        console.log("tryin again");
    }
}
