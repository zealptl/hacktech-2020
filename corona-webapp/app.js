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
const locationsRef = dbRef.child('locations');

// Populate rows in list
const locationListUI = document.getElementById("locationList");
locationsRef.on("child_added", snap => {
    let location = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = location.name;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", locationClicked) 
    locationListUI.append($li);
});

// Show detail when clicked
function locationClicked(e) {
    var locationID = e.target.getAttribute("child-key");
    const locationRef = dbRef.child('locations/' + locationID);
    const locationDetailUI = document.getElementById("locationDetail");
    locationDetailUI.innerHTML = ""
    locationRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val()
         locationDetailUI.append($p);
    });
}