import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function ManagerList() {
    // Loading screen state 
    const [loading, setLoading] = useState(true);
    // Others state
    const [receivingForms, setReceivingForms] = useState([]);
    // Other variables
    const history = useHistory();

    // Fetch data function
    const fetchData = licensePlate => {
        // Turn on loading screen
        setLoading(true);

        let query = '?';
        if (licensePlate)
            query += `licensePlate=${licensePlate}`;

        axios({
            method: "GET",
            url: `/api/receiving-forms/search${query}`
        })
            .then(response => {
                setReceivingForms(response.data);

                // Turn off loading screen
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.data)
                    alert("Lỗi: " + error.response.data.message);

                // Turn off loading screen
                setLoading(false);
            });
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

    // Function for displaying rows of result table
    const displayResultTableRows = () => {
        return receivingForms.map((receivingForm, index) => {
            const receivingDate = new Date(receivingForm.receivingDate);
            let status = (<span class="badge badge-secondary">Đã tiếp nhận</span>);

            if(receivingForm.isDone)
                status = (<span class="badge badge-success">Đã sửa</span>);
            
            return (
                <tr>
                    <td>{(index + 1).toString().padStart(4, 0)}</td>
                    <td className="text-center">{`${receivingDate.getDate().toString().padStart(2, 0)}/${(receivingDate.getMonth() + 1).toString().padStart(2, 0)}/${receivingDate.getFullYear()}`}</td>
                    <td className="text-center">{receivingForm.car.licensePlate}</td>
                    <td>{receivingForm.car.carOwner.name}</td>
                    <td>{receivingForm.car.carOwner.phoneNumber}</td>
                    <td className="text-center">{status}</td>
                </tr>
            )
        })
    }

    // Function for handling click search button
    const handleSubmitSearch = event => {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value;
        // Fetch new data based on name
        fetchData(searchInput);
    }



    // Fetch data first time
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="container parent">
                {displayLoading()}
                <div className="box">
                    <h4 className="text-center mb-4">Danh sách phiếu tiếp nhận</h4>
                    <div className="d-flex align-items-center">
                        <label className="mr-3" htmlFor>Biển số xe:</label>
                        <input type="text" className="form-control search-input mr-5" name="searchInput" id="searchInput" aria-describedby="helpId" placeholder />
                        <button type="submit" className="btn btn-primary" onClick={handleSubmitSearch}>Tìm ngay</button>
                    </div>
                    <div className="list mt-4">
                        <table className="table">
                            <thead className="thead-dark sticky-top" style={{ zIndex: '0.5' }}>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày tiếp nhận</th>
                                    <th className="text-center">Biển số xe</th>
                                    <th>Tên chủ xe</th>
                                    <th>Số điện thoại</th>
                                    <th className="text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayResultTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
