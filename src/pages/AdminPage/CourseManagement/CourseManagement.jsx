import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag, message } from 'antd';
import { https } from '../../../services/api';
import { ButtonStyled } from '../../../components/ButtonStyled/ButtonStyled';
import Modal from 'antd/es/modal/Modal';
import confirm from 'antd/es/modal/confirm';
import FormAddCourse from './FormAddCourse';

export default function CourseManagement() {
  const [listCourse, setListCourse] = useState([]);

  let fetchCourseList = () => {
    https.get("api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
      .then((res) => {
        console.log("danh sách khóa học nè", res.data);
        setListCourse(res.data)
        localStorage.setItem("ADD_COURSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchCourseList()
  }, []);


  let handleDelete = async (id) => {
    try {
      await https.delete(`api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${id}`)
      message.success("Xóa thành công")
      fetchCourseList()
    }
    catch (error) {
      message.error(error.response.data)
      console.log(error)
    }
  }

  let AddConfirm = () => {
    //Close modal
    const handleClose = () => {
      Modal.destroyAll();
    };

    confirm({
      title: <div className='flex justify-between items-center'>
        <h1 className='titleFuntion space-x-5'>THÊM KHÓA HỌC</h1>
        <Button onClick={handleClose} className="bg-red-500 text-white"><i class="fa fa-times"></i></Button>
      </div>,
      content: <FormAddCourse />,
      okButtonProps: { style: { display: 'none' } },
      width: '50%'
    })
  }

  const columns = [
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (key) => <img width={100} src={key} alt="hình ảnh khóa học" />
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem',
    },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',
      render: (key) => <p>{key.hoTen}</p>
    },

    {
      title: 'Điều chỉnh',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          {/* Duyệt  */}
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </Button>


          {/* SỬA */}
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </Button>

          {/* XÓA */}
          <Button>
            <svg onClick={() => { handleDelete(record.maKhoaHoc) }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className="w-6 h-6 text-red-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='admin__courseMgt'>
      <div className='courseMgt__content'>
        <h1 className='uppercase text-2xl text-center font-semibold'>quản lý khoá học</h1>

        {/* button add */}
        <div className='courseMgtCont__btnAdd'>
          <ButtonStyled onClick={AddConfirm}>Thêm khoá học</ButtonStyled>
        </div>

        {/* search bar */}
        <div className='courseMgtCont__searchBar my-6 flex md:block'>
          <input type='search' placeholder='Nhập mã hoặc tên khoá học' className='searchIn__style h-10 w-full px-2 rounded' />
          <ButtonStyled className='w-28 ml-4 md:mt-2 md:ml-0'>Tìm kiếm</ButtonStyled>
        </div>

        {/* table of courses */}
        <div className='courseMgtCont__table mt-12 mb-6'>
          <Table className='tblContent' columns={columns} dataSource={listCourse} pagination={{ pageSize: 10 }} />
        </div>
      </div>
    </div>
  )
}
