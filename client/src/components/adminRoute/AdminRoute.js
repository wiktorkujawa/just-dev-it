import React, { useState } from 'react';
import {
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { useMessagesQuery, useUsersQuery, useLogoutMutation } from '../../generated/graphql';

import { AddMessage } from './Messages/AddMessage'

export const AdminRoute = ({ component: Component, ...rest }) => {
  const root = document.getElementsByTagName( 'html' )[0];
  root.classList.add('admin-iso');

  const [isOpen, setIsOpen] = useState(false);

  document.body.classList.add("sb-nav-fixed");
  document.body.classList.remove("bg-primary");

  const toggle = () => {
    isOpen ? document.body.classList.remove("sb-sidenav-toggled") :
    document.body.classList.add("sb-sidenav-toggled");
    setIsOpen(!isOpen);
  }


  const { data, refetch: refetchLogout } = useUsersQuery();
  const [logout] = useLogoutMutation({ refetchQueries: refetchLogout});

  const { refetch: refetchMessages } = useMessagesQuery();

  const Logout = async () =>{
    await logout();
    window.location.href='/';
  }
  

	if(!data){
		return <div>loading...</div>
	}

const authNavbar =
<ul className="navbar-nav ml-auto ml-md-0">
<li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
        {/* <ChangePassword/>
        <RegisterModal/> */}
        <div className="dropdown-divider"></div>
        <a role="button" className="dropdown-item" onClick={Logout}>Logout</a>
    </div>
</li>
</ul>

  const addObject = <main className="ml-auto">
    <div >
    {
      // match.params.type === "referencje" ? <AddReference /> :
        // match.params.type === "realizacje" ? <AddRealization /> : 
          rest.path === "/admin" ? <AddMessage user={data.currentUser} refetchMessages={refetchMessages} /> : 
            null
    }
    </div>
  </main>;

  return (
    <>
    { 
      data.currentUser ?
        data.currentUser.isAdmin ?
      <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Przejdź do wiktorkujawaportfolio.com</a>
      <button className="btn btn-link btn-sm order-1 order-lg-0" onClick={toggle} id="sidebarToggle" role="button"><i className="fas fa-bars"></i></button>
      
      {addObject}
      {/* Navbar */}
      { authNavbar }
  </nav>
  <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                  <div className="nav">
                      
                      <a className="nav-link collapsed" role='button' data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                          <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                          Strony
                          <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                          <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages"> 
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/posts">Realizacje</Link>
                                {/* <Link className="nav-link" to="/admin-modal/referencje">Referencje</Link> */}
                                {/* <Link className="nav-link" to="/admin-modal/aktualnosci">Aktualności</Link> */}
                            </nav>
                          </nav>
                      </div>
                  </div>
              </div>
              <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  <img style={{width:"2rem", height:"2rem", marginRight:"1rem"}} src={data.currentUser.image} alt=""/>
                  { data.currentUser.displayName }
                  
              </div>
          </nav>
      </div>
      <div id="layoutSidenav_content">
      <Route {...rest} component={(props) => (
          <Component {...props} user={data.currentUser} />  
      )}
      />
    <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid">
                  <div className="d-flex align-items-center justify-content-between small">
                      <div className="text-muted">Copyright &copy; wiktorkujawaportoflio.com 2020</div>
                      <div>
                          <a href="#">Privacy Policy</a>
                          &middot;
                          <a href="#">Terms &amp; Conditions</a>
                      </div>
                  </div>
              </div>
          </footer>
  </div>
  </div>
    </>
      
        : <Redirect to="/no-admin"/> : <Redirect to="/auth/google"/> }
      </>
  )
}