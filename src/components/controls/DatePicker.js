import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => (
        {
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                autoOk="on"
                variant="inline"
                format="dd/MM/yyyy"
                inputVariant="outlined"
                margin="normal"
                id="date-picker-inline"
                label={label}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                //   onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}
