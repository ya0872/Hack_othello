import React from 'react';
import {type Cell as CellType} from '../types';

interface CellProps {
    value: CellType;
    onClick: () => void;
}

const Cell: React.FC<CellProps> = ({value, onClick}) => {
    return (
        <div
            onClick = {onClick}
            style = {{
                width: 50, height: 50, backgroundColor: 'green',
                border: '1px solid black',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
            }}
        >
            {value && (
                <div
                    style ={{
                        width: 40, height: 40, borderRadius: '50%',
                        backgroundColor: value === 'black' ? 'black' : 'white',
                    }}
                />
            )}
        </div>
    );
};

export default Cell;