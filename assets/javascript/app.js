
// Initialize Firebase
$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyA27u8ngDiV474_r9jgfzoMeDFWHdWFnmM",
    authDomain: "train-scheduler-hm.firebaseapp.com",
    databaseURL: "https://train-scheduler-hm.firebaseio.com",
    projectId: "train-scheduler-hm",
    storageBucket: "train-scheduler-hm.appspot.com",
    messagingSenderId: "960273413913"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  var trainName;
  var destination;
  var firstTrain;
  var frequency;


  $("#submit-button").on("click", function (event) {
    event.preventDefault();


    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
      Train: trainName,
      TrainDestination: destination,
      TrainOne: firstTrain,
      TrainFrequency: frequency,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    })

    // $("form").empty();
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

  })

  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().Train);
    console.log(childSnapshot.val().TrainDestination);
    console.log(childSnapshot.val().TrainOne);
    console.log(childSnapshot.val().TrainFrequency);


    
    var firstTrainNew = moment(childSnapshot.val().TrainOne, "hh:mm").subtract(1, "years");
    var differentTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = differentTime % childSnapshot.val().TrainFrequency;
    var minAway = childSnapshot.val().TrainFrequency - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append("<tr><td>" + childSnapshot.val().Train + "</td><td>" + childSnapshot.val().TrainDestination + "</td><td>" + childSnapshot.val().TrainFrequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");

  })





})



