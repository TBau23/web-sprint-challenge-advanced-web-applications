import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import ColorList from "./ColorList"
import { fetchColors } from '../api/fetchColors'

jest.mock('../api/fetchColors')

const mockData = [
  {
    color: 'aliceblue',
    code : {
      hex: '#f0f8ff'
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4"
    },
    id: 4
  }
] 

test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  

  fetchColors.mockResolvedValueOnce(mockData)
  render(<BubblePage />)
  render(<ColorList colors={mockData}/>)

  await waitFor(() => screen.getAllByTestId('test'))

  expect(screen.getAllByTestId('test')).toHaveLength(4)



});
