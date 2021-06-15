import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CustomNavLink from './CustomNavLink';
import CustomDropdownNavLink from './CustomDropdownNavLink';
import CustomDropdownItem from './CustomDropdownItem';
import './Navbar.css'

export default function CustomNavbar() {
  let username = JSON.parse(sessionStorage.getItem('userInfo')).username;

  const displayUsername = () => {
    return(
      <span>
        <i className="fa fa-user-circle mr-2" aria-hidden="true"></i>
        {username}
      </span>
    )
  }

  return (
    <Navbar className="navbar--custom" variant="dark" bg="dark" expand="lg">
  <Container>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav className="nav--collapse">
        <CustomNavLink to="/" activeOnlyWhenExact={true} label={<i className="fas fa-home"></i>} />
        <CustomDropdownNavLink to="/quan-ly-xe" activeOnlyWhenExact={false} title="Quản lý xe" menuvariant="dark">
          <CustomDropdownItem to="/quan-ly-xe/tiep-nhan-xe" activeOnlyWhenExact={false} label="Tiếp nhận xe" />
          <CustomDropdownItem to="/quan-ly-xe/lap-phieu-sua-chua" activeOnlyWhenExact={false} label={"Lập phiếu sửa chữa"} />
          <CustomDropdownItem to="/quan-ly-xe/tra-cuu-xe" activeOnlyWhenExact={false} label={"Tra cứu"} />
        </CustomDropdownNavLink>

        <CustomNavLink to="/thu-tien" activeOnlyWhenExact={false} label={"Thu tiền"} />

        <CustomDropdownNavLink to="/quan-ly-phu-tung" activeOnlyWhenExact={false} title="Quản lý phụ tùng" menuvariant="dark">
          <CustomDropdownItem to="/quan-ly-phu-tung/nhap-phu-tung" activeOnlyWhenExact={true} label={"Nhập vật tư phụ tùng"} />
          <CustomDropdownItem to="/quan-ly-phu-tung/tra-cuu" activeOnlyWhenExact={true} label={"Tra cứu"} />
        </CustomDropdownNavLink>

        <CustomDropdownNavLink to="/lap-bao-cao" activeOnlyWhenExact={true} title={"Lập báo cáo"}  menuvariant="dark">
            <CustomDropdownItem to="/lap-bao-cao/ton-phu-tung" activeOnlyWhenExact={true} label={"Lập báo cáo tồn phụ tùng"} />
            <CustomDropdownItem to="/lap-bao-cao/doanh-thu-thang" activeOnlyWhenExact={true} label={"Lập báo cáo doanh thu tháng"} />
        </CustomDropdownNavLink>

        <CustomNavLink to="/cai-dat" activeOnlyWhenExact={true} label={"Cài đặt"} />
      </Nav>
      <Nav className="ml-auto">
      <CustomDropdownNavLink to="/tai-khoan" activeOnlyWhenExact={true} title={displayUsername()} menuvariant="dark"> 
              <CustomDropdownItem to="/doi-mat-khau" activeOnlyWhenExact={true} label={"Đổi mật khẩu"} />
              <CustomDropdownItem to="/dang-xuat" activeOnlyWhenExact={true} label={"Đăng xuất"} />
            </CustomDropdownNavLink>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
