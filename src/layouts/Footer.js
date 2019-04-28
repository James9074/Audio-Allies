import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'help',
          title: 'Need Help?',
          href: 'https://audio-allies.com',
          blankTarget: true,
        },

        {
          key: 'contact',
          title: 'Contact Us',
          href: 'https://audio-allies.com',
          blankTarget: true,
        },
        {
          key: 'twitter',
          title: <Icon type="twitter" />,
          href: 'https://twitter.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Audio Allies
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
