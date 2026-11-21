import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ViewMoreButton from './ViewMoreButton';
import { startOfWeek, format } from 'date-fns';

const Newcustomerscharts = ({ alldata, label }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
    const Paidpayments = alldata
        .filter(payment => payment.Status === 'Paid')
        .map(payment => ({
        ...payment,
        'Created date (UTC)': new Date(payment['Created date (UTC)']),
        }));

    const aggregatedData = Paidpayments.reduce((acc, payment) => {
        const weekStart = startOfWeek(payment['Created date (UTC)'], { weekStartsOn: 1 }); 
        const weekStartString = format(weekStart, 'yyyy-MM-dd');
        if (!acc[weekStartString]) {
        acc[weekStartString] = 0;
        }
        acc[weekStartString] += 1;  // Count the number of payments
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(week => ({
        week,
        newCustomers: aggregatedData[week],
    }));

    setData(chartData);
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
    const values = data.map(entry => entry.newCustomers);
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
        <p>Total New Customers: {data.reduce((sum, item) => sum + item.newCustomers, 0)}</p>
        </div>
        <ResponsiveContainer width="100%" height={270}>
        <LineChart data={data} margin={{ top: 20, bottom: 5 }}>
            <XAxis dataKey="week" tick={CustomXAxisTick} axisLine={true} tickLine={false} />
            <YAxis tick={CustomYAxisTick} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="newCustomers" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
        <ViewMoreButton />
    </div>
    );
};

export default Newcustomerscharts;

