import { useState } from "react";
import { Col, Row, Skeleton, Table } from "antd";
import { useAllSalesQuery } from "../../../redux/features/sales/salesApi";
import { SerializedError } from "@reduxjs/toolkit";
import type { TableColumnsType } from "antd";
import { TSales } from "../../../types/types";


const AllSalesHistory = () => {
  const { data: allHistory, isLoading, error } = useAllSalesQuery({});
  //   const User = useAppSelector(selectCurrentUser);

  const [filter, setFilter] = useState<string>("all-history");

  //   const userFilteredData = (allHistory?.data || []).filter((item: TSales | null) => {
  //     return item && item.userId === User!.userId;
  //   });

  const columns: TableColumnsType<TSales> = [
    {
      title: "Buyer Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Postal Code",
      dataIndex: "postal_code",
      key: "postal_code",
    },
    {
      title: "Products Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sales Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const filterData = (data: TSales[], selectedFilter: string) => {
    const currentDate = new Date();
    switch (selectedFilter) {
      case "weekly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate >=
            new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
        });
      case "daily":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === currentDate.toDateString();
        });
      case "monthly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "yearly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate.getFullYear() === currentDate.getFullYear();
        });
      default:
        return data;
    }
  };

  //   const filteredData = filterData(userFilteredData, filter);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }

  const filteredData = filterData(allHistory?.data || [], filter);

  return (
    <>
      <div>
        <Row >
        <Col span={24}>
          <h3 className="text-center">
            Electronics Gadget Sales History
          </h3>
        </Col>
        </Row>
      </div>
      <hr />
      <div style={{ marginBottom: 10, marginTop: 10, width: 100 }}>
        <label htmlFor="select-history">Select History</label>
        <br />
        <select
        
          className="gInput"
          id="select-history"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all-history">All History</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1500, y: 300 }}
      />
    </>
  );
};

export default AllSalesHistory;
