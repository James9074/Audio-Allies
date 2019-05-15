import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col } from 'antd';
import styles from './index.less';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class Memberships extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  membershipPackages = [
    {
      name: "Audio Allies Basic",
      icon: "https://snag.gy/DhBy8N.jpg",
      price: "$50 per Podcast",
      episodeLimit: "1 Episode per Month",
      maxTimeEdited: "(max 30 mins. per episode)",
      benefits: [
        "30 Min. Audio Consultation",
        "Editing",
        "Mastering"
      ]
    },
    {
      name: "Audio Allies Premium",
      icon: "https://snag.gy/xsmi3u.jpg",
      price: "$150 per Month",
      episodeLimit: "2 Episodes per Month",
      maxTimeEdited: "(max 2 hour total content per month)",
      benefits: [
        "1 Hour Audio Consultation",
        "Editing",
        "Mastering",
        "ID3 Tagging",
        "Show Notes"
      ]
    },
    {
      name: "Audio Allies Exclusive",
      icon: "https://snag.gy/7DyLUE.jpg",
      price: "$250 per Month",
      episodeLimit: "4 Episodes per Month",
      maxTimeEdited: "(max 4 hours total content per month)",
      benefits: [
        "2 Hours Audio Consultation",
        "Editing",
        "Mastering",
        "ID3 Tagging",
        "Show Notes",
        "Music",
        "Sound Effects",
        "Intro/Outro",
        "Production",
        "Album Artwork",
        "Upload to Podcast Platform",
        "Promo Clip"
      ]
    }
  ]

  render() {
    const {
      currentUser,
      currentUserLoading
    } = this.props;

    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24} type="flex">
        {this.membershipPackages.map((membership, index) => {
            return <Col lg={8} xs={24} key={index}>
            <Card bordered={false} style={{ marginBottom: 24, height: "600px" }} loading={currentUserLoading}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.membershipHolder}>
                    <img alt="" src={membership.icon} />
                    <div className={styles.name}>{membership.name}</div>
                    <div>{membership.price}</div>
                    <div>{membership.episodeLimit}</div>
                    <div>{membership.maxTimeEdited}</div>
                    <br/>
                    <div>
                      <h3>Benefits</h3>
                      {membership.benefits.map((benefit) => {
                        return <div>{benefit}</div>
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
        })}
        </Row>
      </GridContent>
    );
  }
}

export default Memberships;
