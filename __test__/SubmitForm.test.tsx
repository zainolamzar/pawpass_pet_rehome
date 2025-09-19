/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RehomeForm from "@/components/RehomeForm"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock child components (BreedSelect, StateSelect, RegionSelect)
jest.mock("@/components/BreedSelect", () => ({
  BreedSelect: ({ breed, setBreed }: any) => (
    <select
      data-testid="breed"
      value={breed}
      onChange={(e) => setBreed(e.target.value)}
    >
      <option value="">Select Breed</option>
      <option value="Persian">Persian</option>
      <option value="Golden Retriever">Golden Retriever</option>
    </select>
  ),
}))
jest.mock("@/components/StateSelect", () => (props: any) => (
  <select
    data-testid="state"
    value={props.state}
    onChange={(e) => props.setState(e.target.value)}
  >
    {props.states.map((s: string) => (
      <option key={s} value={s}>
        {s}
      </option>
    ))}
  </select>
))
jest.mock("@/components/RegionSelect", () => (props: any) => (
  <select
    data-testid="region"
    value={props.region}
    onChange={(e) => props.setRegion(e.target.value)}
  >
    <option value="">Choose region</option>
    <option value="Ampang">Ampang</option>
    <option value="PJ">Petaling Jaya</option>
  </select>
))

describe("Testing the Submit Pet form", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.URL.createObjectURL = jest.fn(() => "preview-url")
    global.URL.revokeObjectURL = jest.fn()
  })

  it("completes the form and submits a cat", async () => {
    render(<RehomeForm />)
    const user = userEvent.setup()

    // Step 1: Pet info
    await user.click(screen.getByRole("button", { name: /Cat/i }))
    await user.selectOptions(screen.getByTestId("breed"), "Persian")
    const genderSelects = screen.getAllByTestId("gender")
        const genderSelect = genderSelects[0] // desktop form
        await userEvent.selectOptions(genderSelect, "female")
    await user.type(screen.getByPlaceholderText(/e\.g\., 2/i), "3")
    await user.selectOptions(screen.getByTestId("neutered"), "yes")
    await user.selectOptions(screen.getByTestId("vaccinated"), "yes")
    await user.type(screen.getByTestId("description"), "Playful and cuddly")

    await user.click(screen.getByRole("button", { name: /Next/i }))

    // Step 2: Owner info
    await user.type(screen.getByTestId("name"), "Alice")
    await user.type(screen.getByTestId("number"), "0123456789")
    await user.selectOptions(screen.getByTestId("state"), "Selangor")
    await user.selectOptions(screen.getByTestId("region"), "Ampang")

    await user.click(screen.getByRole("button", { name: /Next/i }))

    // Step 3: Upload photo
    const file = new File(["hello"], "cat.png", { type: "image/png" })
    const fileInput = screen.getByTestId("pet-images")
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Preview image should show
    expect(await screen.findByAltText(/preview/i)).toBeInTheDocument()

    // Submit
    await user.click(screen.getByRole("button", { name: /Submit Your Pet/i }))

    // Wait for submit attempt
    await waitFor(() => {
      expect(global.URL.createObjectURL).toHaveBeenCalled()
    })
  })
})
