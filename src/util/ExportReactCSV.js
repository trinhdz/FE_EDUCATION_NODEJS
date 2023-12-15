import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "antd";

export const ExportReactCSV = ({ csvData, fileName }) => {
  return (
    <Button>
      <CSVLink data={csvData} filename={fileName}>
        Export Excel
      </CSVLink>
    </Button>
  );
};
