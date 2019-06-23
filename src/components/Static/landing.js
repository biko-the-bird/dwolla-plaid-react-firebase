import React from 'react'
import {
  Hero, CallToAction
} from 'react-landing-page'

function Landing(props) {
 return  (
  
      <Hero
        color="black"
        bg="white"
        backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
      >
        <h1>Welcome to Trevi</h1>
          <CallToAction href="/login" mt={3} >Get Started</CallToAction>
        
      </Hero>
  
 )

}
export default Landing;