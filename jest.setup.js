/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom'

// Mock Next.js <Image />
jest.mock('next/image', () => {
  return function Image(props) {
    return <img {...props} />
  }
})

// Mock next/dynamic (unwraps .default if needed)
jest.mock('next/dynamic', () => {
  return (dynamicImport, options) => {
    if (typeof dynamicImport === 'function') {
      const mod = dynamicImport()
      // If it's a promise (from import()), unwrap synchronously
      if (mod.then) {
        return () => null // fallback dummy component
      }
      return mod.default || mod
    }

    if (dynamicImport && typeof dynamicImport.loader === 'function') {
      const mod = dynamicImport.loader()
      if (mod.then) {
        return () => null
      }
      return mod.default || mod
    }

    return () => null
  }
})

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback, options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})
