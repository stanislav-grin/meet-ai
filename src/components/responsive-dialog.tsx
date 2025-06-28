'use client'

import React from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerDescription, DrawerTitle, DrawerHeader, DrawerContent } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

interface ResponsiveDialogProps {
  title: string
  description: string
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ResponsiveDialog = ({ title, description, children, open, onOpenChange }: ResponsiveDialogProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
