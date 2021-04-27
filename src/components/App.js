import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = (e) => {
    let newPet = e.target.value
    this.setState({
      filters: {
        type: newPet 
      }
    })
  }


  handleFind = () => {
    // console.log(this.state.filters.type)
    // let petType = this.state.filters.type
    if (this.state.filters.type === 'all') {
       fetch('/api/pets')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          ...this.state.filters,
          pets: data
        })
      })
    } else if (this.state.filters.type === 'dog') {
        fetch('/api/pets?type=dog')
        .then(res => res.json())
        .then(data =>
          this.setState({
            ...this.state.filters,
          pets: data
          })
        )
    } else if (this.state.filters.type === 'cat') {
        fetch('/api/pets?type=cat')
        .then(res => res.json())
        .then (data =>
          this.setState({
            ...this.state.filters,
            pets: data
          })
        )
    } else {
      fetch('/api/pets?type=micropig')
      .then(res => res.json())
      .then(data => {
        console.log(this.state)
        this.setState({
          ...this.state.filters,
          pets: data
        })
      })
    }
  
  }


  adoptPet = (id) => {
    this.state.pets.find(pet => pet === id)
      //
    }
  


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleFind} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
