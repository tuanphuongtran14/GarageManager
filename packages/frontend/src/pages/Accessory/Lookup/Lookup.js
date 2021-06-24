import React, { useState, useEffect } from 'react';
import './Lookup.css';
import axios from 'axios';

export default function Lookup() {
    // Loading screen state 
    const [loading, setLoading] = useState(true);
    // Others state
    const [accessories, setAccessories] = useState([]);


    // Fetch data first time
    useEffect(() => {
        fetchData();
    }, []);


    // Fetch data function
    const fetchData = () => {
        // Turn on loading screen
        setLoading(true);

        axios({
            method: "GET",
            url: "/api/accessories"
        })
            .then(response => {
                setAccessories(response.data);

                // Turn off loading screen
                setLoading(false);
            })
            .catch(error => {
                if(error.response && error.response.data) 
                    alert("Lỗi: " + error.response.data.message);
                
                // Turn off loading screen
                setLoading(false);
            });
    }


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

    const displayResultTableRows = () => {
        return accessories.map((accessory, index) => {
            return (
                <tr>
                    <td>{ (index + 1).toString().padStart(3, 0) }</td>
                    <td>{ accessory.name }</td>
                    <td className="text-center">{ accessory.unitPrice.toLocaleString() }</td>
                    <td className="text-center">{ accessory.remaining }</td>
                    <td className="text-center">
                        <button className="btn"><i className="fa fa-trash text-danger" aria-hidden="true" /></button>
                        <button className="btn"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></button>
                    </td>
                </tr>
            )
        })
    }


    return (
        <>
            <div className="container parent">
                { displayLoading() }
                <div className="box">
                    <div className="d-flex align-items-center">
                        <label className="mr-3" htmlFor>Tên phụ tùng:</label>
                        <input type="text" className="form-control search-form mr-5" name id aria-describedby="helpId" placeholder />
                        <button type="submit" className="btn btn-primary">Tìm ngay</button>
                    </div>
                    <div className="list mt-4">
                        <table className="table">
                            <thead className="thead-dark sticky-top" style={{ zIndex: '0.5' }}>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên phụ tùng</th>
                                    <th className="text-center">Đơn giá</th>
                                    <th className="text-center">Số lượng còn</th>
                                    <th className="text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                { displayResultTableRows() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
