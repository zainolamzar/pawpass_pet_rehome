/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatsPage from "@/app/find-your-cat/page"
import React from "react"

// Mock next/link → render children directly
jest.mock("next/link", () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>
})

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/find-your-cat",
}))

describe("Testing the Cats page", () => {
  const mockCats = [
    {
      _id: "1",
      slug: "persian-cat",
      breed: "Persian",
      location: "Ampang, Selangor",
      gender: "male",
      description: "A fluffy Persian cat",
      age: "2",
      phone_number: "0123456789",
      owner_name: "Alice",
      animal: "cat",
      isActive: true,
      isApproved: true,
      isVaccinated: true,
      isNeutered: false,
      images: ["/cat1.jpg"],
    },
  ]

  beforeEach(() => {
    jest.resetAllMocks()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: mockCats }),
      } as Response)
    ) as jest.Mock
  })

  it("navigates to cat detail page when card clicked", async () => {
    render(<CatsPage />)

    // Wait for cats to load
    const card = await screen.findByRole("link", { name: /persian/i })
    expect(card).toHaveAttribute("href", "/find-your-cat/persian-cat")
  })

  it("shows empty state when no cats match filter in dekstop", async () => {
        render(<CatsPage />)

        // Wait for cats to render
        await screen.findByRole("heading", { name: /persian/i })

        // Apply a filter that doesn't match (female)
        const genderSelects = screen.getAllByTestId("gender")
        const genderSelect = genderSelects[0] // desktop form
        await userEvent.selectOptions(genderSelect, "female")

        await waitFor(() => {
            expect(
            screen.getByText(/Meow Meow! No kitty cats here yet/i)
            ).toBeInTheDocument()
        })
    })

    it("shows empty state when no cats match filter in mobile", async () => {
        render(<CatsPage />)

        // Wait for cats to render
        await screen.findByRole("heading", { name: /persian/i })

        // Apply a filter that doesn't match (female)
        const genderSelects = screen.getAllByTestId("gender")
        const genderSelect = genderSelects[1] // desktop form
        await userEvent.selectOptions(genderSelect, "female")

        await waitFor(() => {
            expect(
            screen.getByText(/Meow Meow! No kitty cats here yet/i)
            ).toBeInTheDocument()
        })
    })
})
