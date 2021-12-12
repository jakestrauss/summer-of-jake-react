import React from 'react';

export default function Checkbox({ type = 'checkbox', name, checked = true, onChange }) {
    return (<input type={type} name={name} checked={checked} onChange={onChange} /> )
}