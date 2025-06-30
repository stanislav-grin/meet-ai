import { ReactNode, useState } from 'react'

import { ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  CommandItem,
  CommandList,
  CommandInput,
  CommandResponsiveDialog,
  CommandEmpty,
} from '@/components/ui/command'

interface Props {
  options: Array<{
    id: string
    value: string
    children: ReactNode
  }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeholder?: string
  isSearchable?: boolean
  isLoading?: boolean
  className?: string
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = 'Select an option',
  isSearchable = true,
  isLoading,
  className,
}: Props) => {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn('h-9 justify-between font-normal px-2', !selectedOption && 'text-muted-foreground', className)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>

      <CommandResponsiveDialog open={open} onOpenChange={setOpen} shouldFilter={!onSearch}>
        { isSearchable && <CommandInput placeholder="Search" onValueChange={onSearch} /> }

        <CommandList>
          { isLoading && (
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">Loading...</span>
            </CommandEmpty>
          )}

          { !isLoading && (
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">No options found</span>
            </CommandEmpty>
          )}

          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value)
                setOpen(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}
