/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js <Image />
jest.mock('next/image', () => {
  return function MockedImage(props: any) {
    return React.createElement('img', props)
  }
})

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return (dynamicImport: any, options: any) => {
    if (typeof dynamicImport === 'function') {
      const mod = dynamicImport()
      if (mod && typeof (mod as Promise<any>).then === 'function') {
        return () => null
      }
      return (mod as any).default || mod
    }

    if (dynamicImport && typeof dynamicImport.loader === 'function') {
      const mod = dynamicImport.loader()
      if (mod && typeof (mod as Promise<any>).then === 'function') {
        return () => null
      }
      return (mod as any).default || mod
    }

    return () => null
  }
})

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})
