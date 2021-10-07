import './App.css';
import {Row, Col, Input, Divider, Modal, Progress} from "antd";
import {useEffect, useState} from "react";
import {getInstance} from "d2";
import HeaderBar from "@dhis2/d2-ui-header-bar"
import {Button, Pane, Text, Select, SelectField, TextInputField} from "evergreen-ui";

function App(props) {

  const [D2, setD2] = useState();
  const [alertModal, setAlertModal] = useState(false);
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState("normal");
  const [messageText, setMessageText] = useState("Checking excel sheet.....");
  const [orgUnits, setOrgUnits] = useState(props.orgUnits);
  const [selectedUnit, setSelectedUnit] = useState({});
  const [textValue, setTextValue] = useState(null);

  useEffect(() => {
    setD2(props.d2);
    setOrgUnits(props.orgUnits);

  },[props]);

  const handleCancel = () => {
    setAlertModal(false);
  };

  function handlePost(){
    if(selectedUnit === "All"){
      console.log("all stratums");
    } else {
      var unit = orgUnits[orgUnits.findIndex(x => x.id === selectedUnit)];
      console.log(unit);
      var children = unit.organisationUnits;
      console.log(children);
    }


  }

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

              <Row className="w-75 mt-3">
                <Col span={12} className="p-3 text-left">
                  <SelectField width="100%"
                          label="Select organization Unit Group"
                          description="Select the stratum whose children you wish to change"
                          value={selectedUnit&&selectedUnit.displayName}
                          onChange={e => setSelectedUnit(e.target.value)}>
                    {orgUnits&&orgUnits.map((unit) => (
                        <option value={unit.id} selected={selectedUnit&&selectedUnit.id === unit.id}>
                          {unit.displayName}
                        </option>
                    ))}

                  </SelectField>
                </Col>
                <Col span={12} className="p-3 text-left">
                  <TextInputField
                      label="Enter Additional text"
                      description="Enter the additional text you want to add on the existing names"
                      placeholder="enter text"
                      value={textValue}
                      onChange={e => setTextValue(e.target.value)}
                  />
                </Col>

              </Row>
              <Row className="w-25 mt-4">
                <Col span={24}>
                  <Button appearance="primary" onClick={handlePost}>
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
