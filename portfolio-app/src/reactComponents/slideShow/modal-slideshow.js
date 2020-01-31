import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal-slideshow.css';
 
Modal.setAppElement('body');

class ModalSlideshow extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
  render() {
    return (
      <div>
        <button onClick={this.openModal}>Read More</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Example Modal"
          className = "modal-body"
          overlayClassName = "modal-overlay"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <p className = "modal-text">Testing out the modal, gonna check if I can pass some data here soon.</p>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default ModalSlideshow;