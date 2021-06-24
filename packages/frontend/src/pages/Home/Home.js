import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ReceivingCar from '../CarManager/ReceivingPage/ReceivingPage';
import CreataRepairVotesPage from '../CarManager/CreateRepairVotesPage/CreateRepairVotesPage';
import CarLookup from '../CarManager/Lookup/Lookup';
import CollectMoney from '../CollectMoney/CollectMoney';
import MonthlySalesReport from '../MonthlySalesReport/MonthlySalesReport';
import MonthlyInventoryReport from '../MonthlyInventoryReport/MonthlyInventoryReport';
import ImportAccessories from '../Accessory/ImportAccessories/ImportAccessories';
import AccessoryLookup from '../Accessory/Lookup/Lookup';

export default function Home() {
    return (
        <Router>
            <Header/>
                <Switch>
                    <Route path="/quan-ly-xe/tiep-nhan-xe" component={ReceivingCar} />
                    <Route path="/quan-ly-xe/lap-phieu-sua-chua" component={CreataRepairVotesPage} />
                    <Route path="/quan-ly-xe/tra-cuu-xe" component={CarLookup} />
                    <Route path="/thu-tien" component={CollectMoney} />
                    <Route path="/lap-bao-cao/doanh-thu-thang" component={MonthlySalesReport} />
                    <Route path="/lap-bao-cao/ton-phu-tung" component={MonthlyInventoryReport} />
                    <Route path="/quan-ly-phu-tung/nhap-phu-tung" component={ImportAccessories} />
                    <Route path="/quan-ly-phu-tung/tra-cuu" component={AccessoryLookup} />
                </Switch>
            {/* <Footer/> */}
        </Router>
    )
}
