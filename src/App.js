import React, { useState, useEffect } from "react"
import "./App.css"
import { TodoWrapper } from "./components/TodoWrapper"
import { CustomHeader } from "./CustomHeader"
import { CustomFooter } from "./CustomFooter"

function App() {
  return (
    <div className="App">
      <CustomHeader/>
    <TodoWrapper />
    <CustomFooter/>
    </div>
  )
}

export default App