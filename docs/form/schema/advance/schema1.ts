import dayjs from 'dayjs';
import { FormFieldProps } from 'slick-form';
const fields: FormFieldProps[] = [
  {
    type: 'DatePicker',
    name: 'datePicker',
    label: '选择时间',
    beforeReceive: ({ datePicker }) => {
      return dayjs(datePicker);
    },
  },
];
export default {
  fields,
};
