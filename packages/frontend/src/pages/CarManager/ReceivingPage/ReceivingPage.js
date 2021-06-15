import React from 'react';
import './ReceivingCar.css';
import ReceivingList from './ReceivingList';
import ReceivingForm from './ReceivingForm';


export default function ReceivingCar() {
    return (
        <div className="container">
            <div className="box-container">
                <div className="box--col-2">
                    <h5 className="text-center">Tiếp nhận bảo trì xe</h5>
                    <ReceivingForm />
                </div>
                <div className="box--col-2">
                    <h5 className="text-center">Danh sách xe đã tiếp nhận trong ngày</h5>
                    <ReceivingList/>
                    <p className="text-center my-3">Garage chỉ tiếp nhận 30 xe mỗi ngày</p>
                    <div className="receiving-status">
                        <div className="processing" data-status={35} />
                    </div>
                    <p className="text-center">Đã tiếp nhận 20/30 xe</p>
                </div>
            </div>
        </div>
    )
}
