import dayjs from 'dayjs';
import { FormFieldProps } from 'slick-form';
const fields: FormFieldProps[] = [
  {
    type: 'RangePicker',
    name: 'date',
    label: '时间范围',
    required: true,
    transform: ({ date }) => {
      return (
        date && {
          startTime: dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss'),
        }
      );
    },
  },
];
export default {
  fields,
};
