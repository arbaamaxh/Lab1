// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Line } from 'react-chartjs-2';
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap';
import { fetchAppointmentData } from 'variables/chartData';

function Dashboard() {
    const [bigChartData, setBigChartData] = useState('data1');
    const [appointmentData, setAppointmentData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Fetch appointment data when the component mounts
        fetchAppointmentData().then(data => setAppointmentData(data));
    }, []);

    const setBgChartData = (name) => {
        setBigChartData(name);
    };

    return (
        <div className="content">
            <Row>
                <Col xs="12">
                    <Card className="card-chart">
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="6">
                                    <h5 className="card-category">Total Appointments</h5>
                                    <CardTitle tag="h2">Monthly Appointments</CardTitle>
                                </Col>
                                <Col sm="6">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button
                                            tag="label"
                                            className={classNames('btn-simple', { active: bigChartData === 'data1' })}
                                            color="info"
                                            size="sm"
                                            onClick={() => setBgChartData('data1')}
                                        >
                                            <span className="d-none d-sm-block">Appointments</span>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area">
                                <Line
                                    data={bigChartData === 'data1' ? appointmentData : {}}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
