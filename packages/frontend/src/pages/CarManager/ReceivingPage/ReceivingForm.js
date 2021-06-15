import React, { useEffect, useState } from 'react';
import callAPI from '../../../utils/apiCaller';
import Select from 'react-select';

export default function ReceivingForm() {
    const [cars, setCars] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [selectedCarBrand, setSelectedCarBrand] = useState();
    const [disableCarBrandSelect, setDisableCarBrandSelect] = useState(false);
    const [minReceivingDate, setMinReceivingDate] = useState();

    // Fetch cars list
    useEffect(() => {
        callAPI('GET', '/api/cars')
            .then(res => {
                if (res && res.status === 200) {
                    setCars([...res.data]);
                    console.log(res.data);
                }
            });
    }, []);

    // Fetch car brands list
    useEffect(() => {
        callAPI('GET', '/api/car-brands')
            .then(res => {
                if (res && res.status === 200) {
                    const brandSelectOtions = res.data.map(carBrand => {
                        return {
                            value: carBrand._id,
                            label: carBrand.name
                        }
                    });
                    setCarBrands(brandSelectOtions);
                    console.log(brandSelectOtions);
                    setSelectedCarBrand(brandSelectOtions[0]);
                }
            });
    }, []);

    // set min date for receiving date input
    useEffect(() => {
        var dtToday = new Date();
    
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
        setMinReceivingDate(maxDate);

        document.getElementById('receivingDate').setAttribute('min', maxDate);
    })

    // hanle when receiving date on change
    const handleReceivingDateOnChange = (event) => {
        let target = event.target;
        let value = target.value;

        let toDay = new Date(minReceivingDate);
        let receivingDate = new Date(value);

        if(receivingDate < toDay) {
            window.alert("Ngày tiếp nhận phải lớn hơn hoặc bằng ngày hiện tại");
            document.getElementById('receivingDate').value = minReceivingDate
        }
    }

    // hanlde when car plate on change
    const handleCarOnChange = (event) => {
        const carPlate = document.getElementById('licensePlate');
        const nameInput = document.getElementById('name');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        let target = event.target;
        let value = target.value;

        carPlate.value = value.toUpperCase();
        
        for (let i = 0; i < cars.length; i++) {
            // If exist car plate in database before
            if (cars[i].licensePlate === value) {
                // Set value and disable customer name input
                nameInput.value = cars[i].carOwner.name;
                nameInput.disabled = true;

                // Set value and disable car brand select
                setSelectedCarBrand({value: cars[i].carBrand._id, label: cars[i].carBrand.name})
                setDisableCarBrandSelect(true);

                // Set value customer phone
                phoneNumberInput.value = cars[i].carOwner.phoneNumber;
                phoneNumberInput.disabled = true;

                // Set value customer email
                emailInput.value = cars[i].carOwner.email;
                emailInput.disabled = true;

                // Set value customer address
                addressInput.value = cars[i].carOwner.address;
                addressInput.disabled = true;

                return
            }
        }
        nameInput.disabled = false;
        nameInput.value = '';
        setDisableCarBrandSelect(false);
        phoneNumberInput.disabled = false;
        phoneNumberInput.value = '';
        emailInput.disabled = false;
        emailInput.value = '';
        addressInput.disabled = false;
        addressInput.value = ''
    }

    // Hanlde when car brand select on change
    const handleBrandOnChange = selectedOption => {
        setSelectedCarBrand(selectedOption);
    }

    // Handle when submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        const receivingDate = document.getElementById('receivingDate');
    }

    // Handle when submit form 
    const handleReset = (event) => {
        const nameInput = document.getElementById('name');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        
        nameInput.disabled = false;
        setDisableCarBrandSelect(false);
        phoneNumberInput.disabled = false;
        emailInput.disabled = false;
        addressInput.disabled = false;
    }

    return (
        <div>
            <form>
                <div className="row px-0">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Biển số xe</label>
                            <input type="text" name="licensePlate" id="licensePlate" autoFocus placeholder="Ví dụ: 51G-12345" className="form-control" aria-describedby="helpId" onChange={handleCarOnChange} />
                        </div>
                    </div>
                    <div className="col-6 pl-0">
                        <div className="form-group">
                            <label>Hiệu xe</label>
                            <Select 
                                id="carBrand" 
                                placeholder={"Chọn hiệu xe"} 
                                options={carBrands} 
                                value={selectedCarBrand} 
                                onChange={handleBrandOnChange}
                                isDisabled={disableCarBrandSelect}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label>Tên chủ xe</label>
                    <input type="text" id="name" name="name" placeholder="Ví dụ: Nguyễn Văn A" className="form-control" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" id="phoneNumber" placeholder="Ví dụ: 0369002357" name="phoneNumber" className="form-control" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="email" name="email" placeholder="Ví dụ: tuanphuongtran.14@gmail.com" className="form-control" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" id="address" name="address" placeholder="Ví dụ: Q4, TP.HCM" className="form-control" aria-describedby="helpId" />
                </div>


                <div className="form-group">
                    <label>Ngày tiếp nhận</label>
                    <input type="date" id="receivingDate" name="receivingDate" className="form-control" onBlur={handleReceivingDateOnChange} />
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="reset" className="btn btn-danger" onClick={handleReset}><i className="fas fa-redo"></i> &nbsp; Nhập lại</button>
                    <button type="submit" className="btn btn-success w-50" onClick={handleSubmit}>Gửi ngay</button>
                </div>
            </form>
        </div>
    )
}