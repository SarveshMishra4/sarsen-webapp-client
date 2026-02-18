'use client'

import React, { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  // FIX: Add null initial value
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        })
        setIsVisible(true)
      }
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      pointerEvents: 'none'
    }

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: window.innerHeight - coords.top + 8,
          left: coords.left + (triggerRef.current?.offsetWidth || 0) / 2,
          transform: 'translateX(-50%)'
        }
      case 'bottom':
        return {
          ...baseStyles,
          top: coords.top + (triggerRef.current?.offsetHeight || 0) + 8,
          left: coords.left + (triggerRef.current?.offsetWidth || 0) / 2,
          transform: 'translateX(-50%)'
        }
      case 'left':
        return {
          ...baseStyles,
          top: coords.top + (triggerRef.current?.offsetHeight || 0) / 2,
          right: window.innerWidth - coords.left + 8,
          transform: 'translateY(-50%)'
        }
      case 'right':
        return {
          ...baseStyles,
          top: coords.top + (triggerRef.current?.offsetHeight || 0) / 2,
          left: coords.left + (triggerRef.current?.offsetWidth || 0) + 8,
          transform: 'translateY(-50%)'
        }
      default:
        return baseStyles
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={getTooltipStyles()}
          className={`
            absolute bg-gray-900 text-white text-sm rounded px-2 py-1
            whitespace-nowrap z-50 pointer-events-none
            animate-in fade-in duration-200
          `}
        >
          {content}
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 transform rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
    </>
  )
}