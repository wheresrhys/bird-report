import React from 'react'
import birds from '../config/birds'

import {
  Link,
} from "react-router-dom";

export const HomePage = () => <>
<h1>Bird report helper</h1><ul>

{Object.keys(birds).map(bird => <li><Link to={`/bird/${bird}`}>{bird}</Link></li>)}

</ul></>;

