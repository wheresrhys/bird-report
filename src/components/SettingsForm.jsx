import React, { useContext} from 'react'
import {Form} from 'react-bootstrap'
import cloneDeep from 'lodash.clonedeep'
import {useLocalStorage} from '../lib/useLocalStorage'

import {UNKNOWN,
 VAGRANT,
 HIGHLY_LOCALISED,
 LOCALISED,
 WIDESPREAD} from '../constants'

const WINTER = 'winter'
const SPRING = 'springPassage'
const BREEDING = 'breeding'
const AUTUMN = 'autumnPassage'

const Dropdown = ({value, species, season, setDistribution, distribution}) => {

  const updateSpecies = (event) => {
    const value = Number(event.target.value)
    if (isNaN(value)) {
      const clone = {...distribution}
      delete clone[season]
      setDistribution(clone)
    } else {
      setDistribution({...distribution, [season]: value})
    }

  }

  return (
    <Form.Control as="select" value={value} onChange={updateSpecies}>
      <option value={null}>Please select</option>
      <option value={UNKNOWN}>UNKNOWN</option>
      <option value={VAGRANT}>VAGRANT</option>
      <option value={HIGHLY_LOCALISED}>HIGHLY_LOCALISED</option>
      <option value={LOCALISED}>LOCALISED</option>
      <option value={WIDESPREAD}>WIDESPREAD</option>
    </Form.Control>
)
 }

export const SettingsForm = ({species, distribution, setDistribution}) => {

  const {winter, springPassage, breeding, autumnPassage} = distribution

  return (
    <Form.Group>
      <h2>{species}</h2>
      <Form.Label>Winter</Form.Label>
      <Dropdown value={winter} species={species} setDistribution={setDistribution} distribution={distribution} season="winter" />
      <Form.Label>Spring passage</Form.Label>
      <Dropdown value={springPassage} species={species} setDistribution={setDistribution} distribution={distribution} season="springPassage" />
      <Form.Label>Breeding</Form.Label>
      <Dropdown value={breeding} species={species} setDistribution={setDistribution} distribution={distribution} season="breeding" />
      <Form.Label>Autumn passage</Form.Label>
      <Dropdown value={autumnPassage} species={species} setDistribution={setDistribution} distribution={distribution} season="autumnPassage" />
    </Form.Group>
)
}




