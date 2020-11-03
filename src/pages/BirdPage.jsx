import React, {useState, useEffect, useContext} from 'react'
import {
  Link,
  useParams,Redirect
} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import {useLocalStorage} from '../lib/useLocalStorage'
import { BirdData } from '../lib/Context'
import {FirstWinter, SecondWinter} from '../components/Winter'
import {Entry} from '../components/Entry'
import {Spring} from '../components/Spring'
import {Breeding, getBreedingSites} from '../components/Breeding'
import {Trends} from '../components/Trends'
import {Months} from '../components/Months'
import {Records} from '../components/Records'
import {SettingsForm} from '../components/SettingsForm'
import {Autumn} from '../components/Autumn'
import { clean} from '../lib/data-tools'
import { LondonMap } from '../components/LondonMap'

const BirdContent = ({bird}) => {

  const [distribution, setDistribution] = useLocalStorage(bird, {})

  const [allBirdData] = useContext(BirdData)

  const records = clean(allBirdData.records.filter(({ species }) => species === bird))

  const breedingSites = getBreedingSites(records, distribution)

  const birdData = {records, distribution}

  return (
  <>
    <h1>{bird}</h1>
    <div style={{display: 'flex'}}>
    <Trends {...birdData} /><LondonMap {...birdData} /></div>
    <Tabs defaultActiveKey="whole-year" id="uncontrolled-tab-example">
      <Tab eventKey="whole-year" title="Whole year" >
        <Entry records={records} initialState={true} />
      </Tab>
      <Tab eventKey="months" title="Individual months">
        <Months {...birdData} />
        {' '}
      </Tab>
      <Tab eventKey="inner-london" title="Inner London" >
        <Records records={records.filter(({viceCounty}) => viceCounty === 'IL')} initialState={true} />
      </Tab>
      <Tab eventKey="winter" title="Winter" disabled={!distribution.winter}>
        {distribution.winter ? (
          <>
            <FirstWinter {...birdData} />
            <SecondWinter {...birdData} />
          </>
) : null}
      </Tab>
      <Tab eventKey="spring" title="Spring passage" disabled={!distribution.springPassage}>
        {distribution.springPassage ? <Spring {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
      <Tab eventKey="breeding" title="Breeding" disabled={!distribution.breeding}>
        {distribution.breeding ? <Breeding {...birdData} breedingSites={breedingSites}/> : null}
      </Tab>
      <Tab eventKey="autumn" title="Autumn passage" disabled={!distribution.autumnPassage}>
        {distribution.autumnPassage ? <Autumn {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
      <Tab eventKey="settings" title="Settings" >
        <SettingsForm species={bird} distribution={distribution} setDistribution={setDistribution}/>
      </Tab>
    </Tabs>
  </>
  )
}

export const BirdPage = () => {
  const { bird } = useParams();
  return <BirdContent bird={bird} />
}

