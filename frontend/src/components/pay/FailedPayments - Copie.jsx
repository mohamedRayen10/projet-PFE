import React,{useState,useEffect} from 'react';
import ViewMoreButton from './ViewMoreButton';

const FailedPayments = (props) => {
  const {alldata}=props
  const [data, setData] = useState();
  const [datalength,setdatalength]=useState(4)
  const [pdatalength,setpdatalength]=useState()
  useEffect(() => {
    const transformedData = alldata.filter(payment => payment.Status === 'Failed');
    setData(transformedData);
    
  }, [alldata]);

  
  const showmore=(e)=>{
    e.preventDefault()
    setpdatalength(datalength)
    setdatalength(pdatalength=>pdatalength+4)
  }
  
  return (
    <div>
      <h2 className='font-bold text-xl'>Failed Payments</h2>
      {
        data ?
        (

          data.slice(pdatalength, datalength).map((payment, index) => (
            <div key={index}>
            <div className='flex justify-between py-3 items-center'>
              <div className='flex flex-col'>
              <p>{payment.Amount}</p>
              <p className='text-sm'>{payment["Created date (UTC)"]}</p>
              </div>
              <p className='text-red-700 px-4 py-1 rounded bg-red-200'>Failed</p>
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
  );
}

export default FailedPayments;
