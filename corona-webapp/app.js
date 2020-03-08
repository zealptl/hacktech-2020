// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC0ypF7SnpAn-hCs1SIct_56ZNQQmI16SY",
  authDomain: "coronaracism.firebaseapp.com",
  databaseURL: "https://coronaracism.firebaseio.com",
  projectId: "coronaracism",
  storageBucket: "coronaracism.appspot.com",
  messagingSenderId: "103969106918",
  appId: "1:103969106918:web:e64039fa64087bd98e8427",
  measurementId: "G-6X7NRFQTYN"
};

// Initialize Firebase and set up database connection
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
const locationsRef = dbRef.child("locations");

// Pushing data to Firebase
const addIncidentBtnUI = document.getElementById("add-incident-btn");
addIncidentBtnUI.addEventListener("click", addIncidentBtnClicked);

function addIncidentBtnClicked() {
  const addUserInputsUI = document.getElementsByClassName("user-input");
  let newIncident = {};

  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
    let key = addUserInputsUI[i].getAttribute("id");
    let value = addUserInputsUI[i].value;
    newIncident[key] = value;
  }

  locationsRef.push(newIncident);
  document.getElementById("svg-check").style.display = "inline";
  document.getElementById("form").reset();
}

// Pulling data from Firebase
readUserData();

function readUserData() {
  const locationListUI = document.getElementById("locationList");
  locationsRef.on("child_added", snap => {
    let location = snap.val();

    //console.log(location.severity);
    //console.log(location.description);
    //console.log(location.latitude);
    //console.log(location.longitude);

    var marker = {
      coords: {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      },
      severity: location.severity
    };
    addMarkers(marker);
  });
}



//Find Me button clicked
document.getElementById("find-me-btn").addEventListener("click", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      newLat = position.coords.latitude;
      newLong = position.coords.longitude;

      var latitudeOnPage = document.getElementById("latitude");
      latitudeOnPage.value = newLat;

      var longitudeOnPage = document.getElementById("longitude");
      longitudeOnPage.value = newLong;

      var marker = {
        coords: { lat: parseFloat(newLat), lng: parseFloat(newLong) }
      };
      addMarkers(marker);

      document.getElementById("lat").textContent = "Lat: " + newLat.toFixed(3);
      document.getElementById("long").textContent =
        "Long: " + newLong.toFixed(3);

      console.log("NEW LAT/LONG: ", newLat, newLong);
    });
  } else {
    console.log("geolocation not available");
  }
});




//Depending on severity button clicked, updates severity value on page
document.getElementById("onClickButton1").addEventListener("click", () => {
    var severityOnPage = document.getElementById("severity");
    severityOnPage.value = "1";
});
document.getElementById("onClickButton2").addEventListener("click", () => {
    var severityOnPage = document.getElementById("severity");
    severityOnPage.value = "2";
});
document.getElementById("onClickButton3").addEventListener("click", () => {
    var severityOnPage = document.getElementById("severity");
    severityOnPage.value = "3";
});
document.getElementById("onClickButton4").addEventListener("click", () => {
    var severityOnPage = document.getElementById("severity");
    severityOnPage.value = "4";
});
document.getElementById("onClickButton5").addEventListener("click", () => {
    var severityOnPage = document.getElementById("severity");
    severityOnPage.value = "5";
});



// Google Maps
var map;

function initMap() {
  var options = {
    zoom: 8,
    center: { lat: 40.7831, lng: -73.9712 }
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  var markers = [
    {
      coords: { lat: 40.7831, lng: -73.9712 },
      severity: "1"
    },
    {
      coords: { lat: 40.742054, lng: -73.769417 },
      severity: "1"
    },
    {
      coords: { lat: 40.650002, lng: -73.949997 },
      severity: "1"
    }
  ];

  for (let i = 0; i < markers.length; i++) {
    addMarkers(markers[i]);
    console.log(markers[i]);
  }
}

function addMarkers(props) {
  if (props.severity == "1") {
    var marker = new google.maps.Marker({
      position: props.coords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
  }
  else if (props.severity == "2") {
    var marker = new google.maps.Marker({
      position: props.coords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
  }
  else if (props.severity == "3") {
    var marker = new google.maps.Marker({
      position: props.coords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    });
  }
  else if (props.severity == "4") {
    var marker = new google.maps.Marker({
      position: props.coords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
    });
  }
  else if (props.severity == "5") {
    var marker = new google.maps.Marker({
      position: props.coords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
  }
}

/*----- ANIMATIONS -----*/
var formTl = new TimelineMax();
const formController = new ScrollMagic.Controller();
formTl.from(".form h2", 0.5, { x: 200, opacity: 0 });
formTl.from(".form form", 0.5, { y: 150, opacity: 0 });

var tipsTl = new TimelineMax();
const tipsController = new ScrollMagic.Controller();
tipsTl.from(".avoid-coronavirus h1", 0.5, { x: -150, opacity: 0 });
tipsTl.from(".avoid-confrontations h1", 0.5, { x: 150, opacity: 0 }, "-=0.5");
tipsTl.from(".avoid-coronavirus ul, .avoid-confrontations ul", 0.5, {
  y: 150,
  opacity: 0
});

const tipsScene = new ScrollMagic.Scene({
  triggerElement: ".tips-page"
})
  .setTween(tipsTl)
  .addTo(tipsController);
