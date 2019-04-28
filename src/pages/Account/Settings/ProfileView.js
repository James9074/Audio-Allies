import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { List } from 'antd';
// import { getTimeDistance } from '@/utils/utils';

const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};

class ProfileView extends Component {
  getData = currentUser => [
    {
      title: formatMessage({ id: 'app.settings.profile.name' }, {}),
      description: <Fragment>{currentUser.name}</Fragment>,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.profile.email' }, {}),
      description: <Fragment>{currentUser.email}</Fragment>,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.profile.contactInfo' }, {}),
      description: <Fragment>None Provided</Fragment>,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  render() {
    const currentUser = this.props.currentUser;
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData(currentUser)}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default ProfileView;
