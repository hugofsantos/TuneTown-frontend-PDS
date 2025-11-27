"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    isOpen: boolean;
  }
>(({ isOpen, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={` ${
      isOpen ? `animate-in fade-in-0` : `animate-out fade-out-0`
    } fixed inset-0 z-50 bg-[#292929] opacity-50`}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {
  isOpen: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ isOpen, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay isOpen={isOpen} />
    <SheetPrimitive.Content
      ref={ref}
      className={`fixed z-50 gap-4 rounded-sm bg-fume p-6 text-contrast border border-stroke shadow-lg transition ease-in-out 
        
        ${
          isOpen
            ? `duration-500 inset-y-0 animate-slide-in-from-right`
            : `duration-300 animate-slide-out-to-right`
        }
        right-0 top-0 h-full w-[50rem] border-l  sm:max-w-md `}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        className="absolute right-4 top-4 
      rounded-sm opacity-70 ring-offset-background transition-opacity 
      hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring
       focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        x<span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex flex-col space-y-2 text-center sm:text-left"
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className="text-lg font-semibold text-foreground"
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className="text-sm text-muted-foreground"
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
