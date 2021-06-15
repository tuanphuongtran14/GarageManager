import React, { useEffect } from 'react';
import './CreateRepairVotesPage.css';
import RepairingList from './RepairingList';
import Select from 'react-select';



export default function CreataRepairVotesPage() {
    useEffect(() => {
      let selectSeparators = document.querySelectorAll('.css-1okebmr-indicatorSeparator');
      for(let i = 0; i < selectSeparators.length; i++) {
        selectSeparators[i].remove();
      }
    })

    const accessarySelectOtions = [
      { value: 'Gương chiếu hậu', label: 'Gương chiếu hậu' },
      { value: 'Vỏ lớp xe', label: 'Vỏ lớp xe' },
      { value: 'Phanh trước', label: 'Phanh trước' },
    ];

    const wageSelectOtions = [
      { value: 'Thay lốp xe', label: 'Thay lốp xe' },
      { value: 'Vá lốp xe', label: 'Vá lốp xe' },
      { value: 'Sửa phanh', label: 'Sửa phanh' },
    ];

    const carSelectOtions = [
      { value: '81G-12345', label: '81G-12345' },
      { value: 'Vá lốp xe', label: 'Vá lốp xe' },
      { value: 'Sửa phanh', label: 'Sửa phanh' },
    ];

    const handleSubmit = (event) => {
      event.preventDefault();
      if(window.confirm("Bạn có chắc muốn in phiếu sửa chữa này?"))
        console.log("Ok");
    }

    return (
        <div className="container">
        <div className="box-container">
          <div className="box">
            <h4 className="text-center">Lập phiếu sửa chữa</h4>
            <form>
              <div className="row px-0 mt-4">
                <div className="col">
                  <div className="form-group">
                    <label>Biển số xe</label>
                    <Select placeholder={"Ví dụ: 51G-12345"} options={carSelectOtions}/>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Ngày sửa chữa</label>
                    <input type="date" className="form-control" aria-describedby="helpId"  />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Tổng tiền</label>
                    <input type="number" className="form-control" aria-describedby="helpId"  readOnly defaultValue={0} />
                  </div>
                </div>
              </div>
              <hr className="hr--custom" />
              <div className="row">
                <div className="col-6 col-lg">
                  <div className="form-group">
                    <label>Nội dung</label>
                    <input type="text" className="form-control" aria-describedby="helpId" placeholder="Nội dung sửa chữa" />
                  </div>
                </div>
                <div className="col-6 col-lg">
                  <div className="form-group selectpicker--custom">
                    <label>Vật tư phụ tùng</label>
                   <Select defaultValue={accessarySelectOtions[0]} options={accessarySelectOtions}/>
                  </div>
                </div>
                <div className="col-3 col-lg-2">
                  <div className="form-group">
                    <label>Số lượng</label>
                    <input type="number" className="form-control" aria-describedby="helpId"  defaultValue={0} />
                  </div>
                </div>
                <div className="col-6 col-lg">
                  <div className="form-group selectpicker--custom">
                    <label>Tiền công</label>
                    <Select defaultValue={wageSelectOtions[0]} options={wageSelectOtions}/>
                  </div>
                </div>
                <div className="col-3 col-lg-1 ">
                  <label className="invisible">Tiền</label>
                  <button type="submit" className="btn btn-primary">Thêm</button>
                </div>
              </div>
              <div className="list mt-3 mb-4">
                <RepairingList/>
              </div>
              <div className="row">
                <div className="col">
                  <button type="reset" className="btn btn-primary"><i className="fas fa-redo mr-2" /> Nhập phiếu mới</button>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success"  onClick={handleSubmit} ><i className="fas fa-save mr-2" /> In và lưu</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
