import React, {useEffect} from "react";
import * as topojson from 'topojson-client';
import  {geoPath, geoAlbers} from 'd3';
import * as d3 from 'd3';
import {uk} from '../lib/uk'
const map = (data) => {
  const mapDiv = document.getElementById('map')
  const width = mapDiv.innerWidth
  const height = mapDiv.innerHeight
  const scale = 64000

  // 12000, 3000
  const circleScale = scale / 1000;


  const projection = geoAlbers()
      .center([4.3, 51.5])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(scale)
      .translate([width / 2, height / 2]);

  const path = geoPath()
      .projection(projection)
      .pointRadius(2);

  const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);

  const subunits = topojson.feature(uk, uk.objects.subunits)
  const places = topojson.feature(uk, uk.objects.places);

  // svg.selectAll(".subunit")
  //     .datum(subunits.features.find(({id}) => id === 'ENG'))
  //     .append("path")
  //     .attr("class", function(d) { return "subunit " + d.id; })
  //     .attr("d", path);

  svg.append("path")
    .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) {
      return a !== b && a.id === "ENG";
    }))
    .attr("d", path)
    .attr("class", "subunit-boundary");


      // d3.json(`${window.location.search.substr(1)}.json`, (error, data) => {

      //   let currentDay = 0;
      //   const int = setInterval(() => {

      //     currentDay++;

      //     if (currentDay > 365) {
      //       return clearInterval(int)
      //     }

      //     const todaysData = data
      //     .filter(({day}) => day <= currentDay )
      //     .map(({count, lat, lon, day}) => ({
      //       count,
      //       day,
      //       loc: projection([lon, lat])
      //     }))
      //               console.log(currentDay, todaysData.length)
      //     svg
      //     .selectAll("circle")
      //       .data(todaysData).enter()
      //       .append("circle")
      //       .attr("cx", d => d.loc[0])
      //       .attr("cy", d => d.loc[1])
      //       .attr("r", d => Math.sqrt(d.count) * circleScale)
      //       .attr("fill", d => d3.hsl(d.day*360*0.8/365, 1, 0.5))
      //       .attr("fill-opacity", 0.1) // 0.3
      //   }, 100)

      // })

}

export function LondonMap ({records, distribution}) {
  useEffect(() => map(records), [records])
  return <div dangerouslySetInnerHTML={{__html: '<div id="map"></div>'}} />
}
