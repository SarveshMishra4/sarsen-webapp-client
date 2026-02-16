export const validators = {
  email: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email) ? null : 'Invalid email address'
  },

  password: (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return null
  },

  required: (value: any, fieldName: string) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`
    }
    return null
  },
}