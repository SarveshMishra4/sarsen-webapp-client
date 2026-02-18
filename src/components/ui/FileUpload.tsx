'use client'

import React, { useRef, useState } from 'react'
import { Button } from './Button'

interface FileUploadProps {
  label?: string
  error?: string
  helpText?: string
  onChange?: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  helpText,
  onChange,
  accept = '*',
  maxSize = 10,
  className = ''
}) => {
  const [fileName, setFileName] = useState<string>('')
  const [fileError, setFileError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setFileError(`File size must be less than ${maxSize}MB`)
      return
    }

    setFileError('')
    setFileName(file.name)
    onChange?.(file)
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          size="sm"
        >
          Choose File
        </Button>
        {fileName && (
          <span className="text-sm text-gray-600 truncate flex-1">
            {fileName}
          </span>
        )}
      </div>

      {(helpText || fileError || error) && (
        <p className={`mt-1 text-sm ${fileError || error ? 'text-red-600' : 'text-gray-500'}`}>
          {fileError || error || helpText}
        </p>
      )}
    </div>
  )
}