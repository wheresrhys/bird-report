import React, { useContext } from "react";
import { Species } from "../lib/Context";

const UNKNOWN = 0
const VAGRANT = 1
const LOCALISED = 2
const WIDESPREAD = 3

const WINTER = 'w'
const SPRING = 's'
const BREEDING = 'b'
const AUTUMN = 'a'


export const ConfigPage = () => {

  const [species, setSpecies] = useContext(Species);


  return <div>hello {

    Object.entries(species).map(([name]) => name)
  }</div>
}

