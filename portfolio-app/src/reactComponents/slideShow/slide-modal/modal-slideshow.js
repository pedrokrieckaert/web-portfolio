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
      let followProj;

      if(this.props.projData.link !== ""){
          followProj = <a className = "btn" href = {this.props.projData.link} target = "blank">View this porject</a>;
      }else{
          followProj = null;
      }
    return (
      <div  className = "modal-open">
        <button className = "btn modal-open" onClick={this.openModal}>Read More</button>
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
          <h2 className = "modal-head" ref={subtitle => this.subtitle = subtitle}>{this.props.projData.name}</h2>
          <ul className = "modal-skill">
                            {Array.from({
                                length: this.props.projData.skills.length},
                                (_, index) => (
                                    <li key = {index}>&bull; {this.props.projData.skills[index]}</li>
                                )
                            )}
                        </ul>
          <img className = "modal-img" src = {this.props.projData.image.src} alt = {this.props.projData.image.alt}></img>
          <p className = "modal-text">{this.props.projData.detaildesc}</p>
          <div>{followProj}</div>
          <button className = "btn modal-close" onClick={this.closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    );
  }
}


export default ModalSlideshow;