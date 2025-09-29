import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  helper,
  required = false,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  animated = true,
  className = '',
  type = 'text',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(props.value || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

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
    const baseClasses = 'w-full bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-300';
    
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

  const inputClasses = `
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${getStateClasses()}
    ${leftIcon ? 'pl-12' : ''}
    ${rightIcon || isPassword ? 'pr-12' : ''}
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const labelClasses = `
    block text-sm font-medium mb-2
    ${error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-400'}
    ${required ? 'after:content-["*"] after:ml-1 after:text-red-400' : ''}
  `;

  return (
    <div className={containerClasses}>
      {label && (
        <motion.label
          htmlFor={inputId}
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
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={inputRef}
          id={inputId}
          type={inputType}
          className={inputClasses}
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
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.3, delay: 0.1 }}
          {...Object.fromEntries(
            Object.entries(props).filter(([key]) => 
              !['leftIcon', 'rightIcon', 'label', 'error', 'success', 'helper', 'required', 'variant', 'size', 'animated', 'className'].includes(key)
            )
          )}
        />

        {/* Right Icon or Password Toggle */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-300 transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          ) : (
            rightIcon && (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )
          )}
        </div>

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

        {/* Status Icon */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              className="absolute right-12 top-1/2 transform -translate-y-1/2"
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

export default Input;