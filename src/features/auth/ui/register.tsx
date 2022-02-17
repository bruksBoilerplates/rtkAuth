import { Form, Input, Typography, Card, Button,Col, Row,Select } from "antd";
import { useHistory, Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {signup} from "../auth.reducer";
import {selectAuth} from "../auth.selectors";
import { useEffect, useState } from "react";
import validator from "validator";
import Routes from "../../../Constants/routes";
import {LOG_g, Status } from "../../utils";
import {LeftCircleOutlined} from "@ant-design/icons";
import {setButtonColor} from "./utils";

const { Title, Text } = Typography;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            defaultValue={"+251"}
            style={{
                width: 80,
            }}
        >
            <Select.Option value="251">+251</Select.Option>
        </Select>
    </Form.Item>
);

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    //destructuring  the auth
    const { loadingStatus } =selectAuth(state);
    const [button, setButton]= useState({color:'primary', text:"Sign Up"})
    const [error, setError]= useState('')

    useEffect(() => {
        setButtonColor(loadingStatus, setButton)
    }, [loadingStatus]);




  const handleSubmit = (values) => {
      console.log("handleSubmit", values)

   const data={
     firstname: values.first_name,
     lastname: values.last_name,
     phone: values.phone,
     email: values.email,
     password: values.password,
   }
   dispatch(LOG_g("handleSubmit", data))
      if (validator.isEmpty(data.email) || validator.isEmpty(data.password) ||validator.isEmpty(data.firstname)) {
          setError("All fields are required!");
          return;
      }
      if (!validator.isEmail(values.email)) {
          setError("Invalid email format!");
          return;
      }
   dispatch(signup(data, history))

  };

    // @ts-ignore
    return (
    <>


        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
        >
          <Card hoverable style={{ width: "500px" }}>
              <Typography.Text>
                  <LeftCircleOutlined /> <Link to="/">Home</Link>
              </Typography.Text>
              <div style={{ display:"flex",justifyContent:"center"}}>

                  <Title  level={3}> Create account</Title>
              </div>

            <Form  onFinish={handleSubmit}>


              {/*  ----------------   first & last name  --------------   */}
              <Form.Item  >
                <Input.Group >
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item rules={[{ required: true }]} name="first_name">

                        <Input size="large" placeholder="first name"  name="first_name" />
                      </Form.Item >
                    </Col>
                    <Col span={12}>
                      <Form.Item rules={[{ required: true }]} name="last_name">
                        <Input size="large" placeholder="last name" name="last_name" />
                      </Form.Item >
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
                {/*      ---------------  phone       --------*/}
                <Form.Item
                    name="phone"
                    label="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

              {/* ----------------   email  -------------------   */}
              <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              {/*  ---------------------   password     -----------------------------*/}
              <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
                {error?<Text type="danger">{error}</Text>:""}


              <Form.Item>

                <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                >
                  {/*    -----------------------   Submit ------------------------- */}
                  <Button
                      // @ts-ignore
                      type={button.color}
                      htmlType="submit"
                      style={{ width: "200px" }}
                  >
                     Signup
                  </Button>

                </div>
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  Already have accout? <Link to={Routes.LOGIN}>Login</Link>
                </Typography.Text>
              </Form.Item>
            </Form>
          </Card>
        </div>



      {/*</div>*/}
    </>
  );
};

export default Register;
