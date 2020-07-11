import 'react-chatbox-component/dist/style.css';
import MessageList from './MessageList';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: this.props.user
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  handleSendMessage = event => {
    event.preventDefault();
    const {message} = this.state;
    this.props.sendMessage(message); //send message via socket from client
    this.setState({message: ''});
  };

  scrollToBottom = () => {
    const chat = document.getElementById('end-of-chat');
    chat.scrollIntoView();
  };

  onSubmit = (message) => {
        this.props.messages.push({ 
            "text": message,
            "id": this.props.messages.length+1,
            "sender": {
            "name": "Stranger",
            "uid": this.state.user.uid,
            },
        });
  }
  
  render() {
    let {message} = this.state;
    return (
        
      <div className='chat-box'>
        <div className='msg-page'>
          <MessageList
            isLoading={this.props.isLoading}
            messages={this.props.messages} 
            user={this.props.user}
            renderMessage={this.props.renderMessage}
          />
          <div className='chat-box-bottom'>
            <div id='end-of-chat'></div>
          </div>
        </div>
        <div className='msg-footer'>
          <form
            className='message-form'
            onSubmit={this.handleSendMessage}>
            <div className='input-group'>
              <input
                type='text'
                className='form-control message-input'
                placeholder='Type something'
                value={message}
                onChange={event => this.setState({ message: event.target.value})}
                required
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ChatBox.propTypes = {
  messages: PropTypes.array,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  renderMessage: PropTypes.func,
  sendMessage: PropTypes.func
};


ChatBox.defaultProps = {
  user: {
    "uid": "user1"
  },
  isLoading: false,
};

export default ChatBox;