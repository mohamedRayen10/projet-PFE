import React, { useEffect, useState } from 'react';

function Topcustomers(props) {
  const { alldata } = props;
  const [userspayment, setuserpayment] = useState([]);
  const [datalength, setdatalength] = useState(4);
  const [pdatalength,setpdatalength]=useState()
  useEffect(() => {
    const Paidpayments = alldata.filter(payment => payment.Status === 'Paid');
    transformData(Paidpayments);
  }, [alldata]);

  const transformData = (data) => {
    const users = [];
    data.forEach((user) => {
      if (!users.includes(user["client_ref (metadata)"])&& !user["client_ref (metadata)"]=="") {
        users.push(user["client_ref (metadata)"]);
      }
    });

    const updatedUsersPayment = users.map((user) => {
      const alluserpayments = data.filter(payment => payment["client_ref (metadata)"] === user);
      const totalAmount = alluserpayments.reduce((sum, payment) => sum + parseFloat(payment.Amount.replace(',', '.')),0);
      return {
        name: user,
        Amount: totalAmount,
      };
    });
    
    setuserpayment(updatedUsersPayment.sort((a,b) => b.Amount - a.Amount));
  };

  const showmore=(e)=>{
    e.preventDefault()
    setpdatalength(datalength)
    setdatalength(pdatalength=>pdatalength+4)
  }
  return (
    <div>
        {
        userspayment ?
        (

          userspayment.slice(pdatalength, datalength).map((payment, index) => (
            <div key={index}>
            <div className='flex justify-between py-5 items-center'>
              <div className='flex flex-col'>
              <p className='text-sm'>{payment.name}</p>
              </div>
              
              { payment.Amount} $
              
            </div>
            <hr />
          </div>
        ))
      )
      :null
      }
      <div className='flex justify-between items-center pt-3' onClick={showmore} >
        <a className='text-purple-500 underline' href="#">view more</a>
        <p className='text-gray-500'>updated yesterday</p>
      </div>
    </div>
  )
}

export default Topcustomers