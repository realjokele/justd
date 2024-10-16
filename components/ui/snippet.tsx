'use client'

import * as React from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconDuplicate } from 'justd-icons'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { Button, type ButtonProps } from './button'
import { cn } from './primitive'

const snippetVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

const Snippet: React.FC<SnippetProps> = ({ className, text, ...props }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset the copied state after 2 seconds
    } else {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div
      {...props}
      className={twMerge(
        'relative flex items-center justify-between rounded-lg border bg-[#0e0e10] text-white py-2.5 pl-3 pr-2.5 font-mono text-sm [&>svg:hover]:text-white [&>svg]:text-muted-fg [&>svg]:transition [&_svg]:shrink-0',
        className
      )}
    >
      <span className="mr-6">{text}</span>
      <Button
        className="size-7 bx backdrop-blur-lg text-white bg-zinc-800 border hover:bg-zinc-700 border-zinc-700"
        aria-label="Copy imports statement"
        size="square-petite"
        appearance="outline"
        onPress={handleCopy}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="checkmark"
              variants={snippetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <IconCheck />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={snippetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <IconDuplicate />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

interface CopyButtonProps extends ButtonProps {
  isCopied?: boolean
  ariaLabel?: string
  initialIcon?: React.ReactNode
  copiedIcon?: React.ReactNode
  className?: string
}

const CopyButton = ({
  initialIcon,
  copiedIcon,
  ariaLabel = 'Copy',
  isCopied,
  className,
  ...props
}: CopyButtonProps) => {
  return (
    <Button
      className={cn(
        'size-7 backdrop-blur-lg rounded-md text-white bg-zinc-800 border hover:bg-zinc-700 border-zinc-700',
        className
      )}
      aria-label={ariaLabel}
      size="square-petite"
      appearance="outline"
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.span
            key="checkmark-import"
            variants={snippetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {copiedIcon ?? <IconCheck />}
          </motion.span>
        ) : (
          <motion.span
            key="copy-import"
            variants={snippetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {initialIcon ?? <IconDuplicate />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

export { CopyButton, Snippet, snippetVariants, type SnippetProps }
