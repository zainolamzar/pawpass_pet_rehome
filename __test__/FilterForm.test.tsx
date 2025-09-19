import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FilterForm from "@/components/FilterForm"
import React, { useState } from "react"

describe("Testing filter form", () => {
  const breeds = ["Persian", "Siamese"]
  const states = ["Selangor", "Johor"]
  const regions = ["Ampang", "Johor Bahru"]

  function Wrapper(props: { onClose?: () => void }) {
    const [filters, setFilters] = useState({
      gender: "",
      breed: "",
      state: "",
      region: "",
      isVaccinated: "",
      isNeutered: "",
    })
    return (
      <FilterForm
        filters={filters}
        setFilters={setFilters}
        breeds={breeds}
        states={states}
        regions={regions}
        onClose={props.onClose}
      />
    )
  }

  it("renders all filter dropdowns", () => {
    render(<Wrapper />)

    expect(screen.getByTestId("gender")).toBeInTheDocument()
    expect(screen.getByTestId("breed")).toBeInTheDocument()
    expect(screen.getByTestId("state")).toBeInTheDocument()
    expect(screen.getByTestId("region")).toBeInTheDocument()
    expect(screen.getByTestId("vaccinated")).toBeInTheDocument()
    expect(screen.getByTestId("neutered")).toBeInTheDocument()
  })

  it("updates gender when changed", async () => {
    const user = userEvent.setup()
    render(<Wrapper />)

    const genderSelect = screen.getByTestId("gender")
    expect((genderSelect as HTMLSelectElement).value).toBe("")

    await user.selectOptions(genderSelect, "male")
    expect((genderSelect as HTMLSelectElement).value).toBe("male")
  })

  it("updates breed, state, region, vaccinated, and neutered when changed", async () => {
    const user = userEvent.setup()
    render(<Wrapper />)

    const breedSelect = screen.getByTestId("breed")
    const stateSelect = screen.getByTestId("state")
    const regionSelect = screen.getByTestId("region")
    const vaccinatedSelect = screen.getByTestId("vaccinated")
    const neuteredSelect = screen.getByTestId("neutered")

    await user.selectOptions(breedSelect, "Persian")
    await user.selectOptions(stateSelect, "Johor")
    await user.selectOptions(regionSelect, "Ampang")
    await user.selectOptions(vaccinatedSelect, "true")
    await user.selectOptions(neuteredSelect, "false")

    expect((breedSelect as HTMLSelectElement).value).toBe("Persian")
    expect((stateSelect as HTMLSelectElement).value).toBe("Johor")
    expect((regionSelect as HTMLSelectElement).value).toBe("Ampang")
    expect((vaccinatedSelect as HTMLSelectElement).value).toBe("true")
    expect((neuteredSelect as HTMLSelectElement).value).toBe("false")
  })

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup()
    const mockOnClose = jest.fn()

    render(<Wrapper onClose={mockOnClose} />)

    const closeBtn = screen.getByRole("button", { name: /close filters/i })
    await user.click(closeBtn)

    expect(mockOnClose).toHaveBeenCalled()
  })
})
