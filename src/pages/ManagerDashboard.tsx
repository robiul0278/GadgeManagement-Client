import { Card, Col, Row } from "antd";

const ManagerDashboard = () => {
  return (
    <Row gutter={16}>
    <Col span={12}>
      <Card title="All Gadgets" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={12}>
      <Card title="Total Sale Gadgets" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={12}>
      <Card title="Total Sale Amounts" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={12}>
      <Card title="Total Users" bordered={false}>
        Card content
      </Card>
    </Col>
  </Row>
  )
}

export default ManagerDashboard;