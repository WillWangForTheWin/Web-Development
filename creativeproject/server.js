const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyA9KeVVlu5Pb3qLr0n3xk7p_F8yveNlzeY",
    authDomain: "quiz-maker-5774b.firebaseapp.com",
    databaseURL: "https://quiz-maker-5774b.firebaseio.com",
    projectId: "quiz-maker-5774b",
    storageBucket: "quiz-maker-5774b.appspot.com",
    messagingSenderId: "453273822187",
    appId: "1:453273822187:web:40fd7830876c0db219efae"
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
var quizCollection = [];
database.collection('quizzes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var temp = doc.data();
        temp['id'] = doc.id;
        quizCollection.push(temp);
    })
    console.log(quizCollection);
});

app.post('/addQuiz', function (req, res) {
    console.log(req.body);
    database.collection('quizzes').add(req.body);
    quizCollection = [];
    database.collection('quizzes').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var temp = doc.data();
            temp['id'] = doc.id;
            quizCollection.push(temp);
        });
        res.json(quizCollection);
    });

});

app.get('/api/quizzes', (req, res) => {
    res.json(quizCollection);
});
const port = 5000;

app.post('/deleteQuiz', async (req, res) => {
    console.log("Delete Quiz:: ", req.body.id);
    database.collection('quizzes').doc(req.body.id).delete();
    quizCollection = [];
    database.collection('quizzes').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var temp = doc.data();
            temp['id'] = doc.id;
            quizCollection.push(temp);
        });
        res.json(quizCollection);
    });
})

app.post('/editQuiz', (req, res) => {
    console.log(req.body)
    console.log(req.body.id)
    database.collection('quizzes').doc(req.body.id).update(req.body)
    quizCollection = [];
    database.collection('quizzes').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var temp = doc.data();
            temp['id'] = doc.id;
            quizCollection.push(temp);
        });
        res.json(quizCollection);
    });
})


app.listen(port, () => console.log(`Server started on ${port}`));