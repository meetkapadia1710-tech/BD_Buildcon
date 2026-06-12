'use client'

import { useState, useMemo } from 'react'
import type { MachineryItem } from '@/content/machinery'
import type { EquipmentItem } from '@/content/equipment'

type TableItem = MachineryItem | EquipmentItem

type Props = {
  data: TableItem[]
  caption?: string
}

export function DataTable({ data, caption }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(
      (item) =>
        item.isCategory ||
        item.name.toLowerCase().includes(q) ||
        item.make.toLowerCase().includes(q) ||
        item.no.includes(q)
    )
  }, [data, search])

  const resultCount = filtered.filter((i) => !i.isCategory).length

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
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
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-field pl-9 py-2 text-sm"
          />
        </div>
        <p className="font-body text-body-md text-body">
          {search ? (
            <>
              <span className="font-semibold text-ink">{resultCount}</span> result
              {resultCount !== 1 ? 's' : ''}
            </>
          ) : (
            <>
              <span className="font-semibold text-ink">{resultCount}</span> items
            </>
          )}
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-card border border-hairline shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label={caption}>
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="bg-teal text-white">
                <th scope="col" className="px-5 py-3.5 text-left font-body text-label-md uppercase tracking-wider w-20">
                  No.
                </th>
                <th scope="col" className="px-5 py-3.5 text-left font-body text-label-md uppercase tracking-wider">
                  Name / Description
                </th>
                <th scope="col" className="px-5 py-3.5 text-left font-body text-label-md uppercase tracking-wider">
                  Make
                </th>
                <th scope="col" className="px-5 py-3.5 text-right font-body text-label-md uppercase tracking-wider w-28">
                  Qty.
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) =>
                item.isCategory ? (
                  <tr key={item.no} className="bg-teal/5 border-t border-hairline">
                    <td className="px-5 py-3 font-display font-bold text-teal text-body-md">
                      {item.no}
                    </td>
                    <td colSpan={3} className="px-5 py-3 font-display font-bold text-teal text-body-md uppercase tracking-wide">
                      {item.name}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={item.no}
                    className={`border-t border-hairline transition-colors hover:bg-surface ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-surface/40'
                    }`}
                  >
                    <td className="px-5 py-3 font-body text-body-md text-body pl-9">{item.no}</td>
                    <td className="px-5 py-3 font-body text-body-md text-ink">{item.name}</td>
                    <td className="px-5 py-3 font-body text-body-md text-body">{item.make}</td>
                    <td className="px-5 py-3 font-body text-body-md text-ink text-right font-semibold">
                      {item.quantity}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-2">
        {filtered.map((item) =>
          item.isCategory ? (
            <div key={item.no} className="bg-teal/10 rounded-card px-4 py-3">
              <span className="font-display font-bold text-teal text-body-md uppercase tracking-wide">
                {item.no}. {item.name}
              </span>
            </div>
          ) : (
            <div
              key={item.no}
              className="bg-white border border-hairline rounded-card p-4 shadow-card"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="font-display font-bold text-ink text-body-md">{item.name}</span>
                <span className="shrink-0 bg-teal text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                  Qty: {item.quantity}
                </span>
              </div>
              <div className="flex gap-4 font-body text-body-md text-body">
                <span>
                  <span className="font-semibold text-ink">No:</span> {item.no}
                </span>
                {item.make && (
                  <span>
                    <span className="font-semibold text-ink">Make:</span> {item.make}
                  </span>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-body font-body text-body-md">
          No items found for &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  )
}
