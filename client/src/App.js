import React from 'react';
import './App.css';
import { PublicRoute } from './components/publicRoute/PublicRoute';
import { AdminRoute } from './components/adminRoute/AdminRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { HomePage } from './components/publicRoute/pages/HomePage';
import { Skills } from './components/publicRoute/pages/Skills';
import { Experience } from './components/publicRoute/pages/Experience';
import { ChangeMessage } from './components/adminRoute/Messages/ChangeMessage';
import { Dashboard } from './components/publicRoute/pages/Dashboard/Dashboard';
import { NoAdmin } from './components/NoAdmin';

function App() {

  return (
    <Router>
            <main>
              <Switch>
                <PublicRoute path="/" exact component={HomePage} />
                <PublicRoute path="/skills" component={Skills} />
                <PublicRoute path="/experience" component={Experience} />
                <PublicRoute path="/dashboard" component={Dashboard} />
                <AdminRoute path="/admin" exact component={ChangeMessage}  />
                <Route path="/no-admin" component={NoAdmin}/>
                {/* <PublicRoute path="/o-nas" component={About} />
                <PublicRoute path="/aktualnosci-i-wydarzenia" component={News} />
                <PublicRoute exact path="/oferta" component={OfferOverall} />
                <PublicRoute path="/oferta/mycie-okien" component={OfferWindow} />
                <PublicRoute path="/oferta/mechaniczne-czyszczenie-garazy" component={OfferGarage} />
                <PublicRoute path="/sprzatanie-nagrobkow" component={OfferGarage} />
                <PublicRoute path="/realizacje" component={Realization} />
                <PublicRoute path="/referencje" component={Reference} />


                <AdminRoute path="/admin" exact component={LoginModal} />
                <AdminRoute path="/reset_password" component={ResetPassword} />
                <AdminRoute path="/password/reset/:id/:token" exact component={ReceivePassword} />

                <AdminRoute path="/admin-modal/" exact component={AdminModal} />
                <AdminRoute path="/admin-modal/:type" exact component={AdminModal} /> */}

              </Switch>
            </main>
        </Router>

      

      
  );
}

export default App;