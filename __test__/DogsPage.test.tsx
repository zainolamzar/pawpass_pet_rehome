/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DogsPage from "@/app/find-your-dog/page"
import React from "react"

// Mock next/link → render children directly
jest.mock("next/link", () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>
})

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/find-your-dog",
}))

describe("Testing the Dogs page", () => {
  const mockDogs = [
    {
      _id: "1",
      slug: "poodle-dog",
      breed: "Poodle",
      location: "Ampang, Selangor",
      gender: "male",
      description: "A fluffy Poodle dog",
      age: "2",
      phone_number: "0123456789",
      owner_name: "Alice",
      animal: "cat",
      isActive: true,
      isApproved: true,
      isVaccinated: true,
      isNeutered: false,
      images: ["/dog1.jpg"],
    },
  ]

  beforeEach(() => {
    jest.resetAllMocks()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: mockDogs }),
      } as Response)
    ) as jest.Mock
  })

  it("navigates to dog detail page when card clicked", async () => {
    render(<DogsPage />)

    // Wait for cats to load
    const card = await screen.findByRole("link", { name: /poodle/i })
    expect(card).toHaveAttribute("href", "/find-your-dog/poodle-dog")
  })

  it("shows empty state when no dogs match filter in dekstop", async () => {
        render(<DogsPage />)

        // Wait for cats to render
        await screen.findByRole("heading", { name: /poodle/i })

        // Apply a filter that doesn't match (female)
        const genderSelects = screen.getAllByTestId("gender")
        const genderSelect = genderSelects[0] // desktop form
        await userEvent.selectOptions(genderSelect, "female")

        await waitFor(() => {
            expect(
            screen.getByText(/Woof woof! No doggos here yet/i)
            ).toBeInTheDocument()
        })
    })

    it("shows empty state when no dogs match filter in mobile", async () => {
        render(<DogsPage />)

        // Wait for cats to render
        await screen.findByRole("heading", { name: /poodle/i })

        // Apply a filter that doesn't match (female)
        const genderSelects = screen.getAllByTestId("gender")
        const genderSelect = genderSelects[1] // desktop form
        await userEvent.selectOptions(genderSelect, "female")

        await waitFor(() => {
            expect(
            screen.getByText(/Woof woof! No doggos here yet/i)
            ).toBeInTheDocument()
        })
    })
})
