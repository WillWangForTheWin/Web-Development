import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import QuizModals from './components/modals/quizModal.js'
import EditModal from './components/modals/editModal.js';
const firebase = require("firebase/app");
require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyA9KeVVlu5Pb3qLr0n3xk7p_F8yveNlzeY",
  authDomain: "quiz-maker-5774b.firebaseapp.com",
  databaseURL: "https://quiz-maker-5774b.firebaseio.com",
  projectId: "quiz-maker-5774b",
  storageBucket: "quiz-maker-5774b.appspot.com",
  messagingSenderId: "453273822187",
  appId: "1:453273822187:web:40fd7830876c0db219efae"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();



class App extends Component {

  state = { show: false, quizzes: [], currentUserId: '' }

  returnUserID = () => {
    if ('currentUser' in auth) {
      this.setState({ currentUserId: auth.currentUser.uid })
      return auth;
    }
  }


  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  showEditModal = () => {
    console.log("showEditModal ::");
    this.setState({ showEdit: true })
  }

  hideEditModal = () => {
    this.setState({ showEdit: false })
  }

  login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword($('#email').val(), $('#password').val()).catch((error) => {
      alert("Failed to Login");
      console.log(error);
    })
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user logged in: ', auth.currentUser.uid)
        this.setState({ currentUserId: auth.currentUser.uid })
      } else {
        console.log('user logged out');
        this.setState({ currentUserId: 0 })
      }
    })
  }

  submitQuiz = () => {
    let data = {
      title: $('#quizcTitle').val(),
      userId: auth.currentUser.uid,
      questions: {
        Q1: {
          question: $('#quizcQ1').val(),
          answer: $('#quizcA1').val()
        },
        Q2: {
          question: $('#quizcQ2').val(),
          answer: $('#quizcA2').val()
        },
        Q3: {
          question: $('#quizcQ3').val(),
          answer: $('#quizcA3').val()
        },
        Q4: {
          question: $('#quizcQ4').val(),
          answer: $('#quizcA4').val()
        },
        Q5: {
          question: $('#quizcQ5').val(),
          answer: $('#quizcA5').val()
        }
      },
      rating: 0,
      difficulty: $('#quizDifficulty').val(),
      category: $('#quizCategory').val(),
      rating: $('#quizRating').val(),
      date: $('#quizDate').val()
    }
    console.log(data);
    fetch('/addQuiz', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(quizzes => this.setState({ quizzes: quizzes }, () => console.log("Quizzes fetched from addQUiz...", quizzes)));
  }
  componentDidMount() {
    fetch('/api/quizzes')
      .then(res => res.json())
      .then(quizzes => this.setState({ quizzes: quizzes }, () => console.log("Quizzes fetched...", quizzes)));
  }

  onChildChanged = () => {
    this.setState({ state: this.state })
  }

  getQuizId = (id) => {
    this.setState({ currentQuizId: id })
  }

  sortRating = () => {
    console.log("ORDER BEFORE:: ", this.state.quizzes)
    let sortedQuizzes = this.state.quizzes.sort((a, b) => (b.rating - a.rating))
    this.setState({ quizzes: sortedQuizzes });
  }
  sortDate = () => {
    let sortedQuizzes = this.state.quizzes.sort((a, b) => (a.date - b.date))
    this.setState({ quizzes: sortedQuizzes });
  }
  render() {
    return (
      <main>
        <h1>Your Favorite Quiz Site</h1>
        <div className="loginInfo">
          <input type='email' placeholder='email' id='email'></input>
          <input type='password' placeholder='password' id='password'></input>
          <button id='login_btn' onClick={this.login}>login</button>
        </div>
        <div className="signupInfo">
          <input type='email' placeholder='email' id='signupEmail'></input>
          <input type='password' placeholder='password' id='signupPassword'></input>
          <button id='signup_btn'>signup</button>
        </div>
        <div className="signOut">
          <button id='signOut'>Logout</button>
        </div>

        <Modal show={this.state.show} handleClose={this.hideModal} >
          <input type='text' placeholder='Title' id='quizcTitle'></input>
          <br />
          <input type='text' placeholder='Question 1' id='quizcQ1'></input>
          <input type='text' placeholder='Answer 1' id='quizcA1'></input>
          <br />
          <input type='text' placeholder='Question 2' id='quizcQ2'></input>
          <input type='text' placeholder='Answer 2' id='quizcA2'></input>
          <br />
          <input type='text' placeholder='Question 3' id='quizcQ3'></input>
          <input type='text' placeholder='Answer 3' id='quizcA3'></input>
          <br />
          <input type='text' placeholder='Question 4' id='quizcQ4'></input>
          <input type='text' placeholder='Answer 4' id='quizcA4'></input>
          <br />
          <input type='text' placeholder='Question 5' id='quizcQ5'></input>
          <input type='text' placeholder='Answer 5' id='quizcA5'></input>
          <br />
          <input type='text' placeholder='Difficulty' id='quizDifficulty'></input>
          <input type='text' placeholder='Category' id='quizCategory'></input>
          <input type='number' placeholder='Rating' id='quizRating'></input>
          <input type="hidden" value={Date.now()} id='quizDate'></input>
          <br />
          <button id='quiz_btn' onClick={this.submitQuiz}>Create</button><br />
        </Modal>
        <button type='button' min='0' max='5' onClick={this.showModal}>CreateQuiz</button>
        {/* <ShowCreateQuiz /> */}
        <div>
          <h2>QUIZZES<button onClick={this.sortRating}>Sort by Rating</button><button onClick={this.sortDate}>Sort by Date</button></h2>
          {this.state.quizzes.map(quiz =>
            <QuizModals quiz={quiz} userId={this.state.currentUserId} showEditModal={this.showEditModal} getQuizId={this.getQuizId} callbackParent={this.onChildChanged} />,
          )}
        </div>
        <div>
          {this.state.showEdit && <EditModal show={this.state.showEdit} userId={this.state.currentUserId} quizId={this.state.currentQuizId} hideEditModal={this.hideEditModal} />}
        </div>
      </main>
    )

  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

$(document).ready(() => {
  // Login with Firebase Auth

  // Signup with Firebase Auth
  $('#signup_btn').click(function (e) {
    e.preventDefault();
    auth.createUserWithEmailAndPassword($('#signupEmail').val(), $('#signupPassword').val()).then(cred => {
    })
  });
  // Logout with Firebase Auth
  $('#signOut').click(function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log('user logged out');
    })
  })
})

export default App; 
