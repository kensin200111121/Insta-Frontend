import { useEffect, useState } from 'react';
import { MySelect } from '@/components/basic';
import { SelectOption } from '@/patterns/selectOptions';

interface StatusCellProps<T extends string | number>{
    recordId: string,
    status: T,
    options: SelectOption<T>[];
    colors?: Record<string, string>;
    minWidth?: number;
    onChange?: (recordId: string, status: T) => boolean|void;
}

const StatusCell = <T extends string | number>({recordId, status, minWidth, options, colors, onChange}: StatusCellProps<T>) => {

    const [isEditting, setIsEditting] = useState(false);
    const [curStatus, setCurStatus] = useState<T>(status);

    const handleSelectionChange = (value: T) => {
        if(onChange){
            if(onChange(recordId, value) === false){
                return;
            }
        }
        setCurStatus(value);
    }

    useEffect(() => {
        setIsEditting(false);
    }, [curStatus]);

    return (
        <div className='w-full h-full' style={minWidth ? {minWidth: `${minWidth}px`} : {}} onClick={() => setIsEditting(true)}>
            { isEditting ? (
                <MySelect
                    className='w-full'
                    options={options}
                    onChange={handleSelectionChange}
                    defaultValue={curStatus}
                    onBlur={() => setIsEditting(false)}
                />
            ) : (
                <span className={`w-full h-full${colors ? ` text-${colors[curStatus.toString()]}` : ''}`}>{options.find(d => d.value == curStatus)?.label || ''}</span>
            )}
        </div>
    )
};

export default StatusCell;
