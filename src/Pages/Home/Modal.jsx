import { Button, Modal, Form, Input, Select, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalCreate({ isShowModal, close, loadData, dataCurrent }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataCurrent) {
      form.setFieldsValue(dataCurrent);
    } else {
      form.setFieldsValue(null);
    }
  }, [dataCurrent]);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      let result;
      if (!!dataCurrent) {
        result = await axios.put(
          "https://be-education-nodejs.onrender.com/violates",
          {
            id: dataCurrent.id,
            ...values,
          }
        );
      } else {
        result = await axios.post(
          "https://be-education-nodejs.onrender.com/violates",
          values
        );
      }

      if (result.data.mess == "OK") {
        form.resetFields();
        close();
        loadData();
        setLoading(false);
        notification.success({
          message: dataCurrent ? "Sửa thành công " : "Tạo thành công  !!!",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: dataCurrent ? "Sửa lỗi !!! " : "Tạo lỗi!!!",
        duration: 2,
      });
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    close();
    form.resetFields();
  };

  return (
    <Modal
      title="Tạo hàng mới"
      visible={isShowModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="Tên học sinh"
          name="NameStudent"
          rules={[
            {
              required: true,
              message: "Điền học tên sinh!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên vi phạm"
          name="NameViolate"
          rules={[
            {
              required: true,
              message: "Điền tên hành vi !",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          {dataCurrent ? "EDIT" : "CREATE"}
        </Button>
      </Form>
    </Modal>
  );
}

export default ModalCreate;
