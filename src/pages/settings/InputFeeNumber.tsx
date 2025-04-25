import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { css } from '@emotion/react';
import { FeeInfo } from '@/interface/data/store.interface';

interface InputFeeNumbereProps{
    placeholder?: string;
    max?: number;
    onChange?: ( data: FeeInfo ) => void;
}

const InputFeeNumber: FC<InputFeeNumbereProps> = ({placeholder, max, onChange}) => {

    const [mode, setMode] = useState(0);
    const [value, setValue] = useState(0);
    const btnStrings = ['$', '%'];
    
    useEffect(() => {
        if(onChange){
            onChange({value: value, unit: btnStrings[mode]});
        }
    }, [value, mode]);

    return (
        <InputNumber placeholder={placeholder || "100.00"} min={0} max={mode == 0 ? max : 100} prefix={btnStrings[mode]} addonAfter={
            <div className='input-number-ending' css={inputNumberStyles}>
                {
                    btnStrings.map((str, index) => (
                        <button className={index == mode ? 'btn-number-active' : ''} onClick={() => setMode(1-mode)}>
                            {btnStrings[index]}
                        </button>)
                    )
                }
            </div>
        } onChange={val => setValue(val || 0)}/>
    )
};

export default InputFeeNumber;

const inputNumberStyles = css`
    display: flex;
    flex-direction: row;
    gap: 8px;

    button{
        font-size: 10px;
        font-weight: 700;
        font-family: Poppins;
        width: 20px;
        height: 20px;
        border: 2px solid #9D9D9D;
        border-radius: 50%;
        color: #9D9D9D;
        padding: 0px 0px;
        cursor: pointer;
    }

    .btn-number-active{
        color: #30260B;
        border-color: #30260B;
    }
`;