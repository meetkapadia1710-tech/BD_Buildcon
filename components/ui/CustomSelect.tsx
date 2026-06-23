'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  id?: string
  name: string
  options: { label: string; value: string }[]
  placeholder?: string
}

export function CustomSelect({ id, name, options, placeholder = 'Select' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((o) => o.value === selected)?.label

  return (
    <div className="relative w-full" ref={ref}>
      <input type="hidden" name={name} value={selected} id={id} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`form-field flex justify-between items-center w-full text-left bg-white transition-colors duration-200 cursor-pointer select-none ${
          isOpen ? 'border-teal ring-2 ring-teal/20' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate pr-2 ${!selected ? 'text-ink/60 font-normal' : 'text-ink font-medium'}`}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-teal transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-hairline rounded-card shadow-lg z-[500] py-1"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = selected === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelected(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm border-t first:border-0 border-hairline/50 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-teal text-white font-semibold'
                      : 'text-ink hover:bg-teal/5 hover:text-teal font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
