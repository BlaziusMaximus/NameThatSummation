import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

const TeamPageBody = () => {
    return (
        <Container>
            <Row><h3>Team/Client Information</h3></Row>
            <Row><p>Adam Cogdell (adamc77@live.unc.edu): Game Architect, Client Manager</p></Row>
            <Row><p>Emre Yanmis (emre61@live.unc.edu): Software Architect</p></Row>
            <Row><p>Tiger Deng (y.deng@unc.edu): Project Manager, Editor</p></Row>
            <Row><p>John Majikes (jmajikes@cs.unc.edu): Client</p></Row>

            <Row><h3 id="meeting-information">Meeting Information</h3></Row>
            <Row><p>Client Meetings: Tuesday @ 2:30PM</p></Row>
            <Row><p>Professor Meetings (recitation): Thursday 3:30-4:30PM</p></Row>
            <Row><p>Team Meetings: Monday @ 6:00PM</p></Row>

            <br />

            <Row><h3>DESIGN DOCUMENT</h3></Row>
            <Row>
                <div style={{ width: '8.5in', height: 'auto', border: '1px solid black' }}>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <iframe title="Design Doc" src="https://docs.google.com/document/d/e/2PACX-1vR3nIMv9RltRskz5HY8NZmztMdaF0d1Mfb3Hda5n9-c8VyV_3afAFM-4RU_UVSMI2WajPdJPZLxVgmS/pub?embedded=true" />
                    </ResponsiveEmbed>
                </div>
            </Row>

            <br /><br />

            <Row><h3>HANDOFF INSTRUCTIONS</h3></Row>
            <Row>
                <div style={{ width: '8.5in', height: 'auto', border: '1px solid black' }}>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <iframe title="Handoff" src="https://docs.google.com/document/d/e/2PACX-1vSkIoTyeGX_JNu12iifmy06HV_EEA10F3JZxPN_tplZJK8ZmrRIeNn0zR_-oXqQH9ohU72bdsOJsBAt/pub?embedded=true" />
                    </ResponsiveEmbed>
                </div>
            </Row>
        </Container>
    );
}

export default TeamPageBody;