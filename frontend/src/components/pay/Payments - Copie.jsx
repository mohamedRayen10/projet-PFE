import React, { useState, useEffect } from 'react';
import ViewMoreButton from './ViewMoreButton';

const Payments = (props) => {
    const [data, setData] = useState([]);
    const {alldata}=props
    useEffect(() => {
      const transformedData = transformData(alldata);
      setData(transformedData);
    }, [alldata]);
      const transformData = (data) => {
        const summary = {
          Succeeded: { amount:0, backgroundColor: 'bg-green-300' },
          Uncaptured: { amount: 0, backgroundColor: 'bg-blue-300' },
          Refunded: { amount: 0, backgroundColor: 'bg-yellow-300' },
          Failed: { amount: 0, backgroundColor: 'bg-red-300' },
        };
        data.forEach(transaction => {

          const amount = parseFloat(transaction.Amount.replace(',', ''));
          switch (transaction.Status) {
            case 'Paid':
              summary.Succeeded.amount += amount;
              break;
            case 'Uncaptured':
              summary.Uncaptured.amount += amount;
              break;
            case 'Refunded':
              summary.Refunded.amount += amount;
              break;
            case 'requires_payment_method':
              summary.Failed.amount += amount;
              break;
            default:
              
              break;
          }
        });
    
        return Object.keys(summary).map(status => ({
          status,
          amount: summary[status].amount,
          backgroundColor: summary[status].backgroundColor,
        }));
      };
    

     const totalAmount = data.reduce((total, payment) => total + payment.amount, 0);

     return (
       <div>
         <div className='flex justify-between items-center'>
           <h2 className="font-bold text-xl">Payments</h2>
           <p className='text-gray-400'>Jul 9, 2023 - Today</p>
         </div>
         <div className="h-4 w-full rounded my-3 relative overflow-hidden">
          
           {data.map((payment, index) => (
             <div
               key={index}
               className={`absolute h-full ${payment.backgroundColor}`}
               style={{
                 left: `${(data.slice(0, index).reduce((acc, curr) => acc + curr.amount, 0) / totalAmount) * 100}%`,
                 width: `${(payment.amount / totalAmount) * 100}%`
               }}
                    ></div>
                ))}
            </div>

            {data.map((payment, index) => (
                <div key={index}>
                    <div className="flex justify-between py-3 items-center">
                        <div className="flex gap-2 items-center">
                            <div className={`bg-black h-3 w-3 rounded ${payment.backgroundColor}`}></div>
                            <p>{payment.status}</p>
                        </div>
                        <p className="p-2 font-bold ">
                            {payment.amount.toFixed(2)} {/* Format amount */}
                        </p>
                    </div>
                    {index !== data.length - 1 && <hr className="my-2" />}
                </div>
            ))}

            <ViewMoreButton/>
        </div>
    );
};

export default Payments;
