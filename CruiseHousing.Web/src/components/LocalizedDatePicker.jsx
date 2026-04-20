import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Import Japanese locale from dayjs
import 'dayjs/locale/ja';

export default function LocalizedDatePicker() {
  const [value, setValue] = React.useState(null);

  return (
    // Set the locale to Japanese
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        className='date-picker'
      />
    </LocalizationProvider>
  );
}