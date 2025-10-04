import React from 'react'
export function Button({ className='', variant='default', size='md', ...props }) {
  const base = 'inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl shadow-sm transition active:scale-[.99]'
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  }
  const sizes = { icon: 'p-2 aspect-square', md: '' }
  return <button className={`${base} ${variants[variant]||variants.default} ${sizes[size]||''} ${className}`} {...props} />
}
