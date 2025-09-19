import { render, screen } from '@testing-library/react'
import NavBar from '@/components/ui/NavBar'

describe('Testing navigation bar', () => {
  beforeEach(() => {
    render(<NavBar />)
  })

  it('renders Cat button linking to Cat page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /find your cat/i })
    expect(link).toHaveAttribute('href', '/find-your-cat')
  })

  it('renders Dog button linking to Dog page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /find your dog/i })
    expect(link).toHaveAttribute('href', '/find-your-dog')
  })

  it('renders Submit button linking to Submit Pet page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /submit a pet/i })
    expect(link).toHaveAttribute('href', '/submit-your-pet')
  })
})
