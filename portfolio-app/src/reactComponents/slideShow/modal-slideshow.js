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
    this.setState({
        modalIsOpen: true,
    });
  }
 
  afterOpenModal() {
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
          onAfterOpen={this.props.clearTimer}
          onRequestClose={this.closeModal}
          onAfterClose={this.props.startTimer}
          style={ModalStyle}
          contentLabel="Projects Details"
          className = "modal-body"
          overlayClassName = "modal-overlay"
        >
        <div className = "modal-content-grid">
          <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.projData.name}</h2>
          <ul className = "modal-skill">
                            {Array.from({
                                length: this.props.projData.skills.length},
                                (_, index) => (
                                    <li key = {index}>&bull; {this.props.projData.skills[index]}</li>
                                )
                            )}
                        </ul>
          <img src = {this.props.projData.image.src} alt = {this.props.projData.image.alt}></img>
          <p className = "modal-text">{this.props.projData.desc}</p>
          <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>
      </div>
    );
  }
}


export default ModalSlideshow;