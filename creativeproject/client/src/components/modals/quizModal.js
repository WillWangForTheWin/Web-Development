import React, { Component } from 'react';
import EditModal from './editModal';
class quizModal extends Component {
    constructor() {
        console.log("constructor called::")
        super();
        this.state = {
            show: false,
            quizId: "",
            currentUserId: "",
            quizUserId: ""
        }
    }
    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    answerChanged = (event) => {
        console.log("answer changed called", event.target.value, event.target);
        const id = event.target.id;
        const value = event.target.value;
        this.setState({
            [`${id}`]: value
        });
    }

    checkAnswers = () => {
        console.log("submitted::", this.props.quiz);
        var i = 1;
        var correctAmount = 0;
        console.log("state is::", this.state);
        Object.values(this.props.quiz.questions).forEach(element => {
            console.log("quiz elements", element);
            console.log("comparing::", element.answer, this.state[`quizA${i}`], `quizA${i}`)
            if (element.answer === this.state[`quizA${i}`]) {
                console.log("You are correct!");
                correctAmount++;
            }
            i++;
        });
        console.log("You got ", correctAmount, " out of 5");
        this.setState({ correctAnswers: correctAmount });
    }

    deleteQuiz = () => {
        let data = { id: this.props.quiz.id };
        console.log(data);
        fetch('/deleteQuiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <h2>{this.props.quiz.title}</h2>
                    <p>Difficulty: {this.props.quiz.difficulty}</p>
                    <p>Category: {this.props.quiz.category}</p>
                    <p>Rating: {this.props.quiz.rating}</p>
                    {this.state.correctAnswers && <h3>{this.state.correctAnswers} correct out of 5</h3>}
                    {this.props.quiz.questions.Q1.question} <input type='text' placeholder='Answer 1' id='quizA1' onChange={this.answerChanged}></input><br />
                    {this.props.quiz.questions.Q2.question} <input type='text' placeholder='Answer 2' id='quizA2' onChange={this.answerChanged}></input><br />
                    {this.props.quiz.questions.Q3.question} <input type='text' placeholder='Answer 3' id='quizA3' onChange={this.answerChanged}></input><br />
                    {this.props.quiz.questions.Q4.question} <input type='text' placeholder='Answer 4' id='quizA4' onChange={this.answerChanged}></input><br />
                    {this.props.quiz.questions.Q5.question} <input type='text' placeholder='Answer 5' id='quizA5' onChange={this.answerChanged}></input><br />
                    <input type='hidden' id='quizID' value={this.props.quiz.id}></input>
                    <button onClick={this.checkAnswers}>Answer</button><br />
                    {(this.props.quiz.userId === this.props.userId) && <button onClick={this.deleteQuiz}>Delete</button>}
                    {(this.props.quiz.userId === this.props.userId) && <button onClick={() => { this.hideModal(); this.props.showEditModal(); this.props.getQuizId(this.props.quiz.id) }}>Edit</button>}
                </Modal>
                <button type='button' onClick={this.showModal}>{this.props.quiz.title}</button>

            </div>
        )
    }
}
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                {children}
                <button onClick={handleClose}> Close</button>
            </section>
        </div>
    );
};
export default quizModal;