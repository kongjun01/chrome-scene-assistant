/*global chrome*/

import React from 'react';
import {
  Switch,
  Form,
  Input,
  Button,
  Divider
} from 'antd';
import './App.css';


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpenScene: false,
      cookieName: '',
      cookieValue: ''
    };
  }

  componentDidMount() {
    chrome.storage.sync.get(['isOpenScene', 'cookieName', 'cookieValue'], (result) => {
      this.setState({
        isOpenScene: result.isOpenScene,
        cookieName: "__duibaServiceGroupKey",
        cookieValue: result.cookieValue
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (err) {
        return;
      }

      chrome.storage.sync.set(values);
      window.close();
      // chrome.runtime.sendMessage(values, function (response) {
      //   console.log('success');
      // });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="App">
        <Divider>兑吧多场景插件(v1.0)</Divider>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="CookieName:">
            {getFieldDecorator('cookieName', {
              initialValue: this.state.cookieName,
              rules: [
                {
                  required: true,
                  message: 'Please input cookieName',
                },
              ]
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="CookieValue:">
            {getFieldDecorator('cookieValue', {
              initialValue: this.state.cookieValue,
              rules: [
                {
                  required: true,
                  message: 'Please input cookieValue',
                },
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否开启:">
            {getFieldDecorator('isOpenScene', {
              valuePropName: 'checked',
              initialValue: this.state.isOpenScene
            })(<Switch />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 85 }}>
              保存
          </Button>
          </Form.Item>
        </Form>
      </div >
    );
  }
}

export default Form.create()(App);
