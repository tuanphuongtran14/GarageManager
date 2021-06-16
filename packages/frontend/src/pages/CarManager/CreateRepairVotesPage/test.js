import React, { useEffect, useState } from 'react';
import './CreateRepairVotesPage.css';
import Select from 'react-select';
import callAPI from '../../../utils/apiCaller'


export default function CreateRepairVotesPage() {
  const [minRepairDate, setMinRepairDate] = useState();
  const [receivingDate, setReceivingDate] = useState();
  const [loading, setLoading] = useState(true);
  const [receivingForms, setReceivingForms] = useState([]);
  const [accessaries, setAccessaries] = useState([]);
  const [wages, setWages] = useState([]);
  const [selectedCar, setSelectedCar] = useState();
  let carOptions = [];
  let accessaryOptions = [];
  let wageOptions = [];
  let selectedAccessary = null;
  let selectedWage = null;
  let content = '';
  let quantity = 1;
  let [repairVoteDetail, setRepairVoteDetail] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let accessarySelect, wageSelect, carSelect;
  let oldPrice = 0, oldAccessary, oldQuantity = 0, editIndex;

  //  Fetch data
  useEffect(() => {
    callAPI('GET', '/api/receiving-forms')
      .then(async res => {
        if (res && res.status === 200) {
          setReceivingForms(res.data.filter(receivingForm => {
            return !(receivingForm.isRepaired);
          }));
        }
        setLoading(false);
      });

    callAPI('GET', '/api/accessaries')
      .then(res => {
        if (res && res.status === 200) {
          setAccessaries(res.data);
        }
      });

    callAPI('GET', '/api/wages')
      .then(res => {
        if (res && res.status === 200) {
          setWages(res.data);
        }
      });
  }, []);


  // create options for car select
  carOptions = receivingForms.map(receivingForm => {
    return {
      value: receivingForm._id,
      label: receivingForm.car.licensePlate
    };
  });

  // create options for accessary select
  accessaryOptions = accessaries.map(accessary => {
    return {
      value: accessary._id,
      label: `${accessary.name} - ${accessary.unitPrice.toLocaleString('de-DE')}đ - SL còn: ${accessary.remaining}`
    };
  });

  // create options for wage select
  wageOptions = wages.map(wage => {
    return {
      value: wage._id,
      label: `${wage.name} - ${wage.price.toLocaleString('de-DE')}đ`
    };
  });

  // set min date for repair date input
  useEffect(() => {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;
    setMinRepairDate(minDate);

    document.getElementById('repairDate').setAttribute('min', minDate);
  })

  const handleCarOnChange = (selectedOption) => {
    if (selectedOption)
      setSelectedCar(selectedOption.value);
    else
      setSelectedCar(null);
  }

  const handleAccessaryOnChange = (selectedOption) => {
    const quantityInput = document.getElementById('quantity');
    if (selectedOption) {
      selectedAccessary = accessaries.filter(accessary => {
        return accessary._id === selectedOption.value
      })[0];
      quantityInput.removeAttribute('disabled');
    } else {
      console.log('vao');
      selectedAccessary = null;
    }
  }

  const handleWageOnChange = (selectedOption) => {
    if (selectedOption)
      selectedWage = wages.filter(wage => {
        return wage._id === selectedOption.value
      })[0];
    else
      selectedWage = null;
  }

  const handleQuantityOnBlur = (event) => {
    const value = event.target.value;
    quantity = value;
    
    if (value > selectedAccessary.remaining) {
      window.alert('Số lượng vật tư phụ tùng còn lại không đủ');
      document.getElementById('quantity').value = 0;
      quantity = 0;
    }
    if(value <= 0) {
      window.alert('Số lượng vật tư phụ tùng không hợp lệ. Số lượng phụ tùng dùng phải lớn hơn 0!!!');
    }
  }

  const handleContentOnChange = (event) => {
    const value = event.target.value;
    content = value;
  }

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const button = document.getElementById('addBtn');

    if (button.innerText === 'Thêm') {
      if (!selectedAccessary || !selectedWage || !content || !quantity) {
        window.alert('Bạn chưa điền đủ thông tin cho form!!!');
        return;
      }

      if(document.getElementById('quantity').value <= 0) {
        window.alert('Số lượng vật tư phụ tùng không hợp lệ. Số lượng phụ tùng dùng phải lớn hơn 0!!!');
        return;
      }

      let newDetail = {
        content,
        accessary: selectedAccessary._id,
        accessary_name: selectedAccessary.name,
        accessary_unitPrice: selectedAccessary.unitPrice,
        quantity: document.getElementById('quantity').value,
        wage: selectedWage._id,
        wage_type: selectedWage.name,
        wage_price: selectedWage.price,
        price: quantity * selectedAccessary.unitPrice + selectedWage.price
      }
      setRepairVoteDetail([...repairVoteDetail, newDetail]);
      setTotalPrice(totalPrice + newDetail.price);

      let tmp = accessaries.map(accessary => {
        if (accessary._id === newDetail.accessary)
          accessary.remaining -= newDetail.quantity;

        return { ...accessary };
      })

      setAccessaries(tmp);
      document.getElementById('content').value = '';
      content = '';
      document.getElementById('quantity').value = 0;
      document.getElementById('quantity').setAttribute('disabled', 'true');
      quantity = 0;
      accessarySelect.select.clearValue();
      wageSelect.select.clearValue();
    } else {
      if (!selectedAccessary || !selectedWage || !content || !quantity) {
        window.alert('Bạn chưa điền đủ thông tin cho form!!!');
        return;
      }

      if(document.getElementById('quantity').value <= 0) {
        window.alert('Số lượng vật tư phụ tùng không hợp lệ. Số lượng phụ tùng dùng phải lớn hơn 0!!!');
        return;
      }

      repairVoteDetail[editIndex] = {
        content,
        accessary: selectedAccessary._id,
        accessary_name: selectedAccessary.name,
        accessary_unitPrice: selectedAccessary.unitPrice,
        quantity: document.getElementById('quantity').value,
        wage: selectedWage._id,
        wage_type: selectedWage.name,
        wage_price: selectedWage.price,
        price: quantity * selectedAccessary.unitPrice + selectedWage.price
      };

      let newPrice = totalPrice + repairVoteDetail[editIndex].price - oldPrice;
      setTotalPrice(newPrice);


      let tmp = accessaries.map(accessary => {
        if (accessary._id === repairVoteDetail[editIndex].accessary)
          accessary.remaining -= repairVoteDetail[editIndex].quantity;

        return { ...accessary };
      })
      setAccessaries(tmp);

      document.getElementById('content').value = '';
      content = '';
      document.getElementById('quantity').value = 0;
      document.getElementById('quantity').setAttribute('disabled', 'true');
      quantity = 0;
      accessarySelect.select.clearValue();
      wageSelect.select.clearValue();

      button.innerText = 'Thêm';

      oldPrice = 0;
      oldAccessary = null;
      oldQuantity = 0;
    }
  }

  const handleEditClick = async (event, index) => {
    event.preventDefault();
    const button = document.getElementById('addBtn');
    button.innerText = 'Sửa';

    const content = document.getElementById('content');
    const quantity = document.getElementById('quantity');
    content.value = repairVoteDetail[index].content;
    quantity.value = 0;
    accessarySelect.select.setValue({value: repairVoteDetail[index].accessary, label: repairVoteDetail[index].accessary_name});
    wageSelect.select.setValue({value: repairVoteDetail[index].wage, label: repairVoteDetail[index].wage_type});

    oldPrice = repairVoteDetail[index].price;
    oldAccessary = repairVoteDetail[index].accessary;
    oldQuantity = repairVoteDetail[index].quantity;
    editIndex = index;

    selectedAccessary = accessaries.filter(accessary => {
      return accessary._id === oldAccessary
    })[0];
    console.log(selectedAccessary);

    selectedWage = wages.filter(wage => {
      return wage._id === repairVoteDetail[index].wage;
    })[0];
          
    let oldTmp = accessaries.map(accessary => {
      if (accessary._id === oldAccessary)
        accessary.remaining += Number(oldQuantity)

      return { ...accessary };
    })
    setAccessaries(oldTmp);
  }

  // Set total price when totalprice change
  useEffect(() => {
    document.getElementById('totalPrice').value = totalPrice.toLocaleString('de-DE') + 'đ';
  }, [totalPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let repairDate = document.getElementById('repairDate').value;

    if (!selectedCar || !repairDate || repairVoteDetail.length === 0) {
      window.alert('Không thể lập phiếu sửa chữa vì bạn điền thông tin chưa đủ!!!');
      return;
    }

    if (window.confirm("Bạn có chắc muốn lưu và in phiếu sửa chữa này?")) {
      setLoading(true);
      callAPI('POST', '/api/repair-votes', {
        receivingForm: selectedCar,
        repairDate,
        details: repairVoteDetail
      }).then(res => {
        if (res && res.status === 201) {

          callAPI('GET', '/api/receiving-forms')
            .then(async res => {
              if (res && res.status === 200) {
                setReceivingForms(res.data.filter(receivingForm => {
                  return !(receivingForm.isRepaired);
                }));
              }
              window.alert('Lập phiếu sửa chữa thành công!!!');
              setLoading(false);
            });

          callAPI('GET', '/api/accessaries')
            .then(res => {
              if (res && res.status === 200) {
                setAccessaries(res.data);
              }
            });

          callAPI('GET', '/api/wages')
            .then(res => {
              if (res && res.status === 200) {
                setWages(res.data);
              }
            });
        } else {
          window.alert('Có lỗi xảy ra trong quá trình lưu, vui lòng thử lại!!!');
        }
      })
    }
  }

  const handleReset = () => {
    setRepairVoteDetail([]);
    setTotalPrice(0);
    carSelect.select.clearValue();
    document.getElementById('content').value = '';
    content = '';
    document.getElementById('quantity').value = 1;
    quantity = 1;
    accessarySelect.select.clearValue();
    wageSelect.select.clearValue();
  }

  const deleteRow = (event, index) => {
    event.preventDefault();
    if (window.confirm("Bạn có chắc muốn xóa nội dung này?")) {
      setTotalPrice(totalPrice - repairVoteDetail[index].price);
      let tmp = repairVoteDetail;
      let deletedRow = tmp.splice(index, 1);
      deletedRow.forEach(row => {
        let tmp = accessaries.map(accessary => {
          if (accessary._id === row.accessary)
            accessary.remaining = Number(accessary.remaining) + Number(row.quantity);

          return { ...accessary };
        })

        setAccessaries(tmp);
      })
      setRepairVoteDetail(tmp);
    }
  }

  const repairList = repairVoteDetail.map((row, index) => {
    return (
      <tr key={index}>
        <td>{String(index + 1).padStart(2, '0')}</td>
        <td>{row.content}</td>
        <td>{row.accessary_name}</td>
        <td>{row.quantity}</td>
        <td>{row.accessary_unitPrice.toLocaleString('de-DE') + 'đ'}</td>
        <td>{row.wage_type}</td>
        <td>{row.wage_price.toLocaleString('de-DE') + 'đ'}</td>
        <td>{(row.quantity * row.accessary_unitPrice + row.wage_price).toLocaleString('de-DE') + 'đ'}</td>
        <td className="py-2">
          <button className="btn py-0 mr-3" onClick={(event) => deleteRow(event, index)}><i className="fas fa-trash-alt text-danger"></i></button>
          <button className="btn py-0" onClick={(event) => handleEditClick(event, index)}><i className="fas fa-edit text-success"></i></button>
        </td>
      </tr>
    )
  })

  const displayLoading = () => {
    if (loading) {
      return (
        <div className="container loading">
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
  return (
    <div className="container parent">
      {displayLoading()}
      <div className="box-container">
        <div className="box">
          <h4 className="text-center">Lập phiếu sửa chữa</h4>
          <form>
            <div className="row px-0 mt-4">
              <div className="col">
                <div className="form-group">
                  <label>Biển số xe</label>
                  <Select
                    placeholder={"Ví dụ: 51G-12345"}
                    options={carOptions}
                    onChange={handleCarOnChange}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                    ref={ref => {
                      carSelect = ref;
                    }}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Ngày sửa chữa</label>
                  <input type="date" id="repairDate" name="repairDate" className="form-control" aria-describedby="helpId" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Tổng tiền</label>
                  <input type="text" id="totalPrice" name="totalPrice" className="form-control" aria-describedby="helpId" readOnly defaultValue={0} />
                </div>
              </div>
            </div>
            <hr className="hr--custom" />
            <div className="row">
              <div className="col-6 col-lg">
                <div className="form-group">
                  <label>Nội dung</label>
                  <input type="text" id="content" name="content" onChange={handleContentOnChange} className="form-control" aria-describedby="helpId" placeholder="Nội dung sửa chữa" />
                </div>
              </div>
              <div className="col-6 col-lg">
                <div className="form-group selectpicker--custom">
                  <label>Vật tư phụ tùng</label>
                  <Select
                    defaultValue={accessaryOptions[0]}
                    options={accessaryOptions}
                    onChange={handleAccessaryOnChange}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                    ref={ref => {
                      accessarySelect = ref;
                    }}
                  />
                </div>
              </div>
              <div className="col-3 col-lg-2">
                <div className="form-group">
                  <label>Số lượng</label>
                  <input type="number" id="quantity" name="quantity" onBlur={handleQuantityOnBlur} disabled className="form-control" aria-describedby="helpId" defaultValue={0} min={1} />
                </div>
              </div>
              <div className="col-6 col-lg">
                <div className="form-group selectpicker--custom">
                  <label>Tiền công</label>
                  <Select
                    defaultValue={wageOptions[0]}
                    options={wageOptions}
                    onChange={handleWageOnChange}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                    ref={ref => {
                      wageSelect = ref;
                    }}
                  />
                </div>
              </div>
              <div className="col-3 col-lg-1 ">
                <label className="invisible">TH</label>
                <button type="submit" id="addBtn" className="btn btn-primary" onClick={handleAddSubmit}>Thêm</button>
              </div>
            </div>
            <div className="list mt-3 mb-4">
              <table className="table table--custom">
                <thead className="thead-dark sticky-top" style={{ zIndex: 0 }}>
                  <tr>
                    <th>STT</th>
                    <th>Nội dung</th>
                    <th>Vật tư phụ tùng</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Loại tiền công</th>
                    <th>Tiền công</th>
                    <th>Thành tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {repairList}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col">
                <button type="reset" className="btn btn-primary" onClick={handleReset}><i className="fas fa-redo mr-2" /> Nhập phiếu mới</button>
              </div>
              <div className="col text-right">
                <button type="button" className="btn btn-success" onClick={handleSubmit} ><i className="fas fa-save mr-2" /> In và lưu</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
