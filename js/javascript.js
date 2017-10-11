$(document).ready()
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDl9cmuim4Z2_e6Mc3CQMTrS11gphe8RJg",
    authDomain: "coconstruct-471a8.firebaseapp.com",
    databaseURL: "https://coconstruct-471a8.firebaseio.com",
    projectId: "coconstruct-471a8",
    storageBucket: "coconstruct-471a8.appspot.com",
    messagingSenderId: "922787842286"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#contact-submit").on("click", function(event) {
    event.preventDefault();
    // Save our user inputs into variables
    var clientName = $("#name-input").val().trim();
    var address = $("#address-input").val().trim();
    var email = $("#email-input").val().trim();
    var phone = $("#phone-input").val().trim();

    // Store our 4 variables into the object clientInfo
    var clientInfo = {
        clientName: clientName,
        address: address,
        email: email,
        phone: phone

    };
   

    // Push our variables onto firebase using the .push method which is used instead of .set because we want a new entry to save for each train rather than overwriting the same one
    database.ref("/clientInfo").push(clientInfo);
});

$("#budget-submit").on("click", function(event) {
    event.preventDefault();
    // Save our user inputs into variables


    var projectName = $("#project-input").val().trim();
    var proposedBudget = $("#budget-input").val().trim();
    var actualBudget = $("#actualBudget-input").val().trim();
    var proposedTimeline = $("#timeline-input").val().trim();
    var actualTimeline = $("#actualTimeline-input").val().trim();


    // Store our 5 variables into the object completeTrainInfo
    var budgetInfo = {

        projectName: projectName,
        proposedBudget: proposedBudget,
        actualBudget: actualBudget,
        proposedTimeline: proposedTimeline,
        actualTimeline: actualTimeline
    };

    // Push our variables onto firebase using the .push method which is used instead of .set because we want a new entry to save for each train rather than overwriting the same one
    database.ref("/budgetInfo").push(budgetInfo);
});

// Anytime the page is loaded or a new contact is added we want to update all the trains using the firebase database.
database.ref("/budgetInfo").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store firebase data into these variables

    var projectName = childSnapshot.val().projectName;
    var proposedBudget = childSnapshot.val().proposedBudget;
    var actualBudget = childSnapshot.val().actualBudget;
    var proposedTimeline = childSnapshot.val().proposedTimeline;
    var actualTimeline = childSnapshot.val().actualTimeline;

    $("#display").append("<tr><td>" + projectName + "</td><td>" + proposedBudget + "</td><td>" +
        actualBudget + "</td><td>" + proposedTimeline + " days" + "</td><td>" + actualTimeline + " days" + "</td></tr>");

    $("#clientViewProject").append("<tr><td>" + projectName + "</td><td>" + proposedBudget + "</td><td>" +
        actualBudget + "</td><td>");

    $("#clientViewTimeline").append("<tr><td>" + projectName + "</td><td>" + proposedTimeline + " days" + "</td><td>" +
        actualTimeline + " days" + "</td><td>");

    $("#project-input").val("");
    $("#budget-input").val("");
    $("#actualBudget-input").val("");
    $("#timeline-input").val("");
    $("#actualTimeline-input").val("");

});

database.ref("/clientInfo").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store firebase data into these variables
    var clientName = childSnapshot.val().clientName;
    var address = childSnapshot.val().address;
    var email = childSnapshot.val().email;
    var phone = childSnapshot.val().phone;


    $("#address").html(address);
    $("#phone").html(phone);
    $("#email").html(email);

    $("#name-input").val(clientName);
    $("#address-input").val(address);
    $("#email-input").val(email);
    $("#phone-input").val(phone);

});