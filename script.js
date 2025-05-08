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
const auth = firebase.auth();
const db = firebase.firestore();

// Google Sign-In
function signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(user => {
        document.getElementById('user-info').innerText = `Hello, ${user.user.displayName}!`;
    });
}

// Sign Out
function signOut() {
    auth.signOut().then(() => {
        document.getElementById('user-info').innerText = "Signed out";
    });
}

// Create a Post
function createPost() {
    const content = document.getElementById("postContent").value;
    const user = auth.currentUser;

    if (user) {
        db.collection("posts").add({
            content,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Post created!");
        });
    } else {
        alert("Please sign in first!");
    }
}

// Load Posts
db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
        postsDiv.innerHTML += `<p><strong>${doc.data().username}:</strong> ${doc.data().content}</p>`;
    });
});
