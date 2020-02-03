import React, { useState, useReducer, useEffect } from 'react';
import { UseGlobalSettings } from '../Global';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { SettingsReducer } from './SettingsReducer';
import SimpleForm from './forms/SimpleForm';
import NormalForm from './forms/NormalForm';
import AdvancedForm from './forms/AdvancedForm';

export default function DeployForm() {
  const [globalSettings, globalSettingsActions] = UseGlobalSettings();

  const [state, dispatch] = useReducer(SettingsReducer, globalSettings);

  type formLevel = '1' | '2' | '3' | undefined;

  const [form, setForm] = useState<formLevel>(undefined);

  useEffect(() => {
    dispatch({
      type: 'reset',
      value: globalSettings
    });
  }, [globalSettings]);

  const submit = (e: any) => {
    e.preventDefault();

    globalSettingsActions.setSettings(state);
  };

  const renderSwitch = (param: formLevel) => {
    switch (param) {
      case '1':
        return <SimpleForm dispatch={dispatch} state={state} />;
      case '2':
        return null;
      case '3':
        return null;
      default:
        return null;
    }
  };

  const changeForm = (form: '1' | '2' | '3') => (e: any) => {
    setForm(form);
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <Button variant="outline-primary" onClick={changeForm('1')}>
                I'm New!
              </Button>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={changeForm('2')}>
                Help me out
              </Button>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={changeForm('3')}>
                I know what I'm doing
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>{renderSwitch(form)}</Col>
          </Row>
          {form && (
            <Row className="mt-2">
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </Form>

      <pre>{JSON.stringify(state, null, 1)}</pre>
    </>
  );
}
