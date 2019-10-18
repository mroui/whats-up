import React, { Component } from 'react'
import '../Button.css';
import Modal from 'react-modal';


const style = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      minHeight: '200px',
      height: '45%',
      width: '30%'
    }
  };


export class AddNoteButton extends Component {

      state = {
        modalIsOpen: false,
        title: "",
        description: ""
      }

    
      openModal = () => {
        this.setState({modalIsOpen: true});
      }


      closeModal = () => {
        this.setState({modalIsOpen: false});
      }


      addNote = () => {
        if(this.state.title!=="" && this.state.description!=="") {
          this.props.add(this.state.title, this.state.description);
          this.closeModal();
        }
      }


      onChangeTitle = (event) => {
        this.setState({title: event.target.value});
      }


      onChangeDesc = (event) => {
        this.setState({description: event.target.value});
      }


      createModalAddNote = () => {
        return (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            style={style}>
            <h2>Add note</h2>
            <input className="input_" placeholder="Title" maxLength="50" type="text" onChange={this.onChangeTitle}/>
            <textarea className="input_ textarea-scroll" placeholder="Some text..." type="text" onChange={this.onChangeDesc}/>
            <button className="btn_ small" onClick={this.addNote}>Add</button>
            <button className="btn_ small" onClick={this.closeModal}>Cancel</button>
          </Modal>
        )
      }


      createContent = () => {
        return (
          <div>
            <a href="# " className="btn_" onClick={this.openModal}>Add Note</a>
            {this.createModalAddNote()}
          </div>
        )
      }


    render() {
        return (
            this.createContent()
        )
    }
}


export default AddNoteButton
