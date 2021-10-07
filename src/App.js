import './App.css';
import {Row, Col, Input, Divider, Modal, Progress} from "antd";
import {useEffect, useState} from "react";
import {getInstance} from "d2";
import HeaderBar from "@dhis2/d2-ui-header-bar"
import {Button, Pane, Text} from "evergreen-ui";

function App() {

  const [D2, setD2] = useState();
  const [alertModal, setAlertModal] = useState(false);
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState("normal");
  const [messageText, setMessageText] = useState("Checking excel sheet.....");


  const handleCancel = () => {
    setAlertModal(false);
  };

  return (
      <div className="App">
        <div>
          {D2 && <HeaderBar className="mb-5" d2={D2}/>}
          <Modal visible={alertModal} onOk={()=>{handleCancel()}} onCancel={()=>{handleCancel()}} footer={false}>
            <div className="d-flex flex-column w-100 align-items-center py-4">
              <Text size={800} classname="mb-3">
                <b>{messageText}</b>
              </Text>
              <Progress type="circle" className="mt-3" percent={status} status={statusText}/>
            </div>

          </Modal>
          <div className="mt-5 d-flex justify-content-center align-items-center">
            <Pane
                elevation={1}
                float="left"
                margin={24}
                className="w-75 p-4"
                display="flex"
                background="tint2"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
              <h5>
                <strong>Stratum Name Update</strong>
              </h5>

              <Text size={500}>
                <strong>Select Stratum and enter replacement text</strong>
              </Text>

              {[].length !== 0 ? <div className="spinner-border mx-2 indigo-text spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div> : null}

              <Divider className="mx-2" plain/>

              <Row className="w-50 mt-3">
                <Col span={12}>
                  <Input
                      type="file"
                      style={{ width: "100%" }}
                      accept=".xlsx, .xls, .csv"
                      placeholder="select excel file"
                      size="large"
                      className="mt-2 w-100"
                  />
                </Col>
                <Col span={12}>
                  <Input
                      type="file"
                      style={{ width: "100%" }}
                      accept=".xlsx, .xls, .csv"
                      placeholder="select excel file"
                      size="large"
                      className="mt-2 w-100"
                  />
                </Col>

              </Row>
              <Row className="w-25 mt-4">
                <Col span={24}>
                  <Button appearance="primary">
                    POST
                  </Button>
                </Col>
              </Row>
            </Pane>
          </div>
        </div>
      </div>

  );
}

export default App;
