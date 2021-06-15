import React from 'react'

export default function CollectMoney() {
    return (
        <div className="container">
        <div className="box">
          <h4 className="text-center mb-4">Lập phiếu thu tiền</h4>
          <form action method="post">
            <div className="row px-0">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Biển số</label>
                  <input type="text" className="form-control" name id aria-describedby="helpId" placeholder />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Ngày thu tiền</label>
                  <input type="date" className="form-control" name id aria-describedby="helpId" placeholder />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Số tiền thu</label>
                  <input type="number" className="form-control" name id aria-describedby="helpId" placeholder />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Họ tên chủ xe</label>
                  <input type="text" className="form-control" name id aria-describedby="helpId" placeholder readOnly />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Điện thoại</label>
                  <input type="text" className="form-control" name id aria-describedby="helpId" placeholder readOnly />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor>Địa chỉ</label>
                  <input type="text" className="form-control" name id aria-describedby="helpId" placeholder readOnly />
                </div>
              </div>
            </div>
            <div className="row px-0 mt-4">
              <div className="col-4">
                <button type="submit" className="btn btn-primary"><i className="fas fa-redo mr-2" />Lập phiếu mới</button>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-success w-100"><i className="fas fa-print mr-2" />In và lưu</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}
