import React, { useEffect, useState } from 'react';
import './Lookup.css';
import Select from 'react-select';
import callAPI from '../../../utils/apiCaller';
import { set } from 'lodash';

export default function Lookup() {
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    callAPI('GET', '/api/cars')
      .then(res => {
        if (res && res.status === 200) {
          setCars(res.data);
          setLoading(false);
        }
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const carInput = document.getElementById('car');
    const customerInput = document.getElementById('customer');
    const phoneNumberInput = document.getElementById('phoneNumber');
    setResultLoading(true);

    callAPI('POST', '/api/cars/search', {
      car: carInput.value,
      customer: customerInput.value,
      phoneNumber: phoneNumberInput.value
    })
      .then(res => {
        if (res && res.status === 200) {
          setCars(res.data);
          setResultLoading(false);
        }
      });
  }

  console.log('render');
  const resultTable = cars.map((row, index) => {
    return (
      <tr key={ index }>
        <td>{String(index + 1).padStart(3, '0')}</td>
        <td>{row.licensePlate}</td>
        <td>{row.carBrand.name}</td>
        <td>{row.carOwner.name}</td>
        <td>{row.carOwner.phoneNumber}</td>
        <td>{row.debt}</td>
      </tr>
    )
  })

  const displayLoading = () => {
    if (loading) {
      return (
        <div className="container loading"  style={{ zIndex: 1 }}>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }
  };

  const displayResultLoading = () => {
    if (resultLoading) {
      return (
        <tr className="container loading">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </tr>
      )
    }
  };

  return (
    <div className="container parent">
      {displayLoading()}
      <div className="box">
        <h4 className="text-center">Tra cứu xe</h4>
        <p className="text-center mb-4 font-italic">(Điền vào một hoặc một số thông tin bên dưới để tiến hành tra cứu)</p>
        <form>
          <div className="row px-0">
            <div className="col-12 col-lg">
              <div className="form-group">
                <label >Biển số</label>
                <input type="text" id="car" placeholder="Ví dụ: 51G-12345" className="form-control" aria-describedby="helpId" />
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="form-group">
                <label><span className="text-secondary mr-2"><small>hoặc</small></span>Tên chủ xe</label>
                <input type="text" id="customer" placeholder="Ví dụ: Nguyễn Văn A" className="form-control" aria-describedby="helpId" />
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="form-group">
                <label><span className="text-secondary mr-2"><small>hoặc</small></span>Số điện thoại</label>
                <input type="text" id="phoneNumber" placeholder="Ví dụ: 0396042356" className="form-control" aria-describedby="helpId" />
              </div>
            </div>
            <div className="col-12 col-lg-2 text-center">
            <label className="invisible d-block">Thao tác</label>
              <button type="submit" className="btn btn-primary w-75" onClick={handleSubmit}>Tìm ngay</button>
            </div>
          </div>
          <div className="result-list my-3">
            <table className="table table--custom">
              <thead className="thead-dark sticky-top" style={{ zIndex: 0.5 }}>
                <tr>
                  <th>STT</th>
                  <th>Biển số</th>
                  <th>Hiệu xe</th>
                  <th>Chủ xe</th>
                  <th>Số điện thoại</th>
                  <th>Tiền nợ</th>
                </tr>
              </thead>
              <tbody className="parent" >
                {displayResultLoading()}
                {resultTable}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  )
}
