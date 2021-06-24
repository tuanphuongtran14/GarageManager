import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ReceivingCar from '../CarManager/ReceivingPage/ReceivingPage';
import CreataRepairVotesPage from '../CarManager/CreateRepairVotesPage/CreateRepairVotesPage';
import CarLookup from '../CarManager/Lookup/Lookup';
import CollectMoney from '../CollectMoney/CollectMoney';
import MonthlySalesReport from '../MonthlySalesReport/MonthlySalesReport';

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
                </Switch>
            {/* <Footer/> */}
        </Router>
    )
}
