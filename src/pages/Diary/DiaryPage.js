import React, { Component } from 'react'
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import './DiaryPage.css';
import Calendar from 'react-calendar';
import AddNoteButton from '../../components/AddNoteButton/AddNoteButton';
import Modal from 'react-modal';
import { Redirect } from 'react-router';
import firebaseConnection from '../../firebase/config'
import 'firebase/database';



const style = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };



export class DiaryPage extends Component {

    mounted = false;

    constructor(props) {
        super(props);
        
        this.state = {
            date: new Date(Date.now()),
            notes: [],
            modalIsOpen: false,
            note: {
                id: null,
                title: null,
                desc: null,
                user: null
            },
            user: firebaseConnection.auth().currentUser
        }
    }


    componentDidMount() {
        this.mounted = true;
        let ref = firebaseConnection.database().ref().child('notes');
        ref.on('value', (snapshot) => {
            let notes = snapshot.val();
            let newState = [];
            for (let note in notes) {
                if(notes[note].user === firebaseConnection.auth().currentUser.uid) {
                    newState.push({
                        id: note,
                        title: notes[note].title,
                        desc: notes[note].desc,
                        date: notes[note].date,
                        user: firebaseConnection.auth().currentUser.uid
                    })
                }
            }
            this.setState({
                notes: newState
            });
        })
    }


    componentWillUnmount() {
        this.mounted = false;
    }


    openModal = () => {
        this.setState({modalIsOpen: true});
    }



    closeModal= () => {
        this.setState({modalIsOpen: false});
    }



    dateOnChange = (date) => {
        this.setState({
            date: date,
        })
    }



    getNotes = () => {
        return this.state.notes.filter((note) => {
            return new Date(note.date).toDateString()  === new Date(this.state.date).toDateString();
        })
    }



    addNote = (title, desc) => {
        if (title!== null && desc!==null) {
            let ref = firebaseConnection.database().ref('notes');
            ref.push().set({
                id: this.state.notes.length,
                title: title,
                desc: desc,
                date: this.state.date.toDateString(),
                user: firebaseConnection.auth().currentUser.uid
            })
        }
    }



    showNote = (id) => {
        let foundNote = this.state.notes.find((note) => {
            return (note.id === id)
        });
        return(
            this.setState({
                modalIsOpen: true,
                note: {
                    id: foundNote.id,
                    title: foundNote.title,
                    desc: foundNote.desc,
                    date: foundNote.date,
                    user: foundNote.user
                }
            })
        );
    }


    deleteNote = () => {
        let ref = firebaseConnection.database().ref('notes');
        ref.child(this.state.note.id).remove();
        this.closeModal();
        return <Redirect to="/"/>
    }



    createCalendar = () => {
        return (
            <div className="calendar">
                <Calendar 
                    onChange={this.dateOnChange}
                    value={this.state.date}/>
            </div>
        )
    }


    createNoteList = () => {
        return (
            <ul className="list">
                {this.getNotes().map((note) => {
                    return (
                            <li key={note.id.toString()} onClick={() => this.showNote(note.id)}>
                                <a href="# ">{note.title}</a>
                            </li>
                    );
                })}
            </ul>
        )
    }


    createModalShowNote = () => {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                style={style}>
                    <h2>{this.state.note.title}</h2>
                    <div>
                        <textarea className="input_ textarea-show"
                                type="text" disabled
                                value={this.state.note.desc}/>
                    </div>
                <button className="btn_ mid" onClick={this.closeModal}>Close</button>
                <button className="btn_ mid" onClick={this.deleteNote}>Delete</button>
            </Modal>
        )
    }

    
    createBodyBlock = () => {
        return (
            <div className="Body">
                <div className="block">
                    <div className="block-content">
                        {this.createCalendar()}
                        <div>
                            {this.createNoteList()}
                            {this.createModalShowNote()}
                            <AddNoteButton add={(title, desc) => this.addNote(title, desc)}/>
                        </div>
                        <div className="logout-button">
                            <LogoutButton/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    render() {
        return (
            (this.state.user) ? this.createBodyBlock() : <Redirect to="/"/>
        )
    }
}



export default DiaryPage
