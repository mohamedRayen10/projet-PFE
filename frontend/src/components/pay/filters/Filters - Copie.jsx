import React, { useState } from 'react';
import '@fontsource/inter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

export default function Filters(props) {
    const changePeriod = (newValue) => {
        if (newValue && newValue[0] && newValue[1]) {
            props.changePeriod(newValue);
        }
    };
    
    return (
        <div className='block sm:flex container items-center mx-auto p-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['SingleInputDateRangeField']}>
                    <DateRangePicker
                        slots={{ field: SingleInputDateRangeField }}
                        name="allowedRange"
                        value={props.periodFilter}
                        onChange={(newValue) => changePeriod(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}