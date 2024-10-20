'use client';

import { algorithmOptions } from '@/lib/utils';
import React from 'react'

export const Select = ({
    options,
    defaultValue,
    onChange,
    isDisabled = false,
}) => {
  return (
    <div>
        <select
            disabled={isDisabled}
            defaultValue={defaultValue}
            className='border-2 border-[#2363a2] bg-transparent text-[#3d9bf8] text-lg p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] transition duration-300 ease-in-out'
            onChange={onChange}
        >
            {algorithmOptions.map((option)=>
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            )}
        </select>
    </div>
  )
}
