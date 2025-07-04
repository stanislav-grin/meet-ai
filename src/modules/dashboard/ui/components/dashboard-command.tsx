'use client'

import { Dispatch, SetStateAction } from 'react'

import { CommandResponsiveDialog, CommandInput, CommandList, CommandItem } from '@/components/ui/command'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting agent" />

      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  )
}
