import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Divider,
  Progress,
  Button,
  Tooltip,
  Icon,
  Tag,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './UserDashboard.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ episodes, loading }) => ({
  episodes,
  loading: loading.models.episodes,
}))
@Form.create()
class UserDashboard extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'episodes/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      episodes: { episodes },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: 'Submit', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="progress">In Progress</RadioButton>
          <RadioButton value="completed">Completed</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="Search" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 10,
    };

    const ListContent = ({ data: { owner, createdAt, updatedAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Uploaded</span>
          <p>{moment(createdAt).format('MM/DD/YY')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Finished</span>
          <p>{status == 'Finished' ? moment(updatedAt).format('MM/DD/YY') : 'N/A'}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Episode Status</span>
          <p>
            {status}{' '}
            {status == 'Finished' ? (
              <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            ) : (
              <Icon type="clock-circle" theme="twoTone" />
            )}
          </p>
        </div>
      </div>
    );

    const DownloadBtn = props => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="0">
              <List.Item>
                <List.Item.Meta
                  description={<span><Tag color="#f50">42MB</Tag> <Tag color="#2db7f5">4m 35s</Tag></span>}
                  title={<span><b>Version 2</b><Divider type="vertical" />3 Hours Ago</span>}
                />
              </List.Item>
            </Menu.Item>
            <Menu.Item key="1">
              <List.Item>
                <List.Item.Meta
                  description={<span><Tag color="#f50">41MB</Tag> <Tag color="#2db7f5">4m 23s</Tag></span>}
                  title={<span><b>Version 1</b><Divider type="vertical" />7 Hours Ago</span>}
                />
              </List.Item>
            </Menu.Item>
          <Menu.Divider />
        </Menu>
        }
      >
        <a>
          Download <Icon type="down" />
        </a>
      </Dropdown>
    );    

    const DeleteBtn = props => (
        <a 
          /*Modal.confirm({
            title: 'Delete',
            content: 'Are you completely sure you want this deleted?',
            okText: 'Do it!',
            cancelText: 'Go Back',
            onOk: () => this.deleteItem(props.current.id),
          })*/
         key="delete">Delete</a>
    );

    const episodeAlert = episodesLeft => (
      <div>
        <span>Total Episodes</span>{' '}
        <Tooltip
          title={episodesLeft + ' ' + formatMessage({ id: 'component.userDashboard.episodeAlert' })}
        >
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />
          </a>
        </Tooltip>
      </div>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Podcast Name" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Required' }],
              initialValue: current.title,
            })(<Input placeholder="The Super Duper Podcast" />)}
          </FormItem>
          <FormItem label="Due Date" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: 'Required' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="Due Date"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="Owner" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: 'Required' }],
              initialValue: current.owner,
            })(
              <Select placeholder="David">
                <SelectOption value="David">David</SelectOption>
                <SelectOption value="Mary">Mary</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="Episode Name">
            {getFieldDecorator('subDescription', {
              rules: [{ message: 'Please keep it unde 50 characters!', max: 50 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="Episode Nameasda" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title={episodeAlert(0)} value="10" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Files Uploaded" value="13" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Monthly Revisions Remaining" value="4" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="My Episodes"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              Upload New Episode
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={episodes}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      Edit
                    </a>,
                    <DeleteBtn current={item}/>,
                    <DownloadBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `${current.id ? 'Edit' : 'Upload New'} Episode`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default UserDashboard;
