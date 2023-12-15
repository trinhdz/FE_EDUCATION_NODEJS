import { Button, Table, notification } from "antd";
import * as S from "./style";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreate from "./Modal";
import { ExportReactCSV } from "../../util/ExportReactCSV";

function Home() {
  ////
  let [dataSource, setDataSource] = useState([]);
  let [isShowModal, setIsShowModal] = useState(false);
  let [dataCurrent, setDataCurrent] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetAllViolate();
  }, []);

  const handleCloseModal = () => {
    setDataCurrent(null);
    setIsShowModal(false);
  };

  const handleDeleteUser = async (id) => {
    let result = await axios.delete(
      `https://be-education-nodejs.onrender.com/violates/${id}`
    );
    handleGetAllViolate();
    if (result.data.mess == "OK") {
      notification.success({
        message: "Xóa thành công  !!!",
        duration: 2,
      });
    }
  };

  const handleGetAllViolate = async () => {
    try {
      let result = await axios.get(
        "https://be-education-nodejs.onrender.com/violates"
      );
      result.data.forEach((item) => {
        item.createdAt = new Date(item.createdAt).toLocaleDateString();
        item.updatedAt = new Date(item.updatedAt).toLocaleDateString();
      });
      setDataSource(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Học Sinh",
      dataIndex: "NameStudent",
      key: "NameStudent",
    },
    {
      title: "Hành vi phạm lỗi",
      dataIndex: "NameViolate",
      key: "NameViolate",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div>
          <Button
            style={{ background: "green" }}
            onClick={() => {
              setDataCurrent(item);
              setIsShowModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            style={{ background: "red" }}
            onClick={() => handleDeleteUser(item.id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  const dataSourceWithIndex = dataSource.map((item, index) => ({
    ...item,
    index,
  }));

  return (
    <S.WrapperUserTable>
      <h1 style={{ textAlign: "center" }}>
        {isLoading ? "Đang lấy dữ liệu..." : "Danh sách của bạn"}
      </h1>
      <ExportReactCSV csvData={dataSource} fileName={"Sổ đầu bài"} />
      <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
        <Table
          dataSource={dataSourceWithIndex}
          columns={columns}
          pagination={false}
        />
      </div>
      <Button
        type="primary"
        style={{ width: "50%", margin: "0 auto" }}
        onClick={() => {
          setDataCurrent(null);
          setIsShowModal(true);
        }}
      >
        Add
      </Button>
      <ModalCreate
        isShowModal={isShowModal}
        dataCurrent={dataCurrent}
        close={handleCloseModal}
        loadData={handleGetAllViolate}
      ></ModalCreate>
    </S.WrapperUserTable>
  );
}

export default Home;
