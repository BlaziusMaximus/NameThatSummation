import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeamPageHeader from './components/team-page/TeamPageHeader'

import './App.css';

// const pageStates = {
//   TEAM_PAGE: "TEAM_PAGE",
//   GAME: {
//     MAIN_MENU: "GAME_MAIN_MENU",
//     WAITING_ROOM: "GAME_WAITING_ROOM",
//     QUESTION: "GAME_QUESTION",
//   },
// };
// let pageState = pageStates.TEAM_PAGE;

function App() {

  // const handleGoToGameClick = () => {
  //   console.log(pageState, pageStates.TEAM_PAGE, pageState===pageStates.TEAM_PAGE)
  //   pageState = pageStates.GAME.MAIN_MENU;
  // }

  return (
    <>
      <TeamPageHeader />
      <h3>Team/Client Information</h3>
      {/* <Container fluid>
        <Row>
          <Col sm={5}>
            <h1>Name That Summation</h1>
          </Col>
          <Col sm={3}></Col>
          <Col sm={2}>
            <Button variant="link">Go to <strong>Game</strong></Button>
          </Col>
          <Col sm={2}>
            <Button href="https://github.com/BlaziusMaximus/NameThatSummation" variant="link">View On <strong>GitHub</strong></Button>
          </Col>
        </Row>
      </Container> */}
      {/* <div className="wrapper">
        <header  className="without-description" >
          <p className="view"><a href="https://github.com/BlaziusMaximus/NameThatSummation">View the Project on GitHub <small></small></a></p>
          <ul>
            <li><a href="">Go to <strong>Game</strong></a></li>
            <li><a href="https://github.com/BlaziusMaximus/NameThatSummation">View On <strong>GitHub</strong></a></li>
          </ul>
        </header>
        <section>

          <h3 id="teamclient-information">Team/Client Information</h3>

          <p>Adam Cogdell (adamc77@live.unc.edu): Game Architect, Client Manager</p>

          <p>Emre Yanmis (emre61@live.unc.edu): Software Architect</p>

          <p>Tiger Deng (y.deng@unc.edu): Project Manager, Editor</p>

          <p>John Majikes (jmajikes@cs.unc.edu): Client</p>

          <h3 id="meeting-information">Meeting Information</h3>

          <p>Client Meetings: Tuesday @ 2:30PM</p>

          <p>Professor Meetings (recitation): Thursday 3:30-4:30PM</p>

          <p>Team Meetings: Monday @ 6:00PM</p>

          <div className="doc-wrapper">
          <iframe src="https://docs.google.com/document/d/e/2PACX-1vR3nIMv9RltRskz5HY8NZmztMdaF0d1Mfb3Hda5n9-c8VyV_3afAFM-4RU_UVSMI2WajPdJPZLxVgmS/pub?embedded=true" className="docFrame"></iframe>
          </div>
          
        </section>
      </div>
      <footer>
      
        <p>Project maintained by <a href="https://github.com/BlaziusMaximus">BlaziusMaximus</a></p>
      
        <p>Hosted on GitHub Pages &mdash; Theme by <a href="https://github.com/orderedlist">orderedlist</a></p>
      </footer> */}
    </>
  );
}

export default App;
