import React, { Component } from 'react';
import './quiz.css';
import Modals from '../modals/quizModal.js/index.js.js'

class Quizzes extends Component {
    constructor() {
        super();
        this.state = {
            quizzes: []
        }
    }
    componentDidMount() {
        console.log("reload");
        fetch('/api/quizzes')
            .then(res => res.json())
            .then(quizzes => this.setState({ quizzes }, () => console.log("Quizzes fetched...", quizzes)));
    }
    render() {
        return (
            <div>
                <h2>QUIZZES</h2>
                {this.state.quizzes.map(quiz =>
                    <Modals quiz={quiz} />
                )}
            </div>
        );
    }
}



export default Quizzes;
