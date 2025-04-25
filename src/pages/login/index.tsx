import type { LoginParams } from '@/interface/user/login';
import { useEffect, type FC } from 'react';

import './index.less';

import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import logo from '@/assets/icons/logo.png';

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';

const initialValues: LoginParams = {
  username: '',
  password: '',
  // remember: true
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { logged } = useSelector(state => state.user);
  const { formatMessage } = useLocale();
  const { token } = antTheme.useToken();
  const { type } = useParams();

  const onFinished = (form: LoginParams) => {
    dispatch(loginAsync({...form, type}));
  };

  const handleLocationClick = () => {
    navigate('/login/location');
  };
  const handleAgentClick = () => {
    navigate('/login/agent');
  };
  const handleEnterpriseClick = () => {
    navigate('/login/enterprise');
  };

  return logged ? <Navigate to="/home" /> : (
    <div className="login-page" style={{ backgroundColor: 'white' }}>
      <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
        <img src={logo} style={{ display: 'block', width: '90px', margin: 'auto'}}/>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Welcome to Instacredits! {type && ` (${type[0].toUpperCase() + type.slice(1)})`}</h2>
        { type ? <>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'gloabal.tips.enterUsernameMessage',
                }),
              },
            ]}
          >
            <Input
              className='w-full'
              placeholder={formatMessage({
                id: 'gloabal.tips.username',
              })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'gloabal.tips.enterPasswordMessage',
                }),
              },
            ]}
          >
            <Input
              className='w-full'
              type="password"
              placeholder={formatMessage({
                id: 'gloabal.tips.password',
              })}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              <LocaleFormatter id="gloabal.tips.rememberUser" />
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="login-page-form_button">
              <LocaleFormatter id="gloabal.tips.login" />
            </Button>
          </Form.Item>
        </> : <>
          <Form.Item>
            <Button 
                type="primary" 
                className="login-page-form_button" 
                onClick={handleLocationClick}
            >
              <LocaleFormatter id="gloabal.tips.locationlogin" />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button 
                type="primary" 
                className="login-page-form_button" 
                onClick={handleAgentClick}
            >
              <LocaleFormatter id="gloabal.tips.agentlogin" />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button 
                type="primary" 
                className="login-page-form_button" 
                onClick={handleEnterpriseClick}
            >
              <LocaleFormatter id="gloabal.tips.enterpriselogin" />
            </Button>
          </Form.Item>
        </>}
      </Form>
    </div>
  );
};

export default LoginForm;
