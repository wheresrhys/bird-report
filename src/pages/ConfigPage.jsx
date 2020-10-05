import React, { useContext} from 'react'
import {Form} from 'react-bootstrap'
import cloneDeep from 'lodash.clonedeep'
import { Species } from '../lib/Context'

import {UNKNOWN,
 VAGRANT,
 HIGHLY_LOCALISED,
 LOCALISED,
 WIDESPREAD} from '../constants'

const WINTER = 'winter'
const SPRING = 'springPassage'
const BREEDING = 'breeding'
const AUTUMN = 'autumnPassage'

const Dropdown = ({value, species, season}) => {
  const [speciesConfigs, setSpecies] = useContext(Species)

  const updateSpecies = (event) => {
    const clone = cloneDeep(speciesConfigs)
    clone[species][season] = Number(event.target.value)
    setSpecies(clone)
  }

  return (
    <Form.Control as="select" value={value} onChange={updateSpecies}>
      <option value={UNKNOWN}>UNKNOWN</option>
      <option value={VAGRANT}>VAGRANT</option>
      <option value={HIGHLY_LOCALISED}>HIGHLY_LOCALISED</option>
      <option value={LOCALISED}>LOCALISED</option>
      <option value={WIDESPREAD}>WIDESPREAD</option>
    </Form.Control>
)
 }

const SettingsForm = ({species, winter, springPassage, breeding, autumnPassage}) => {
  return (
    <Form.Group>
      <h2>{species}</h2>
      <Form.Label>Winter</Form.Label>
      <Dropdown value={winter} species={species} season="winter" />
      <Form.Label>Spring passage</Form.Label>
      <Dropdown value={springPassage} species={species} season="springPassage" />
      <Form.Label>Breeding</Form.Label>
      <Dropdown value={breeding} species={species} season="breeding" />
      <Form.Label>Autumn passage</Form.Label>
      <Dropdown value={autumnPassage} species={species} season="autumnPassage" />
    </Form.Group>
)
}



export const ConfigPage = () => {

  const [speciesConfigs] = useContext(Species)


  return (
    <Form>
      {

    Object.entries(speciesConfigs).map(([species, config]) => <SettingsForm species={species} {...config} />)
  }
    </Form>
)
}

