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
      sender
    } = this.props;

    return (
      <div>
          test
      </div>
    );
  }
}

export default ChatMessage;
