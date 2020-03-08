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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase locations database connection set up
const dbRef = firebase.database().ref();
const locationsRef = dbRef.child("locations");


// Adding data to Firebase
const addIncidentBtnUI = document.getElementById("add-incident-btn"); 
addIncidentBtnUI.addEventListener("click", addIncidentBtnClicked);

function addIncidentBtnClicked() {
  const addUserInputsUI = document.getElementsByClassName("user-input");
  let newIncident = {};

  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
      let key = addUserInputsUI[i].getAttribute('id');
      let value = addUserInputsUI[i].value;
      newIncident[key] = value;
  }

   locationsRef.push(newIncident)

   var successText = document.createTextNode("Success!"); 
   successText.id = "successText";
   document.body.appendChild(successText);
   document.getElementById("successText").style.color = "green";
}

// Pulling data from Firebase
const locationListUI = document.getElementById("locationList");
locationsRef.on("child_added", snap => {
  let location = snap.val();
  let $li = document.createElement("li");
  let $li2 = document.createElement("li");
  $li.innerHTML = location.address;
  $li2.innerHTML = location.description;
});


// Google Maps
function initMap() {
  var options = {
    zoom: 8,
    center: { lat: 40.7831, lng: -73.9712 }
  };

  var map = new google.maps.Map(document.getElementById("map"), options);

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
  }

  function addMarkers(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });
  }
}
