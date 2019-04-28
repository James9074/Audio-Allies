import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Checkbox, Input, Radio, Button, Select, Divider, InputNumber } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const RadioGroup = Radio.Group;

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  state = {
    id: 1,
  }
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };    
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/form/step-form/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Episode Name">
            {getFieldDecorator('receiverName', {
              initialValue: '',
              rules: [{ required: true, message: 'Please enter an episode name!' }],
            })(<Input placeholder="Enter a name for this episode" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Length">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: 'Please enter an episode length' }],
            })(
              <div>
                <InputNumber size={2} style={{width:"75px"}}/> Hours &nbsp;&nbsp;
                <InputNumber size={2} style={{width:"75px"}}/> Minutes
              </div>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Desired Length">
            <RadioGroup onChange={(e)=>{console.log(e.target.value);this.setState({id:e.target.value})}} value={this.state.id}>
              <Radio style={radioStyle} value={1}>Keep current length</Radio>
              <Radio style={radioStyle} value={2}>
                Edit it down or up to a specific length
                {this.state.id === 2 ? 
                  <div style={{marginTop:"5px"}}>
                    <InputNumber size={2} style={{width:"75px"}}/> Hours &nbsp;&nbsp;
                    <InputNumber size={2} style={{width:"75px"}}/> Minutes
                  </div> 
                  : null}
              </Radio>
            </RadioGroup>
          </Form.Item>
          
          <Form.Item {...formItemLayout} label="Rush Order">
          <Checkbox onChange={()=>{}}>24 hour rush order (adds $100 to cart)</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              Next
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Notice</h3>
          <p>
            While Audio Allies would like to guarantee the successful completion of any rush order, we may not be able to complete every rush order on time.
            In the event that this occurs, you will be notified within 12 hours and your rush fee will be refunded in full.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
