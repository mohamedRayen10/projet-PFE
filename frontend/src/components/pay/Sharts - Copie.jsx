import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ViewMoreButton from './ViewMoreButton';
import { startOfWeek, format } from 'date-fns';

const Charts = ({ alldata, label }) => {
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const Paidpayments = alldata
      .filter(payment => payment.Status === 'Paid')
      .map(payment => ({
        ...payment,
        Amount: parseFloat(payment.Amount.replace(',', '.')),
        'Created date (UTC)': new Date(payment['Created date (UTC)']),
      }));

    const aggregatedData = Paidpayments.reduce((acc, payment) => {
      const weekStart = startOfWeek(payment['Created date (UTC)'], { weekStartsOn: 1 }); 
      const weekStartString = format(weekStart, 'yyyy-MM-dd');
      if (!acc[weekStartString]) {
        acc[weekStartString] = 0;
      }
      acc[weekStartString] += payment.Amount;
      return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(week => ({
      week,
      totalSales: aggregatedData[week],
    }));

    setData(chartData);

    // Calculate total sales
    const total = Paidpayments.reduce((sum, payment) => sum + payment.Amount, 0);
    setTotalSales(total);
  }, [alldata]);

  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload.index === 0 || payload.index === data.length - 1) {
      return (
        <text x={x} y={y + 10} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
      );
    }
    return null;
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    const values = data.map(entry => entry.totalSales);
    if (payload.value === Math.min(...values) || payload.value === Math.max(...values)) {
      return (
        <text x={x - 10} y={y} dy={16} textAnchor="end" fill="#666">
          {payload.value}
        </text>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">{label}</h2>
        <p>${totalSales.toFixed(3)}</p>
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <LineChart data={data} margin={{ top: 20, bottom: 5 }}>
          <XAxis dataKey="week" tick={CustomXAxisTick} axisLine={true} tickLine={false} />
          <YAxis tick={CustomYAxisTick} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <ViewMoreButton />
    </div>
  );
};

export default Charts;
