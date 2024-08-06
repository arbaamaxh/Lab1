import React from 'react';
import HospitalList from '../components/Hospital/HospitalList';
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

const Hospitals = () => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Hospitals</CardTitle>
            </CardHeader>
            <CardBody>
              <HospitalList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Hospitals;