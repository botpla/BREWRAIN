import React from 'react'
export function Badge({ className='', children, variant='default' }) {
  const variants = {
    default: 'bg-emerald-600 text-white',
    secondary: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }
  return <span className={`inline-block text-xs px-2 py-1 rounded-lg ${variants[variant]||variants.default} ${className}`}>{children}</span>
}
