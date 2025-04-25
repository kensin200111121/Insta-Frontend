import type { FC } from 'react';
import { InputNumber, InputNumberProps } from 'antd';

const MyInputNumber: FC<InputNumberProps> = (props) => {

  const getDecimalCount = (value: string) => {
    if (!value || value.indexOf('.') === -1){
      return 0;
    }
    return value.split('.')[1].length;
  }

  return (
    <InputNumber
      {...props}
      onKeyDown={(e) => {
        if (!/[0-9]|\.|Backspace|Delete|Arrow/.test(e.key) || 
          (props.precision && getDecimalCount(e.currentTarget.value) == props.precision && /[0-9]|\./.test(e.key))) {
          e.preventDefault();
        }
      }}
    />
  );
};

export default MyInputNumber;