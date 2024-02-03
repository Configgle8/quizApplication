import React from 'react'
import './output.css';
import {HeroSection} from "./src/components/HeroSection";

const App = () => {
  return (
    <div className=" bg-indigo-200">
      <h2>Hello, my name is Michael</h2>
      <HeroSection />
    </div>
  )
}

export default App