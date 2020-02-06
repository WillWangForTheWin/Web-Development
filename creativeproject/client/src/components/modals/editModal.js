import React, { Component } from 'react';
import $ from 'jquery';
class EditModal extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }
    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    editQuiz = () => {
        let data = {
            title: $('#editTitle').val(),
            userId: this.props.userId,
            questions: {
                Q1: {
                    question: $('#editQ1').val(),
                    answer: $('#editA1').val()
                },
                Q2: {
                    question: $('#editQ2').val(),
                    answer: $('#editA2').val()
                },
                Q3: {
                    question: $('#editQ3').val(),
                    answer: $('#editA3').val()
                },
                Q4: {
                    question: $('#editQ4').val(),
                    answer: $('#editA4').val()
                },
                Q5: {
                    question: $('#editQ5').val(),
                    answer: $('#editA5').val()
                }
            },
            rating: $('#editRating').val(),
            difficulty: $('#editDifficulty').val(),
            category: $('#editCategory').val(),
            id: this.props.quizId

        }
        console.log(data);
        fetch('/editQuiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }


    render() {

        return (
            <Modal show={this.props.show} handleClose={this.props.hideEditModal}>
                <input type='text' placeholder='Title' id='editTitle'></input>
                <br />
                <input type='text' placeholder='Question 1' id='editQ1'></input>
                <input type='text' placeholder='Answer 1' id='editA1'></input>
                <br />
                <input type='text' placeholder='Question 2' id='editQ2'></input>
                <input type='text' placeholder='Answer 2' id='editA2'></input>
                <br />
                <input type='text' placeholder='Question 3' id='editQ3'></input>
                <input type='text' placeholder='Answer 3' id='editA3'></input>
                <br />
                <input type='text' placeholder='Question 4' id='editQ4'></input>
                <input type='text' placeholder='Answer 4' id='editA4'></input>
                <br />
                <input type='text' placeholder='Question 5' id='editQ5'></input>
                <input type='text' placeholder='Answer 5' id='editA5'></input>
                <br />
                <input type='text' placeholder='Difficulty' id='editDifficulty'></input>
                <input type='text' placeholder='Category' id='editCategory'></input>
                <input type='number' placeholder='Rating' id='editRating'></input>
                <br />
                <button onClick={this.editQuiz}>Edit</button>
            </Modal>
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
export default EditModal;