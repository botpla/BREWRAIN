import React from 'react'
export function Textarea({ className='', ...props }) {
  return <textarea className={`w-full px-3 py-2 border rounded-xl outline-none focus:ring ring-emerald-200 ${className}`} {...props} />
}
