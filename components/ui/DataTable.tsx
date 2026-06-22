'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import type { MachineryItem } from '@/content/machinery'
import type { EquipmentItem } from '@/content/equipment'

type TableItem = MachineryItem | EquipmentItem

type Props = {
  data: TableItem[]
  caption?: string
}

type GroupedCategory = {
  no: string
  name: string
  items: TableItem[]
}

export function DataTable({ data, caption }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Group data by categories
  const groupedData = useMemo(() => {
    const groups: GroupedCategory[] = []
    let currentGroup: GroupedCategory | null = null

    data.forEach((item) => {
      if (item.isCategory) {
        currentGroup = {
          no: item.no,
          name: item.name,
          items: [],
        }
        groups.push(currentGroup)
      } else if (currentGroup) {
        currentGroup.items.push(item)
      }
    })

    return groups;
  }, [data])

  // Get a unique list of category names/numbers for the dropdown
  const categoriesList = useMemo(() => {
    return groupedData.map((g) => ({
      no: g.no,
      name: g.name,
      label: `${g.no}. ${g.name}`,
    }))
  }, [groupedData])

  // Filter based on selected category and search string
  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase().trim()

    return groupedData
      .map((group) => {
        // If specific category is selected, filter out others
        if (selectedCategory !== 'all' && group.no !== selectedCategory) {
          return null
        }

        // Filter items in the group if search is active
        const matchingItems = group.items.filter((item) => {
          if (!q) return true
          return (
            item.name.toLowerCase().includes(q) ||
            item.make.toLowerCase().includes(q) ||
            item.no.includes(q)
          )
        })

        if (matchingItems.length === 0 && q) {
          return null
        }

        return {
          ...group,
          items: matchingItems,
        }
      })
      .filter((g): g is GroupedCategory => g !== null)
  }, [groupedData, selectedCategory, search])

  const totalItemsCount = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.items.length, 0)
  }, [filteredGroups])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-surface p-4 rounded-card border border-hairline shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          {/* Search bar */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search by name or manufacturer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-field pl-9 py-2 text-sm w-full"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full sm:w-80" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="form-field py-2 px-4 text-sm w-full flex justify-between items-center bg-white cursor-pointer select-none text-left focus:outline-none focus:ring-2 focus:ring-teal/20"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="truncate pr-2 text-ink font-medium">
                {selectedCategory === 'all' 
                  ? 'All Categories' 
                  : categoriesList.find(c => c.no === selectedCategory)?.label || selectedCategory}
              </span>
              <svg
                className={`w-4 h-4 text-body transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div 
                className="absolute left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white border border-hairline rounded-card shadow-lg z-[500] py-1 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150"
                role="listbox"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all')
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                    selectedCategory === 'all' 
                      ? 'bg-teal text-white font-semibold' 
                      : 'text-ink hover:bg-slate-50 hover:text-teal'
                  }`}
                  role="option"
                  aria-selected={selectedCategory === 'all'}
                >
                  All Categories
                </button>
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat.no
                  return (
                    <button
                      key={cat.no}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.no)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm border-t border-hairline/50 transition-colors duration-150 ${
                        isSelected 
                          ? 'bg-teal text-white font-semibold' 
                          : 'text-ink hover:bg-teal/5 hover:text-teal font-medium'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <p className="font-body text-body-md text-body self-center md:self-auto mt-2 md:mt-0">
          Showing <span className="font-semibold text-ink">{totalItemsCount}</span> item{totalItemsCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Categories lists & Tables */}
      <div className="space-y-8">
        {filteredGroups.map((group) => (
          <div key={group.no} className="border border-hairline rounded-card overflow-hidden shadow-card bg-white">
            {/* Category Header Banner */}
            <div className="bg-teal px-5 py-3.5 flex justify-between items-center text-white">
              <h3 className="font-display font-bold text-headline-sm uppercase tracking-wide flex items-center gap-2">
                <span className="opacity-70 text-body-md">{group.no}</span>
                {group.name}
              </h3>
              <span className="bg-white/20 text-white font-body text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {group.items.length} item{group.items.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface/50 border-b border-hairline">
                    <th scope="col" className="px-5 py-3 text-left font-body text-label-md uppercase tracking-wider w-20 text-body">
                      No.
                    </th>
                    <th scope="col" className="px-5 py-3 text-left font-body text-label-md uppercase tracking-wider text-body">
                      Name / Description
                    </th>
                    <th scope="col" className="px-5 py-3 text-left font-body text-label-md uppercase tracking-wider text-body">
                      Make
                    </th>
                    <th scope="col" className="px-5 py-3 text-right font-body text-label-md uppercase tracking-wider w-28 text-body">
                      Qty.
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {group.items.map((item, idx) => (
                    <tr
                      key={item.no}
                      className={`transition-colors hover:bg-surface/40 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-surface/10'
                      }`}
                    >
                      <td className="px-5 py-3 font-body text-body-md text-body pl-8">{item.no}</td>
                      <td className="px-5 py-3 font-body text-body-md text-ink font-medium">{item.name}</td>
                      <td className="px-5 py-3 font-body text-body-md text-body">{item.make || '—'}</td>
                      <td className="px-5 py-3 font-body text-body-md text-teal text-right font-bold">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View */}
            <div className="md:hidden divide-y divide-hairline bg-white">
              {group.items.map((item) => (
                <div key={item.no} className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-display font-semibold text-ink text-body-md">
                      {item.no} — {item.name}
                    </span>
                    <span className="shrink-0 bg-teal/10 text-teal text-xs font-body font-bold px-2 py-0.5 rounded-full">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  {item.make && (
                    <div className="font-body text-body-md text-body">
                      <span className="font-medium text-ink">Make:</span> {item.make}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="text-center py-16 bg-surface rounded-card border border-hairline text-body font-body text-body-md">
            No items matching your selection or search details found.
          </div>
        )}
      </div>
    </div>
  )
}

