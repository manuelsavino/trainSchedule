$(function(){
  var config = {
    apiKey: "AIzaSyAgZSqwtNKFefz9W38_Q_5eSEC1h6CGv3s",
    authDomain: "trainschedule-f741e.firebaseapp.com",
    databaseURL: "https://trainschedule-f741e.firebaseio.com",
    projectId: "trainschedule-f741e",
    storageBucket: "",
    messagingSenderId: "810013375269"
  };

  firebase.initializeApp(config);
  var database = firebase.database()
  


  $("#submit").on("click", function(){
    event.preventDefault()
    var trainName = $("#trainName").val().trim()
    var destiantion = $("#destiantion").val().trim()
    var firstTrain = $("#firstTrain").val()
    var frequency = $("#frequency").val().trim()

    // console.log(trainName + " " + destiantion + " " + firstTrain+ " " +frequency)
    console.log(firstTrain)

    database.ref().push({
      trainName: trainName,
      destiantion: destiantion,
      firstTrain: firstTrain,
      frequency:frequency
    })

    $("#form")[0].reset()

  })

  database.ref().on("child_added", function(childSnapshot){
    var time = childSnapshot.val().firstTrain
    var frequency = childSnapshot.val().frequency

    var convertedTime = moment(time, "HH:mm");
    console.log("Converted time: " + convertedTime);

    var timeDiff = moment().diff(moment(convertedTime), "minutes");
    console.log("Time difference: " + timeDiff);

    // Math.abs(timeDiff)
    var remainder = timeDiff % frequency;
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain, "HH:mm").format("hh:mm");
    
    var row = $("<tr>")
    var data = $("<td>").append(childSnapshot.val().trainName)
    row.append(data)
    var data = $("<td>").append(childSnapshot.val().destiantion)
    row.append(data)
    var data = $("<td>").append(childSnapshot.val().frequency)
    row.append(data)
    var data = $("<td>").append(nextArrival)
    row.append(data)
    var data = $("<td>").append(minutesAway)
    row.append(data)
    $("tbody").append(row)

  })

  // var convertedTime = moment(trainTime, "HH:mm");
  // console.log("Converted time: " + convertedTime);

  //       // The difference between the first train time and the current time
        // var timeDiff = moment().diff(moment(convertedTime), "minutes");
        // console.log("Time difference: " + timeDiff);

  //       // Takes the absolute value of the difference to address hours between 0000-1100
  //       Math.abs(timeDiff)

        
        
        

        
 
  

  




})