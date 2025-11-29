'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, Row } from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CenterUnderline from '@/components/fancy/text/underline-center'
import { motion } from 'motion/react'
import { GripVertical } from 'lucide-react'
import { db } from '@/libs/instantdb'

export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  align?: 'left' | 'center' | 'right'
  highlight?: boolean
}

interface SortableDataTableProps<TData extends { id: string }> {
  columns: ExtendedColumnDef<TData, unknown>[]
  data: TData[]
  onReorder: (items: TData[]) => void
}

// Drag handle cell component
export function DragHandleCell() {
  return (
    <div className="flex items-center justify-center">
      <GripVertical className="text-muted-foreground h-4 w-4 cursor-grab active:cursor-grabbing" />
    </div>
  )
}

// Create drag handle column definition
export function createDragHandleColumn<TData>(): ExtendedColumnDef<TData, unknown> {
  return {
    id: 'drag-handle',
    header: '',
    cell: () => (
      <db.SignedIn>
        <DragHandleCell />
      </db.SignedIn>
    ),
    size: 24,
    align: 'left',
    highlight: false,
  }
}

// Draggable row component
function DraggableRow<TData extends { id: string }, TValue>({
  row,
  columns,
}: {
  row: Row<TData>
  columns: ExtendedColumnDef<TData, TValue>[]
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && 'selected'}
      className="group border-b last:border-b"
    >
      {row.getVisibleCells().map(cell => {
        const columnSize = cell.column.columnDef.size
        const width = typeof columnSize === 'number' ? `${columnSize}px` : columnSize || 'auto'
        const align = (cell.column.columnDef as ExtendedColumnDef<TData, TValue>).align || 'left'
        const alignClass =
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
        const highlight =
          (cell.column.columnDef as ExtendedColumnDef<TData, TValue>).highlight !== false
        const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

        // Add drag listeners to the drag handle column
        const isDragHandle = cell.column.id === 'drag-handle'

        return (
          <TableCell
            key={cell.id}
            style={{ width }}
            className={`wrap-break-words whitespace-normal ${alignClass}`}
            {...(isDragHandle ? { ...attributes, ...listeners } : {})}
          >
            {highlight ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <CenterUnderline underlineHeightRatio={0.15} underlinePaddingRatio={0.15}>
                  {cellContent}
                </CenterUnderline>
              </motion.div>
            ) : (
              cellContent
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export function SortableDataTable<TData extends { id: string }>({
  columns,
  data,
  onReorder,
}: SortableDataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowId: row => row.id,
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const dataIds = useMemo(() => data.map(item => item.id), [data])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex(item => item.id === active.id)
      const newIndex = data.findIndex(item => item.id === over.id)
      const reorderedData = arrayMove(data, oldIndex, newIndex)
      onReorder(reorderedData)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="bg-table overflow-x-auto rounded-lg shadow-none">
        <Table className="table-fixed">
          <TableHeader className="bg-sidebar">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const columnSize = header.column.columnDef.size
                  const width =
                    typeof columnSize === 'number' ? `${columnSize}px` : columnSize || 'auto'
                  const align =
                    (header.column.columnDef as ExtendedColumnDef<TData, unknown>).align || 'left'
                  const alignClass =
                    align === 'center'
                      ? 'text-center'
                      : align === 'right'
                        ? 'text-right'
                        : 'text-left'
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width }}
                      className={`wrap-break-words top-0 ${alignClass}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map(row => (
                    <DraggableRow
                      key={row.id}
                      row={row}
                      columns={columns as ExtendedColumnDef<TData, unknown>[]}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </SortableContext>
          </TableBody>
        </Table>
      </div>
    </DndContext>
  )
}
