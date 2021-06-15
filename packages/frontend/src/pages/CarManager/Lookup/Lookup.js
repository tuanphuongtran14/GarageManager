import React, { useEffect } from 'react';
import './Lookup.css'
import Select from 'react-select';

export default function Lookup() {
  useEffect(() => {
    let selectSeparators = document.querySelectorAll('.css-1okebmr-indicatorSeparator');
    for(let i = 0; i < selectSeparators.length; i++) {
      selectSeparators[i].remove();
    }
  })

  const customerSelectOtions = [
    { value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
    { value: 'Vỏ lớp xe', label: 'Vỏ lớp xe' },
    { value: 'Phanh trước', label: 'Phanh trước' },
  ];

  const carSelectOtions = [
    { value: '81G-12345', label: '81G-12345' },
    { value: 'Vỏ lớp xe', label: 'Vỏ lớp xe' },
    { value: 'Phanh trước', label: 'Phanh trước' },
  ];

  const phoneNumberSelectOtions = [
    { value: '0123123414', label: '0123123414' },
    { value: 'Vỏ lớp xe', label: 'Vỏ lớp xe' },
    { value: 'Phanh trước', label: 'Phanh trước' },
  ];

    return (
        <div className="container">
        <div className="box">
          <h4 className="text-center mb-4">Tra cứu xe</h4>
          <form action method="post">
            <div className="row px-0">
              <div className="col-12 col-lg">
                <div className="form-group">
                  <label htmlFor>Biển số</label>
                  <Select defaultValue={carSelectOtions[0]} options={carSelectOtions}/>
                </div>
              </div>
              <div className="col-12 col-lg">
                <div className="form-group">
                  <label htmlFor>Chủ xe</label>
                  <Select defaultValue={customerSelectOtions[0]} options={customerSelectOtions}/>

                </div>
              </div>
              <div className="col-12 col-lg">
                <div className="form-group">
                  <label htmlFor>Số điện thoại</label>
                  <Select defaultValue={phoneNumberSelectOtions[0]} options={phoneNumberSelectOtions}/>
                </div>
              </div>
              <div className="col-12 col-lg-1">
                <label className="invisible" htmlFor>Thao tác</label>
                <button type="submit" className="btn btn-primary d-block">Tìm</button>
              </div>
            </div>
            <div className="result-list my-3">
              <table className="table table--custom border-bottom">
                <thead className="thead-dark sticky-top"  style={{zIndex: 0}}>
                  <tr>
                    <th>STT</th>
                    <th>Biển số</th>
                    <th>Hiệu xe</th>
                    <th>Chủ xe</th>
                    <th>Tiền nợ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>81G-12345</td>
                    <td>Toyota</td>
                    <td>Nguyễn Văn A</td>
                    <td>700.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    )
}
