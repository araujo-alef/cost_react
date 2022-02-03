import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './componets/pages/Home';
import Company from './componets/pages/Company';
import Project from './componets/pages/Project';
import Contact from './componets/pages/Contact';
import NewProject from './componets/pages/NewProject';
import Container from './componets/layout/Container';
import Projects from './componets/pages/Projects';

import Navbar from './componets/layout/Navbar'
import Footer from './componets/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min_height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/newProject">
            <NewProject />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Container>
      </Switch>
      <Footer />
    </Router >
  );
}

export default App;
