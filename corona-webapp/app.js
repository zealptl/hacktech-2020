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
}



// Pulling data from Firebase
readUserData();


function readUserData() {
  const locationListUI = document.getElementById("locationList");
  locationsRef.on("child_added", snap => {
    let location = snap.val();
    
    //console.log(location.address);
    //console.log(location.description);
    //console.log(location.latitude);
    //console.log(location.longitude);
    
    var marker = {coords: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)} };
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

      var marker = {coords: { lat: parseFloat(newLat), lng: parseFloat(newLong)} };
      addMarkers(marker);

      console.log(newLat, newLong);
    });
  } else {
    console.log("geolocation not available");
  }
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
        coords: { lat: 40.7831, lng: -73.9712 }
      },
      {
        coords: { lat: 40.742054, lng: -73.769417 }
      },
      {
        coords: { lat: 40.650002, lng: -73.949997 }
      }
    ];

    for (let i = 0; i < markers.length; i++) {
      addMarkers(markers[i]);
      console.log(markers[i]);
    }
}

  function addMarkers(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });
  }

