'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MachineryItem } from '@/content/machinery'
import type { EquipmentItem } from '@/content/equipment'

type TableItem = MachineryItem | EquipmentItem

type Props = {
  data: TableItem[]
  caption?: string
}

type Group = {
  no: string
  name: string
  items: TableItem[]
}

export function DataTable({ data, caption }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const dropdownRef = useRef<HTMLDivElement>(null)

  /* ─ Parse into groups ─ */
  const groups = useMemo<Group[]>(() => {
    const result: Group[] = []
    let cur: Group | null = null
    data.forEach((item) => {
      if (item.isCategory) {
        cur = { no: item.no, name: item.name, items: [] }
        result.push(cur)
      } else if (cur) {
        cur.items.push(item)
      }
    })
    return result
  }, [data])

  /* ─ Category list for dropdown ─ */
  const categories = useMemo(() => groups.map((g) => ({ no: g.no, label: `${g.no}. ${g.name}` })), [groups])

  /* ─ Filter ─ */
  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase().trim()
    return groups
      .filter((g) => selectedCategory === 'all' || g.no === selectedCategory)
      .map((g) => {
        const items = q
          ? g.items.filter(
              (i) => i.name.toLowerCase().includes(q) || i.make.toLowerCase().includes(q) || i.no.includes(q),
            )
          : g.items
        return items.length === 0 && q ? null : { ...g, items }
      })
      .filter((g): g is Group => g !== null)
  }, [groups, selectedCategory, search])

  /* ─ Auto-expand groups that match a search ─ */
  useEffect(() => {
    if (search.trim()) {
      setExpandedGroups(new Set(filteredGroups.map((g) => g.no)))
    }
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─ Close dropdown on outside click ─ */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const totalItems = useMemo(() => filteredGroups.reduce((s, g) => s + g.items.length, 0), [filteredGroups])

  const toggle = (no: string) =>
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      next.has(no) ? next.delete(no) : next.add(no)
      return next
    })

  const allExpanded = filteredGroups.length > 0 && filteredGroups.every((g) => expandedGroups.has(g.no))
  const isExpanded = (no: string) => (search.trim() ? true : expandedGroups.has(no))

  return (
    <div className="space-y-4">
      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
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
            placeholder="Search by name or manufacturer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-field pl-9 py-2 text-sm w-full"
          />
        </div>

        {/* Category filter */}
        <div className="relative w-full sm:w-64" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="form-field py-2 px-3 text-sm w-full flex justify-between items-center bg-white cursor-pointer text-left"
          >
            <span className="truncate pr-2 font-medium text-ink">
              {selectedCategory === 'all'
                ? 'All Categories'
                : (categories.find((c) => c.no === selectedCategory)?.label ?? selectedCategory)}
            </span>
            <svg
              className={`w-4 h-4 text-body shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              className="absolute left-0 right-0 top-full mt-1 max-h-64 overflow-y-auto bg-white border border-hairline rounded-xl shadow-lg z-50 py-1"
              onWheel={(e) => e.stopPropagation()}
            >
              {[{ no: 'all', label: 'All Categories' }, ...categories].map(({ no, label }) => (
                <button
                  key={no}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(no)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    selectedCategory === no
                      ? 'bg-teal text-white font-semibold'
                      : 'text-ink hover:bg-teal/5 hover:text-teal'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Count + expand-all */}
        <div className="flex items-center gap-3 shrink-0">
          <p className="font-body text-sm text-body whitespace-nowrap">
            <span className="font-semibold text-ink">{totalItems}</span> item{totalItems !== 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={() =>
              allExpanded ? setExpandedGroups(new Set()) : setExpandedGroups(new Set(filteredGroups.map((g) => g.no)))
            }
            className="text-[11px] font-body font-semibold uppercase tracking-wider text-teal hover:text-teal/70 transition-colors whitespace-nowrap"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* ── Category accordions ── */}
      <div className="space-y-2">
        {filteredGroups.map((group) => {
          const open = isExpanded(group.no)
          return (
            <div key={group.no} className="border border-hairline rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Header — clickable */}
              <button
                type="button"
                onClick={() => toggle(group.no)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-teal/3 transition-colors text-left group"
                aria-expanded={open}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <motion.svg
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-teal shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </motion.svg>
                  <span className="font-body text-[10px] font-bold text-body/50 tracking-widest uppercase shrink-0">
                    {group.no}
                  </span>
                  <h3 className="font-display font-bold text-ink text-[13px] uppercase tracking-wide truncate group-hover:text-teal transition-colors">
                    {group.name}
                  </h3>
                </div>
                <span className="ml-3 shrink-0 bg-teal/10 text-teal font-body text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                </span>
              </button>

              {/* Collapsible body */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-hairline">
                      {/* Desktop table */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-surface/60">
                              <th className="px-4 py-2.5 text-left font-body text-[10px] uppercase tracking-widest text-body w-16">
                                No.
                              </th>
                              <th className="px-4 py-2.5 text-left font-body text-[10px] uppercase tracking-widest text-body">
                                Name / Description
                              </th>
                              <th className="px-4 py-2.5 text-left font-body text-[10px] uppercase tracking-widest text-body">
                                Make
                              </th>
                              <th className="px-4 py-2.5 text-right font-body text-[10px] uppercase tracking-widest text-body w-20">
                                Qty
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-hairline">
                            {group.items.map((item, idx) => (
                              <tr
                                key={item.no}
                                className={`transition-colors hover:bg-teal/3 ${idx % 2 === 0 ? 'bg-white' : 'bg-surface/20'}`}
                              >
                                <td className="px-4 py-2.5 font-body text-[11px] text-body/60">{item.no}</td>
                                <td className="px-4 py-2.5 font-body text-[13px] text-ink font-medium">{item.name}</td>
                                <td className="px-4 py-2.5 font-body text-[13px] text-body">{item.make || '—'}</td>
                                <td className="px-4 py-2.5 font-body text-[13px] text-teal font-bold text-right">
                                  {item.quantity}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile stacked */}
                      <div className="sm:hidden divide-y divide-hairline">
                        {group.items.map((item) => (
                          <div key={item.no} className="px-4 py-3 flex justify-between items-start gap-3">
                            <div>
                              <p className="font-body text-[12px] font-semibold text-ink">{item.name}</p>
                              {item.make && <p className="font-body text-[11px] text-body mt-0.5">{item.make}</p>}
                            </div>
                            <span className="shrink-0 bg-teal/10 text-teal text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                              ×{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12 bg-surface rounded-xl border border-hairline">
            <p className="font-body text-body text-sm">No items match your search.</p>
          </div>
        )}
      </div>

      {caption && <p className="sr-only">{caption}</p>}
    </div>
  )
}
