'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Icon } from 'semantic-ui-react'

/*** MAIN ***/
const NewPopupBtn = ({ show }) => {
  return (
    <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden onClick={show}>
        <Icon name="right arrow" />
      </Button.Content>
    </Button>
  )
}

export default NewPopupBtn
