import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('Testing navigation links in Home page', () => {
  beforeEach(async () => {
    render(<HomePage />)
  })

  it('renders Cat button linking to Cat page', async () => {
    const link = await screen.findByRole('link', { name: /find your cat/i })
    expect(link).toHaveAttribute('href', '/find-your-cat')
  })

  it('renders Dog button linking to Dog page', async () => {
    const link = await screen.findByRole('link', { name: /find your dog/i })
    expect(link).toHaveAttribute('href', '/find-your-dog')
  })

  it('renders Submit button linking to Submit Pet page', async () => {
    const link = await screen.findByRole('link', { name: /submit a pet/i })
    expect(link).toHaveAttribute('href', '/submit-your-pet')
  })

  it('renders Meet the Cats button linking to Cat page', async () => {
    const link = await screen.findByRole('link', { name: /meet the cats/i })
    expect(link).toHaveAttribute('href', '/find-your-cat')
  })

  it('renders Meet the Dogs button linking to Dog page', async () => {
    const link = await screen.findByRole('link', { name: /meet the dogs/i })
    expect(link).toHaveAttribute('href', '/find-your-dog')
  })

  it('renders Submit button in CTA section linking to Submit Pet page', async () => {
    const link = await screen.findByRole('link', { name: /^submit your pet$/i })
    expect(link).toHaveAttribute('href', '/submit-your-pet')
  })

  it('renders Click Here button linking to SociaBuzz site', async () => {
    const link = await screen.findByRole('link', { name: /click here/i })
    expect(link).toHaveAttribute('href', 'https://sociabuzz.com/zainolamzar/donate')
  })
})
