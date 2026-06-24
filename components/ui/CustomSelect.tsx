'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  name: string
  options: { label: string; value: string }[]
  placeholder?: string
}

export function CustomSelect({ id: providedId, name, options, placeholder = 'Select' }: Props) {
  const generatedId = useId()
  const id = providedId || generatedId
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((o) => o.value === selected)
      setHighlightedIndex(idx >= 0 ? idx : 0)
    }
  }, [isOpen, selected, options])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          setSelected(options[highlightedIndex].value)
          setIsOpen(false)
          buttonRef.current?.focus()
        }
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  const selectedLabel = options.find((o) => o.value === selected)?.label

  return (
    <div className="relative w-full" ref={ref} onKeyDown={handleKeyDown}>
      <input type="hidden" name={name} value={selected} id={id} />

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'form-field flex justify-between items-center w-full text-left bg-white transition-colors duration-200 cursor-pointer select-none',
          isOpen && 'border-teal ring-2 ring-teal/20',
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
      >
        <span className={cn('truncate pr-2', !selected ? 'text-ink/60 font-normal' : 'text-ink font-medium')}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={cn('w-4 h-4 text-teal transition-transform duration-200', isOpen && 'rotate-180')}
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
            id={`${id}-listbox`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-hairline rounded-card shadow-lg z-[500] py-1"
            role="listbox"
          >
            {options.map((option, index) => {
              const isSelected = selected === option.value
              const isHighlighted = highlightedIndex === index
              return (
                <button
                  key={option.value}
                  id={`${id}-option-${index}`}
                  type="button"
                  onClick={() => {
                    setSelected(option.value)
                    setIsOpen(false)
                    buttonRef.current?.focus()
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm border-t first:border-0 border-hairline/50 transition-colors duration-150',
                    isSelected ? 'bg-teal text-white font-semibold' : 'text-ink font-medium',
                    isHighlighted && !isSelected && 'bg-teal/10 text-teal',
                  )}
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
