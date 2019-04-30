import React, { PureComponent } from 'react';
import { Row, Col, Comment, Avatar, Form, Button, List, Input, Card, Tooltip } from 'antd';
import moment from 'moment';
import styles from './index.less';

class ChatMessage extends PureComponent {

  render() {
    const {
      avatar,
      message,
      datetime,
      sender,
      isUser,
      className
    } = this.props;

    return (
      <div className={className} style={{display: "flow-root"}}>
        <div style={{float: isUser ? "left" : "right"}} className={[styles.messageBlock, isUser ? styles.otherUserBlock : styles.userBlock].join(' ')}>
            <Avatar src={avatar} className={ isUser ? styles.leftAvatar : styles.rightAvatar}/>
            <div>
                <div className={styles.messageMeta}>
                    <span className={styles.authorName} >{sender}</span>
                    <span className={styles.dateTime}>{datetime}</span>
                    <span>{isUser}</span>
                </div>
                <span>{message}</span>
            </div>
        </div>
        
      </div>
    );
  }
}

export default ChatMessage;
