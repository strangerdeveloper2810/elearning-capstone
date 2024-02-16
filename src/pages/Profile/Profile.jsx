import { Avatar, Progress, Tabs } from 'antd'
import React, { useEffect } from 'react'
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled'
import EnrolledCourse from '../../components/EnrolledCourse/EnrolledCourse'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../../redux/userSlice/userSlice'
import axios from 'axios'
import { RANDOM_NUM, TOKEN_CYBERSOFT } from '../../services/constant'

export default function Profile() {
    const { profile } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    const fetchProfile = async () => {
        const authToken = JSON.parse(localStorage.getItem("TOKEN"));

        axios({
            method: "POST",
            url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung",
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${authToken}`
            }
        }).then((res) => {
            console.log("profile: ", res.data);
            dispatch(setProfile(res.data))
        }).catch((err) => {
            console.log("err", err);
        });
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    // todo: render student or teacher 
    const renderType = () => {
        if (profile?.maLoaiNguoiDung === "HV") {
            return (
                <div className='px-1.5 text-base' style={{ backgroundColor: "rgba(255, 191, 0, 0.7)" }}>Học viên</div>
            )
        } else {
            return (
                <div className='px-1.5 text-base' style={{ backgroundColor: "#aeaeaf" }}>Giảng viên</div>
            )
        }
    }

    // todo: render skills in profile 
    const renderSkills = () => {
        let arrSkills = [
            { percent: RANDOM_NUM + 35, name: "HTML5" },
            { percent: RANDOM_NUM + 30, name: "CSS3" },
            { percent: RANDOM_NUM + 20, name: "JavaScript" },
            { percent: RANDOM_NUM - 10, name: "React" },
            { percent: RANDOM_NUM, name: "Java" }
        ];

        return arrSkills.map((item, index) => {
            return (
                <div className='contentSkills__item mb-3' key={index}>
                    <p className='uppercase font-medium'>{item.name}</p>
                    <Progress percent={item.percent} strokeColor={'#1d7a85'} />
                </div>
            )
        })
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Thông tin cá nhân',
            children: (
                <>
                    <div className='tabs__profile grid grid-cols-2'>
                        <div className='profile__groupLeft sm:col-span-2'>
                            <p>
                                Họ Tên:
                                <span>{profile?.hoTen}</span>
                            </p>
                            <p>
                                Nhóm:
                                <span>{profile?.maNhom}</span>
                            </p>
                            <p>
                                Số Điện Thoại:
                                <span>{profile?.soDT}</span>
                            </p>
                        </div>
                        <div className='profile__groupRight sm:col-span-2'>
                            <p>
                                Email:
                                <span>{profile?.email}</span>
                            </p>
                            <p>
                                Tài khoản:
                                <span>{profile?.taiKhoan}</span>
                            </p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className='contentRight__skills mt-10'>
                        <h2 className='font-semibold text-3xl sm:text-2xl mb-5' style={{ color: "#191919" }}>Kỹ năng của bạn</h2>
                        <div className='contentSkills'>
                            {renderSkills()}
                        </div>
                    </div>
                </>
            )
        },
        {
            key: '2',
            label: 'Khoá học của tôi',
            children: (
                <div className='courses__content'>
                    <h1 className='capitalize font-semibold text-3xl'>Khoá Học Của Bạn</h1>
                    {profile?.chiTietKhoaHocGhiDanh?.length > 0 ? (
                        <EnrolledCourse enrolledCourses={profile?.chiTietKhoaHocGhiDanh} />
                    ) : (
                        <p className='mt-5 text-xl'>Bạn chưa đăng ký khoá học nào!</p>
                    )}
                </div>
            ),
        }
    ];

    return (
        <div className='profile py-24'>
            <div className='profile__content container py-10 grid grid-cols-5'>
                <div className='profileContent__left col-span-1 lg:col-span-5 lg:mb-12 flex flex-col items-center gap-3'>
                    <div className='contentLeft__avatar'>
                        <Avatar size={120} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`} />
                    </div>
                    <div className='contentLeft__name text-2xl font-bold'>
                        {profile?.hoTen}
                    </div>
                    <div className='contentLeft__type text-lg'>
                        {renderType()}
                    </div>
                    <div className='contentLeft__btnEdit mt-2'>
                        <ButtonStyled>Chỉnh sửa</ButtonStyled>
                    </div>
                </div>
                <div className='profileContent__right col-span-4 lg:col-span-5'>
                    {/* Tabs Info */}
                    <Tabs
                        className='contentRight__tabs'
                        onChange={onChange}
                        items={items}
                        defaultActiveKey='1'
                        type='card'
                    />
                </div>
            </div>
        </div>
    )
}