
/** [] Imported @ 
 * src/views-bootstrap/Services/services.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
// [] structure and style components
  import Card from 'react-bootstrap/Card'
  import Accordion from 'react-bootstrap/Accordion'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const service_accordian = ( {txt, image} ) => {
  return(  

    <Card>

      <Accordion.Toggle as={Card.Header} eventKey={ txt.ID_text }>
      {txt.Name}
      </Accordion.Toggle>

      <Accordion.Collapse eventKey={ txt.ID_text }>
        <Card.Body>{txt.Lang_eng}</Card.Body>
      </Accordion.Collapse>

    </Card>

  );
}

export default (service_accordian);

/*
 <Accordion defaultActiveKey="0">
      <Card>

        <Accordion.Toggle as={Card.Header} eventKey={txt.ID_text} className="my_serviceCard"> 
        
             <Img className="my_cardImage"
                  src={[ image[txt.Images] ]}
                  unloader={
                      <div className="center">Jabba dabba doooooo</div>
                  }
              />
              <h2>{txt.Name}</h2>
              <p>{txt.Lang_eng}</p>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={txt.ID_text}>
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
        
      </Card>
    </Accordion>
*/