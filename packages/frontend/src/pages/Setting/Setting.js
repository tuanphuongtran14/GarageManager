import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Setting.css'

export default function Setting() {
    // Loading screen state 
    const [loading, setLoading] = useState(true);
    // Others state
    const [parameters, setParameters] = useState({});


    // Fetch data function 
    const fetchData = () => {
        // Turn on loading screen
        setLoading(true);

        axios({
            method: 'GET',
            url: '/api/parameters'
        })
            .then(response => {
                setParameters(response.data[0]);

                // Turn off loading screen
                setLoading(false);
            })
            .catch(error => {
                if(error.response && error.response.data)
                    alert("Lỗi: " + error.response.data.message);

                // Turn off loading screen
                setLoading(false);
            })
    }


    // Function for displaying loading screen function
    const displayLoading = () => {
        if (loading) {
            return (
                <div className="container loading" style={{ zIndex: 100000 }}>
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


    // Function for handling change number of received car in day
    const changeNumberOfReceivedCarInDay = event => {
        event.preventDefault();
    
        // Turn on loading screen
        setLoading(true);

        // Change setting by calling api
        const data = {
            maxNumberOfReceivedCarInDay: document.getElementById("maxNumberOfReceivedCarInDay").value
        }

        axios({
            method: 'PUT',
            url: '/api/parameters',
            data
        })
            .then(response => {
                alert("Thay đổi cài đặt thành công!!!");

                // Fetch new data
                fetchData();

                // Turn off loading screen
                setLoading(false);
            })
            .catch(error => {
                if(error.response && error.response.data)
                    alert("Lỗi: " + error.response.data.message);

                // Turn off loading screen
                setLoading(false);
            })
    }


    // Fetch data first time 
    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <div className="container parent">
                {displayLoading()}
                <div className="box">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="w-75 row mx-0 px-0">
                            <div className="col-12">
                                <h4 className="mb-4 text-center">Thay đổi cài đặt</h4>
                            </div>
                            <div className="col-12 row d-flex justify-content-center">
                                <div className="col-5">Số xe tiếp nhận tối đa trong ngày:</div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <input type="number" className="form-control text-center" name="maxNumberOfReceivedCarInDay" id="maxNumberOfReceivedCarInDay" defaultValue={parameters.maxNumberOfReceivedCarInDay} />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary w-100" onClick={changeNumberOfReceivedCarInDay}>Cập nhật</button>
                                </div>
                            </div>
                            <div className="col-12 row d-flex justify-content-center">
                                <div className="col-5">Số hiệu xe:</div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <input type="number" className="form-control text-center" defaultValue={parameters.numberOfCarBrand} readOnly />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary w-100">Chỉnh sửa danh sách</button>
                                </div>
                            </div>
                            <div className="col-12 row d-flex justify-content-center">
                                <div className="col-5">Số loại vật tư:</div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <input type="number" className="form-control text-center" defaultValue={parameters.numberOfAccessory} readOnly />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary w-100">Chỉnh sửa danh sách</button>
                                </div>
                            </div>
                            <div className="col-12 row d-flex justify-content-center">
                                <div className="col-5">Số loại tiền công:</div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <input type="number" className="form-control text-center" defaultValue={parameters.numberOfKindOfWage} readOnly />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary w-100">Chỉnh sửa danh sách</button>
                                </div>
                            </div>
                            <div className="col-12 row mx-0 px-0">
                                <div className="col-5 d-flex align-items-center">
                                    <label htmlFor="customSwitch1">Cho phép thu tiền lớn hơn số
                                        nợ: </label>
                                </div>
                                <div className="col-7 pl-0">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
