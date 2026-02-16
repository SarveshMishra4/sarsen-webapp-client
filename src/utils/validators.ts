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
  phone: (phone: string) => {
    if (!phone) return null // optional
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
    return phoneRegex.test(phone) ? null : 'Invalid phone number format'
  },
  
  contactMessage: (message: string) => {
    if (!message) return 'Message is required'
    if (message.length < 10) return 'Message must be at least 10 characters'
    if (message.length > 2000) return 'Message must be less than 2000 characters'
    return null
  },
  
  newsletterEmail: (email: string) => {
    if (!email) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return null
  },
  
  name: (name: string) => {
    if (!name) return 'Name is required'
    if (name.length < 2) return 'Name must be at least 2 characters'
    if (name.length > 100) return 'Name must be less than 100 characters'
    return null
  },
  
  company: (company: string) => {
    if (!company) return null // optional
    if (company.length > 100) return 'Company name must be less than 100 characters'
    return null
  }
}

