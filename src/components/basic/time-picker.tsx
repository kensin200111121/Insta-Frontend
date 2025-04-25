import type { FC } from 'react';

import { TimePicker } from 'antd';

const BasePicker: FC = props => {
  return <MyTimePicker {...props} />;
};

const MyTimePicker = Object.assign(TimePicker, BasePicker);

export default MyTimePicker;
