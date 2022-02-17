import { Form, Input, Button, Typography, Card, Checkbox } from "antd";
import {LeftCircleOutlined} from "@ant-design/icons"
import { useHistory, Link } from "react-router-dom";
import validator from "validator";
import { useState, useEffect } from "react";

import {login} from "../auth.reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../auth.selectors";

import {Status} from "../../utils";

import { UserState} from "../../users/users.models";
import {setButtonColor} from "./utils";

const { Title, Text } = Typography;


const LoginWithEmail = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
    locError: "",
  });
  const {  rememberMe, locError } = credentials;

  useEffect(() => {
    setCredentials({ email: "", password: "", rememberMe: false, locError: "" });
  }, []);


  const handleErrors = (msg) => {
    setCredentials({ ...credentials, locError: msg });
  };
  const handleChecked = (e) => {
    setCredentials({ ...credentials, rememberMe: e.target.checked });
  };

  const handleSubmit = (values) => {
    const data={
      email: values.email,
      password: values.password,
    }
    if (validator.isEmpty(values.email) || validator.isEmpty(values.password)) {
      handleErrors("All fields are required!");
      return;
    }
    if (!validator.isEmail(values.email)) {
      handleErrors("Invalid email format!");
      return;
    }

    dispatch(login(data, history, rememberMe))
  };

  return (
    <>
      <LoginUi onFinish={handleSubmit} locError={locError}  onChange={handleChecked}/>
      {/*</div>*/}
    </>
  );
};

export default LoginWithEmail;

function LoginUi(props: { onFinish: (values) => void, locError: string, onChange: (e) => void,  }) {


  const state = useSelector(state => state)
  //destructuring  the auth

  const authStatus:UserState =selectAuth(state);
  const [button, setButton]= useState({color:'primary', text:"LoginWithEmail"})


  useEffect(() => {
    setButtonColor(authStatus.loadingStatus, setButton)
  }, [authStatus.loadingStatus]);


  return <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}>
    <div className="box-shadow" style={{width: 400, padding: 20}}>
      <Card hoverable style={{width: "500px"}}>

        <Typography.Text>
          <LeftCircleOutlined/> <Link to="/">Home</Link>
        </Typography.Text>

        <div style={{display: "flex", justifyContent: "center"}}>

          <Title level={3}> Login</Title>
        </div>

        {/* ==================  FORM ============================= */}


        <Form initialValues={{}} onFinish={props.onFinish}>
          {/* =====================  --------- email ---------- =======================*/}
          <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          {/* ---------------------======== === password =============-------------------------*/}
          <Form.Item
              name="password"
              rules={[
                {required: true, message: "Please input your password!"},
              ]}
          >
            <Input.Password size="large" placeholder="Password"/>
          </Form.Item>
          {/* ------------------------ ===== Errors ======== ----------------*/}
          {props.locError ? <Text type="danger">{props.locError}</Text> : ""}
          {authStatus.error ? <Text type="danger">{authStatus.error}</Text> : ""}
          {/*{status}*/}


          <Form.Item>
            <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "baseline"

                }
                }
            >
              <Form.Item>
                <Checkbox onChange={props.onChange}>Remember me</Checkbox>
              </Form.Item>

              {/*===================---------------  Submit Button ------------------===========*/}
              <Button

                  loading={authStatus.loadingStatus === Status.LOADING}
                  // @ts-ignore
                  type={button.color}
                  disabled={authStatus.loadingStatus === Status.LOADING}
                  htmlType="submit"
                  style={{width: "200px"}}
              >
                Login
              </Button>
            </div>
          </Form.Item>

          <Form.Item>

            <Typography.Text>
              Dont have account? <Link to="/signup">sign up</Link>
            </Typography.Text>
          </Form.Item>
        </Form>
      </Card>
      {/*<Link to="/signup">RegisterWIthPhone here</Link>*/}
    </div>
  </div>;
}

