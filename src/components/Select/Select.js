import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

const Select = ({ options = [], className }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };
    console.log(selectedValue);
    return (
        <Form.Select value={selectedValue} onChange={handleSelectChange} className={className}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Form.Select>
    );
};

export default Select;
