export interface User {
  _id?: string
  email: string
  name: string
  password?: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
  emailVerified?: Date
  image?: string
}

export interface AuthSession {
  user: {
    id: string
    email: string
    name: string
    role: 'user' | 'admin'
    image?: string
  }
  expires: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}