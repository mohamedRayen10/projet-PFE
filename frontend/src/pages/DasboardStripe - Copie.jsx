import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import FailedPayments from '../components/pay/FailedPayments';
import Sharts from '../components/pay/Sharts';
import Payments from '../components/pay/Payments';
import Filters from '../components/pay/filters/Filters';
import Topcustomers from '../components/pay/Topcustomers';
import Failedpaymentcharts from '../components/pay/Failedpaymentcharts';
import Newcustomerscharts from '../components/pay/Newcustomerscharts';

const DasboardStripe = () => {
  const [data, setData] = useState([]);
  const [periodFilter, setPeriodFilter] = useState({
    startDate: dayjs(),
    endDate: dayjs()
  });

  const changePeriod = ([start, end]) => {
    setPeriodFilter({ startDate: start, endDate: end });
  };

  const filterDataByPeriod = (data, { startDate, endDate }) => {
    const start = startDate.toDate();
    const end = endDate.toDate();

    return data.filter(item => {
      const createdDate = new Date(item["Created date (UTC)"]);
      return createdDate >= start && createdDate <= end;
    });
  };

  useEffect(() => {
    fetch('/csvjson.json')
      .then(response => response.json())
      .then(fetchedData => {
        const filteredData = filterDataByPeriod(fetchedData, periodFilter);
        setData(filteredData);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, [periodFilter]);

  return (
    <div className="container mx-auto p-4">
      <hr className="border-t-1 border-gray-300 my-4 w-full hidden lg:block" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Filters changePeriod={changePeriod} periodFilter={[periodFilter.startDate, periodFilter.endDate]} />
        <div className="p-4"><Payments alldata={data} /></div>
        <div className="p-4"><Sharts label='Gross volume' alldata={data} /></div>
        <div className="p-4"><Failedpaymentcharts label='Failed Payments' alldata={data} /></div>
        <hr className="border-t-1 border-gray-300 col-span-3 my-4 hidden w-full lg:block" />
        <div className="p-4"><FailedPayments alldata={data} /></div>
        <div className="p-4"><Newcustomerscharts label='New Customers' alldata={data} /></div>
        <div className="p-4"><Topcustomers alldata={data} /></div>
      </div>
      <hr className="border-t-1 border-gray-300 my-4 w-full sm:hidden" />
    </div>
  );
};

export default DasboardStripe;
