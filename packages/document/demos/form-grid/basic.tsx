import React from 'react'
import { FormGrid } from 'yuuki-design'

const { GridItem } = FormGrid

const App: React.FC = () => {
  return (
    <FormGrid>
      <GridItem>grid1</GridItem>
      <GridItem>grid2</GridItem>
      <GridItem>grid3</GridItem>
    </FormGrid>
  )
}

export default App
