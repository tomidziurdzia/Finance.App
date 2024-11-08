"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";

interface ModalProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onHide: () => void;
  someRef: React.RefObject<HTMLElement>;
}

export default function Modal({
  show,
  title,
  children,
  onHide,
  someRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && someRef.current) {
      someRef.current.focus();
    }
  }, [show, someRef]);

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent ref={dialogRef}>
        <div className="relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg sm:w-auto">
          <DialogHeader className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-primary">
              {title}
            </DialogTitle>
            <button
              onClick={onHide}
              className="rounded-full p-1 text-primary transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
