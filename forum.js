// Firebase Config (Replace with your details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Post a Problem
function postIssue() {
    const content = document.getElementById("issueContent").value;
    if (content.trim() === "") {
        alert("Please enter an issue.");
        return;
    }

    db.collection("forum").add({
        content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Issue submitted!");
        document.getElementById("issueContent").value = "";
        loadIssues();
    });
}

// Load Issues
function loadIssues() {
    db.collection("forum").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        const issuesDiv = document.getElementById("issuesList");
        issuesDiv.innerHTML = "";
        snapshot.forEach(doc => {
            issuesDiv.innerHTML += `<p>${doc.data().content}</p>`;
        });
    });
}

// Load issues on page load
window.onload = loadIssues;
