'use client';

import React from 'react'

import { MAX_ANIMATION_SPEED, MNI_ANIMATION_SPEED } from '@/lib/utils';

export const Slider = (
  min = MNI_ANIMATION_SPEED,
  max = MAX_ANIMATION_SPEED,
  step = 10,
  value,
  handleChange,
  isDisabled = false,
) => {
  return (
    <div className='flex gap-2 items-center justify-center'>
        <span className="text-center text-gray-300">Slow</span>
        <input
        disabled={isDisabled}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-4 rounded-lg appearance-none cursor-pointer bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4288ca] focus:border-[#00FFFF]"
      />
      <span className="text-center text-gray-300">Fast</span>
    </div>
  )
}
