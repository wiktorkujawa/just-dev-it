import React, { useEffect } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { Link as Scroll } from 'react-scroll';
import { useUsersQuery } from '../../generated/graphql';
import Logo from './logo.svg'

export const PublicRoute = ({ component: Component, ...rest }) => {

  const root = document.getElementsByTagName( 'html' )[0];
	root.classList.add('public-iso');
	document.body.classList.add('bootstrap-iso');

  useEffect(()=>{
    createNavPanel();
	},[]);

	

const createNavPanel = () =>{
	const cardLinks = [];
	const links = document.createElement("ul");
	links.classList.add("links");
	document.getElementById("navPanel").firstElementChild.append(links);

  for ( let i=0; i<=3; i++){
		const link = document.createElement("li");
		const anchor = document.createElement("a");
		link.appendChild(anchor);
		links.appendChild(link);
    cardLinks[i] = document.getElementById("navPanel").firstElementChild.childNodes[0].childNodes[i].firstElementChild;
	}
	cardLinks[0].href = "/";
	cardLinks[0].append("Info & projects");

	cardLinks[1].href = "/skills";
	cardLinks[1].append("Skills & knowledge");

	cardLinks[2].href = "/experience";
	cardLinks[2].append("Experience & education");
	
	cardLinks[3].href = "/dashboard";
	cardLinks[3].append("Leave a message");

	const cardIcons = [];
	const icons = document.createElement("ul");
	icons.className+="icons alt";
	document.getElementById("navPanel").firstElementChild.append(icons);

	for ( let i=0; i<=1; i++){
		const link = document.createElement("li");
		const anchor = document.createElement("a");
		link.appendChild(anchor);
		icons.appendChild(link);
    cardIcons[i] = document.getElementById("navPanel").firstElementChild.childNodes[1].childNodes[i].firstElementChild;
	}

	cardIcons[0].className+="icon brands fa-github alt";
	cardIcons[0].href="https://github.com/wiktorkujawa/";

	cardIcons[1].className+="icon brands fa-linkedin alt";
	cardIcons[1].href="https://www.linkedin.com/in/wiktor-kujawa-110bb2194/";

}


const getActive = (name) => {
	return rest.path === name ? 'active' : '';
}



// const [logout] = useLogoutMutation();
const { data, refetch: refetchLogout } = useUsersQuery();

	if(!data){
		return <div>loading...</div>
	}

	const navMainMenu = <> <ul className="links" style={{whiteSpace:"nowrap"}}>
							<li className={getActive("/")}><Link to="/">Info & projects</Link></li>
							<li className={getActive("/skills")}><Link to="/skills">Skills & knowledge</Link></li>
							<li className={getActive("/experience")}><Link to="/experience">Experience & education</Link></li>
							<li className={getActive("/dashboard")}><Link to="/dashboard">Leave a message</Link></li>
							{
								data.currentUser ?
									data.currentUser.isAdmin ?
								<li> <Link to="/admin">CMS</Link></li>
								: null
								: null
							}
						</ul>
						<ul className="icons">
							<li><a href="https://github.com/wiktorkujawa/" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
							<li><a href="https://www.linkedin.com/in/wiktor-kujawa-110bb2194/" className="icon brands fa-linkedin"><span className="label">Linkedin</span></a></li>						
						</ul>
						</>
	
// const Logout = async () =>{
// 	await logout();
// 	refetchLogout();
// }

console.log('change');

  return (
		
		<>
		{/* <!-- Wrapper --> */}
<div id="wrapper" className="fade-in">
	
	{/* <!-- Intro --> */}
		<div id="intro" >
			<h1>My portfolio</h1>
			<p>Showcase of my projects and my abilities</p>
			<ul className="actions">
				<li><Scroll smooth={true} duration={1000} to="header" className="button icon solid solo fa-arrow-down scrolly">Continue</Scroll></li>
			</ul>
		</div>

	{/* <!-- Header --> */}
		<header  id="header">
			<a href="/" className="logo"></a>
		</header>

		<Waypoint
onLeave={() => {
const a = document.getElementById("intro");
a.classList.remove("hidden");
}}
onEnter={() => {
const a = document.getElementById("intro");
a.classList.add("hidden");
}}
fireOnRapidScroll={true}
bottomOffset='25%'
/>

	
		
	{/*  Nav */}
		<nav id="nav">
			{navMainMenu}
		</nav>
	{/*  Main  */}
      

      
      <Route {...rest} component={(props) => (
					<Component {...props} user={data.currentUser} refetchLogout={refetchLogout} />
      )}
      />

				{/*  Footer  */}
				<footer id="footer">
						<section className="split contact">
							<section className="alt">
								<h3>Address</h3>
								<p>Narutowicza 23d/52<br />
								Olsztyn, 10-581 <br/>
							Poland</p>
							</section>
							<section>
								<h3>Phone</h3>
								<p>+48 697 141 580</p>
							</section>
							<section>
								<h3>Email</h3>
								<div>
									<p><a href="mailto:wiktorkujawa1993@gmail.com">wiktorkujawa1993@gmail.com</a></p>
									<p><a href="mailto:support@just-dev-it.com">support@just-dev-it.com</a></p>
								</div>
							</section>
							<section>
								<h3>Social</h3>
								<ul className="icons alt">
									<li><a href="https://github.com/wiktorkujawa/" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
							<li><a href="https://www.linkedin.com/in/wiktor-kujawa-110bb2194/" className="icon brands fa-linkedin"><span className="label">Linkedin</span></a></li>	
								</ul>
							</section>
						</section>
					</footer>

				{/*  Copyright  */}
					<div id="copyright">
						<ul><li>&copy; just-dev-it.com</li><li>Design: <a href="https://www.just-dev-it.com">Wiktor Kujawa</a></li></ul>
					</div>

			</div>

			<a href="#navPanel" id="navPanelToggle">Menu</a>
          </>
      
  )
}