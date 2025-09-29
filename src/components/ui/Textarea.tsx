import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  autoResize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  success,
  helper,
  required = false,
  leftIcon,
  variant = 'default',
  size = 'md',
  animated = true,
  autoResize = false,
  maxLength,
  showCharCount = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(props.value || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    if (autoResize) {
      resizeTextarea();
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (autoResize) {
      resizeTextarea();
    }
  }, [internalValue, autoResize]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-5 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'w-full bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 resize-none';
    
    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-white/10 border-transparent focus:bg-white/15 focus:border-green-500`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-white/20 focus:border-green-500`;
      default:
        return `${baseClasses} border-white/10 focus:border-green-500 focus:ring-2 focus:ring-green-500/20`;
    }
  };

  const getStateClasses = () => {
    if (error) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    }
    if (success) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500/20';
    }
    return '';
  };

  const containerClasses = `relative ${className}`;

  const textareaClasses = `
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${getStateClasses()}
    ${leftIcon ? 'pl-12' : ''}
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${autoResize ? 'overflow-hidden' : ''}
  `;

  const labelClasses = `
    block text-sm font-medium mb-2
    ${error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-400'}
    ${required ? 'after:content-["*"] after:ml-1 after:text-red-400' : ''}
  `;

  const charCount = typeof internalValue === 'string' ? internalValue.length : 0;
  const isOverLimit = maxLength && charCount > maxLength;

  return (
    <div className={containerClasses}>
      {label && (
        <motion.label
          htmlFor={textareaId}
          className={labelClasses}
          initial={animated ? { opacity: 0, y: -10 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-4 text-gray-400 z-10">
            {leftIcon}
          </div>
        )}

        {/* Textarea Field */}
        <motion.textarea
          ref={textareaRef}
          id={textareaId}
          rows={rows}
          className={textareaClasses}
          value={internalValue}
          onChange={handleInputChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          maxLength={maxLength}
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.3, delay: 0.1 }}
          {...Object.fromEntries(
            Object.entries(props).filter(([key]) => 
              !['leftIcon', 'label', 'error', 'success', 'helper', 'required', 'variant', 'size', 'animated', 'autoResize', 'maxLength', 'showCharCount', 'className'].includes(key)
            )
          )}
        />

        {/* Character Count */}
        {showCharCount && maxLength && (
          <motion.div
            className={`absolute bottom-2 right-2 text-xs ${
              isOverLimit ? 'text-red-400' : 'text-gray-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {charCount}/{maxLength}
          </motion.div>
        )}

        {/* Status Icon */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Focus Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none"
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Helper Text */}
      <AnimatePresence>
        {(error || success || helper) && (
          <motion.div
            className="mt-2 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error && (
              <span className="text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </span>
            )}
            {success && (
              <span className="text-green-400 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>{success}</span>
              </span>
            )}
            {helper && !error && !success && (
              <span className="text-gray-400">{helper}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Textarea;