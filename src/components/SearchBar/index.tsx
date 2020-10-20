import React from 'react'
import './styles.css';


interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: () => void;
}

export const SearchBar = ({value, onChange, handleClick}: Props) => {
    return (
        <div>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={handleClick}>Search</button>
        </div>
    )
}
