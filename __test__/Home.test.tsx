import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('Testing home page', () => {
  beforeEach(() => {
    render(<HomePage />)
  })

  it('renders Meet the Cats button linking to Cat page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /meet the cats/i })
    expect(link).toHaveAttribute('href', '/find-your-cat')
  })

  it('renders Meet the Dogs button linking to Dog page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /meet the dogs/i })
    expect(link).toHaveAttribute('href', '/find-your-dog')
  })

  it('renders Submit button in CTA section linking to Submit Pet page', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /^submit your pet$/i })
    expect(link).toHaveAttribute('href', '/submit-your-pet')
  })

  it('renders Click Here button linking to SociaBuzz site', async () => {
    const link = await screen.findByRole<HTMLAnchorElement>('link', { name: /click here/i })
    expect(link).toHaveAttribute('href', 'https://sociabuzz.com/zainolamzar/donate')
  })
})
