import React, { useEffect, useState } from 'react';
import './CreateRepairVotesPage.css';
import Select from 'react-select';
import callAPI from '../../../utils/apiCaller';
import print from 'print-js';


export default function CreateRepairVotesPage() {
  const [loading, setLoading] = useState(true);
  const [receivingForms, setReceivingForms] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [wages, setWages] = useState([]);
  const [selectedCar, setSelectedCar] = useState();
  let carOptions = [];
  let accessoryOptions = [];
  let wageOptions = [];
  let [selectedAccessory, setSelectedAccessory] = useState();
  let [selectedWage, setSelectedWage] = useState();
  let [content, setContent] = useState();
  let [quantity, setQuantity] = useState(0);
  let [repairVoteDetail, setRepairVoteDetail] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [editIndex, setEditIndex] = useState();
  let [oldPrice, setOldPrice] = useState(0);
  let accessorySelect, wageSelect, carSelect;
  let oldAccessory, oldQuantity = 0;

  //  Fetch data
  useEffect(() => {
    callAPI('GET', '/api/receiving-forms')
      .then(async res => {
        if (res && res.status === 200) {
          setReceivingForms(res.data.filter(receivingForm => {
            return !(receivingForm.isDone);
          }));
        }
        setLoading(false);
      });

    callAPI('GET', '/api/accessories')
      .then(res => {
        if (res && res.status === 200) {
          setAccessories(res.data);
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

  // create options for accessory select
  accessoryOptions = accessories.map(accessory => {
    return {
      value: accessory._id,
      label: `${accessory.name} - ${accessory.unitPrice.toLocaleString('de-DE')}?? - SL c??n: ${accessory.remaining}`
    };
  });

  // create options for wage select
  wageOptions = wages.map(wage => {
    return {
      value: wage._id,
      label: `${wage.name} - ${wage.price.toLocaleString('de-DE')}??`
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

    document.getElementById('repairDate').setAttribute('value', minDate);
  })

  const handleCarOnChange = (selectedOption) => {
    if (selectedOption)
      setSelectedCar(selectedOption.value);
    else
      setSelectedCar(null);
  }

  const handleAccessoryOnChange = (selectedOption) => {
    const quantityInput = document.getElementById('quantity');
    if (selectedOption) {
      setSelectedAccessory(accessories.filter(accessory => {
        return accessory._id === selectedOption.value
      })[0]);
      quantityInput.removeAttribute('disabled');
    } else {
      setSelectedAccessory(null);
    }
  }

  const handleWageOnChange = (selectedOption) => {
    if (selectedOption)
      setSelectedWage(wages.filter(wage => {
        return wage._id === selectedOption.value
      })[0]);
    else
      setSelectedWage(null);
  }

  const handleQuantityOnBlur = (event) => {
    const value = event.target.value;
    setQuantity(value);

    if (value > selectedAccessory.remaining) {
      window.alert('S??? l?????ng v???t t?? ph??? t??ng c??n l???i kh??ng ?????');
      document.getElementById('quantity').value = 0;
      setQuantity(0);
    }
    if (value <= 0) {
      window.alert('S??? l?????ng v???t t?? ph??? t??ng kh??ng h???p l???. S??? l?????ng ph??? t??ng d??ng ph???i l???n h??n 0!!!');
    }
  }

  const handleContentOnChange = (event) => {
    const value = event.target.value;
    setContent(value);
  }

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const button = document.getElementById('addBtn');

    if (button.innerText === 'Th??m') {
      console.log(!content);
      if (!selectedAccessory || !selectedWage || !content || !quantity) {
        window.alert('B???n ch??a ??i???n ????? th??ng tin cho form!!!');
        return;
      }

      if (document.getElementById('quantity').value <= 0) {
        window.alert('S??? l?????ng v???t t?? ph??? t??ng kh??ng h???p l???. S??? l?????ng ph??? t??ng d??ng ph???i l???n h??n 0!!!');
        return;
      }

      let newDetail = {
        content,
        accessory: selectedAccessory._id,
        accessory_name: selectedAccessory.name,
        accessory_unitPrice: selectedAccessory.unitPrice,
        quantity: document.getElementById('quantity').value,
        wage: selectedWage._id,
        wage_type: selectedWage.name,
        wage_price: selectedWage.price,
        price: quantity * selectedAccessory.unitPrice + selectedWage.price
      }
      setRepairVoteDetail([...repairVoteDetail, newDetail]);
      setTotalPrice(totalPrice + newDetail.price);

      let tmp = accessories.map(accessory => {
        if (accessory._id === newDetail.accessory)
          accessory.remaining -= newDetail.quantity;

        return { ...accessory };
      })

      setAccessories(tmp);
      document.getElementById('content').value = '';
      setContent('');
      document.getElementById('quantity').value = 0;
      document.getElementById('quantity').setAttribute('disabled', 'true');
      setQuantity(0)
      accessorySelect.select.clearValue();
      wageSelect.select.clearValue();
    } else {
      console.log(!selectedAccessory);
      console.log(!selectedWage);
      console.log(!content);
      console.log(!quantity);

      if (!selectedAccessory || !selectedWage || !content || !quantity) {
        window.alert('B???n ch??a ??i???n ????? th??ng tin cho form!!!');
        return;
      }

      if (document.getElementById('quantity').value <= 0) {
        window.alert('S??? l?????ng v???t t?? ph??? t??ng kh??ng h???p l???. S??? l?????ng ph??? t??ng d??ng ph???i l???n h??n 0!!!');
        return;
      }

      let tmpRepairVoteDetail = repairVoteDetail;
      tmpRepairVoteDetail[editIndex] = {
        content,
        accessory: selectedAccessory._id,
        accessory_name: selectedAccessory.name,
        accessory_unitPrice: selectedAccessory.unitPrice,
        quantity: document.getElementById('quantity').value,
        wage: selectedWage._id,
        wage_type: selectedWage.name,
        wage_price: selectedWage.price,
        price: quantity * selectedAccessory.unitPrice + selectedWage.price
      };

      setRepairVoteDetail([...tmpRepairVoteDetail]);

      let newPrice = totalPrice + repairVoteDetail[editIndex].price - oldPrice;
      setTotalPrice(newPrice);


      let tmp = accessories.map(accessory => {
        if (accessory._id === repairVoteDetail[editIndex].accessory)
          accessory.remaining -= repairVoteDetail[editIndex].quantity;

        return { ...accessory };
      })
      setAccessories(tmp);

      document.getElementById('content').value = '';
      setContent('');
      document.getElementById('quantity').value = 0;
      document.getElementById('quantity').setAttribute('disabled', 'true');
      setQuantity(0)
      accessorySelect.select.clearValue();
      wageSelect.select.clearValue();

      document.querySelectorAll('tbody tr')[editIndex].style.backgroundColor = null;
      button.innerText = 'Th??m';

      setOldPrice(0);
      setEditIndex(0);
      oldAccessory = null;
      oldQuantity = 0;
    }
  }

  const handleEditClick = async (event, index) => {
    event.preventDefault();
    const button = document.getElementById('addBtn');
    button.innerText = 'S???a';

    const contentInput = document.getElementById('content');
    const quantityInput = document.getElementById('quantity');
    contentInput.value = repairVoteDetail[index].content;
    setContent(repairVoteDetail[index].content);
    quantityInput.value = 0;
    accessorySelect.select.setValue({ value: repairVoteDetail[index].accessory, label: repairVoteDetail[index].accessory_name });
    wageSelect.select.setValue({ value: repairVoteDetail[index].wage, label: repairVoteDetail[index].wage_type });

    setOldPrice(repairVoteDetail[index].price);
    oldAccessory = repairVoteDetail[index].accessory;
    oldQuantity = repairVoteDetail[index].quantity;
    setEditIndex(index);

    document.querySelectorAll('tbody tr')[index].style.backgroundColor = 'hsl(0, 0%, 85%)';

    setSelectedAccessory(accessories.filter(accessory => {
      return accessory._id === oldAccessory
    })[0]);

    setSelectedWage(wages.filter(wage => {
      return wage._id === repairVoteDetail[index].wage;
    })[0]);

    let oldTmp = accessories.map(accessory => {
      if (accessory._id === oldAccessory)
        accessory.remaining += Number(oldQuantity)

      return { ...accessory };
    })
    setAccessories(oldTmp);

  }

  // Set total price when totalprice change
  useEffect(() => {
    document.getElementById('totalPrice').value = totalPrice.toLocaleString('de-DE') + '??';
  }, [totalPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let repairDate = document.getElementById('repairDate').value;

    if (!selectedCar || !repairDate || repairVoteDetail.length === 0) {
      window.alert('Kh??ng th??? l???p phi???u s???a ch???a v?? b???n ??i???n th??ng tin ch??a ?????!!!');
      return;
    }

    if (window.confirm("B???n c?? ch???c mu???n l??u v?? in phi???u s???a ch???a n??y?")) {
      setLoading(true);
      callAPI('POST', '/api/repair-votes', {
        receivingForm: selectedCar,
        repairDate,
        details: repairVoteDetail
      }).then(res => {
        if (res && res.status === 201) {
          callAPI('GET', '/api/receiving-forms')
            .then(res => {
              let currentReceivingForm;
              if (res && res.status === 200) {
                setReceivingForms(res.data.filter(receivingForm => {
                  if(selectedCar === receivingForm._id)
                    currentReceivingForm = receivingForm;

                  return !(receivingForm.isDone);
                }));
              }
              window.alert('L???p phi???u s???a ch???a th??nh c??ng!!! Vui l??ng nh???n phi???u in!!!');

              const printData = repairVoteDetail.map((detail, index) => {
                return {
                  number: (index + 1).toString().padStart(3, 0),
                  content: detail.content,
                  accessory_name: detail.accessory_name,
                  accessory_unitPrice: detail.accessory_unitPrice.toLocaleString("DE-de") + '??',
                  quantity: detail.quantity,
                  wage_type: detail.wage_type,
                  wage_price: detail.wage_price.toLocaleString("DE-de") + '??',
                  price: detail.price.toLocaleString("DE-de") + '??'
                }
              })

              print({
                printable: printData,
                type: 'json',
                properties: [
                  { field: 'number', displayName: 'STT'},
                  { field: 'content', displayName: 'N???i dung'},
                  { field: 'accessory_name', displayName: 'T??n ph??? t??ng'},
                  { field: 'accessory_unitPrice', displayName: '????n gi??'},
                  { field: 'quantity', displayName: 'S??? l?????ng'},
                  { field: 'wage_type', displayName: 'Lo???i ti???n c??ng'},
                  { field: 'wage_price', displayName: 'Ti???n c??ng'},
                  { field: 'price', displayName: 'Th??nh ti???n'},
                ],
                header: `
                  <h3 class="text-center">Phi???u s???a ch???a</h3>
                  <p>Xe ???????c s???a ch???a: ${ currentReceivingForm.car.licensePlate }</p>
                  <p>Ng??y ti???p nh???n: ${ currentReceivingForm.receivingDate.slice(0, 10) }</p>
                  <p>Ng??y s???a ch???a: ${ document.getElementById('repairDate').value }</p>
                  <p>T???ng th??nh ti???n: ${ document.getElementById('totalPrice').value }</p>
                `,
                style: '.text-center { text-align: center; }'
              })

              setLoading(false);
            }).catch(error => {
                if(error.response && error.response.data)
                    alert("L???i: " + error.response.data.message);
                setLoading(false);
            })

          callAPI('GET', '/api/accessories')
            .then(res => {
              if (res && res.status === 200) {
                setAccessories(res.data);
              }
            }).catch(error => {
                if(error.response && error.response.data)
                    alert("L???i: " + error.response.data.message);
                setLoading(false);
            })

          callAPI('GET', '/api/wages')
            .then(res => {
              if (res && res.status === 200) {
                setWages(res.data);
              }
            }).catch(error => {
                if(error.response && error.response.data)
                    alert("L???i: " + error.response.data.message);
                setLoading(false);
            })
        }
      }).catch(error => {
          if(error.response && error.response.data)
              alert("L???i: " + error.response.data.message);
          setLoading(false);
      })
    }
  }

  const handleReset = () => {
    setRepairVoteDetail([]);
    setTotalPrice(0);
    carSelect.select.clearValue();
    document.getElementById('content').value = '';
    setContent('');
    document.getElementById('quantity').value = 1;
    setQuantity(0);
    accessorySelect.select.clearValue();
    wageSelect.select.clearValue();
  }

  const deleteRow = (event, index) => {
    event.preventDefault();
    if (window.confirm("B???n c?? ch???c mu???n x??a n???i dung n??y?")) {
      setTotalPrice(totalPrice - repairVoteDetail[index].price);
      let tmp = repairVoteDetail;
      let deletedRow = tmp.splice(index, 1);
      deletedRow.forEach(row => {
        let tmp = accessories.map(accessory => {
          if (accessory._id === row.accessory)
            accessory.remaining = Number(accessory.remaining) + Number(row.quantity);

          return { ...accessory };
        })

        setAccessories(tmp);
      })
      setRepairVoteDetail(tmp);
    }
  }

  const repairList = repairVoteDetail.map((row, index) => {
    return (
      <tr key={index}>
        <td>{String(index + 1).padStart(2, '0')}</td>
        <td>{row.content}</td>
        <td>{row.accessory_name}</td>
        <td>{row.quantity}</td>
        <td>{row.accessory_unitPrice.toLocaleString('de-DE') + '??'}</td>
        <td>{row.wage_type}</td>
        <td>{row.wage_price.toLocaleString('de-DE') + '??'}</td>
        <td>{(row.quantity * row.accessory_unitPrice + row.wage_price).toLocaleString('de-DE') + '??'}</td>
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
        <div className="container loading" style={{zIndex: 100000}}>
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
          <h4 className="text-center">L???p phi???u s???a ch???a</h4>
          <form>
            <div className="row px-0 mt-4">
              <div className="col">
                <div className="form-group">
                  <label>Bi???n s??? xe <span class="text-danger">(*)</span></label>
                  <Select
                    placeholder={"V?? d???: 51G-12345"}
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
                  <label>Ng??y s???a ch???a</label>
                  <input type="date" id="repairDate" disabled name="repairDate" className="form-control" aria-describedby="helpId" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>T???ng ti???n</label>
                  <input type="text" id="totalPrice" name="totalPrice" className="form-control" aria-describedby="helpId" readOnly defaultValue={0} />
                </div>
              </div>
            </div>
            <hr className="hr--custom" />
            <div className="row">
              <div className="col-6 col-lg">
                <div className="form-group">
                  <label>N???i dung <span class="text-danger">(*)</span></label>
                  <input type="text" id="content" name="content" onChange={handleContentOnChange} className="form-control" aria-describedby="helpId" placeholder="N???i dung s???a ch???a" />
                </div>
              </div>
              <div className="col-6 col-lg">
                <div className="form-group selectpicker--custom">
                  <label>V???t t?? ph??? t??ng <span class="text-danger">(*)</span></label>
                  <Select
                    defaultValue={accessoryOptions[0]}
                    options={accessoryOptions}
                    onChange={handleAccessoryOnChange}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                    ref={ref => {
                      accessorySelect = ref;
                    }}
                  />
                </div>
              </div>
              <div className="col-3 col-lg-2">
                <div className="form-group">
                  <label>S??? l?????ng <span class="text-danger">(*)</span></label>
                  <input type="number" id="quantity" name="quantity" onBlur={handleQuantityOnBlur} disabled className="form-control" aria-describedby="helpId" defaultValue={0} min={1} />
                </div>
              </div>
              <div className="col-6 col-lg">
                <div className="form-group selectpicker--custom">
                  <label>Ti???n c??ng <span class="text-danger">(*)</span></label>
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
                <button type="submit" id="addBtn" className="btn btn-primary" onClick={handleAddSubmit}>Th??m</button>
              </div>
            </div>
            <div className="list mt-3 mb-4">
              <table className="table table--custom" id="detailed-table">
                <thead className="thead-dark sticky-top" style={{ zIndex: 0 }}>
                  <tr>
                    <th>STT</th>
                    <th>N???i dung</th>
                    <th>V???t t?? ph??? t??ng</th>
                    <th>S??? l?????ng</th>
                    <th>????n gi??</th>
                    <th>Lo???i ti???n c??ng</th>
                    <th>Ti???n c??ng</th>
                    <th>Th??nh ti???n</th>
                    <th>Thao t??c</th>
                  </tr>
                </thead>
                <tbody>
                  {repairList}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col">
                <button type="reset" className="btn btn-primary" onClick={handleReset}><i className="fas fa-redo mr-2" /> Nh???p phi???u m???i</button>
              </div>
              <div className="col text-right">
                <button type="button" className="btn btn-success" onClick={handleSubmit} ><i className="fas fa-save mr-2" /> In v?? l??u</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
