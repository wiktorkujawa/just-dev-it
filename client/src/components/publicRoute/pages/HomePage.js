import React from 'react'
import { Link } from 'react-scroll';

export const HomePage = () => {
	
  return (
    <div id="main">
    	 <article className="post featured">
								<header className="major">
									
									<h2><Link style={{cursor:"pointer"}} smooth={true} duration={500} to="main">About me</Link> 
										<div style={{textAlign:"right", margin:"0px auto 0px auto"}}>
										<Link smooth={true} offset={-50} duration={2000} to="posts" className="button icon solid solo fa-arrow-down scrolly">Continue</Link>
									</div>
									</h2>
									<p >Wiktor Kujawa is a graduated engineer from Gdansk University Of Technology on
										degree course of Technical Physics with specialization in Applied Physics and former
										RD engineer in Eltel Networks Energetyka S.A. and a passionate developer and software engineer which loves to challenge with hard problems and modern technologies. <br/> Knowledgeably connected in the fields of physics, mathematics, engineering and IT. Skilled in programming languages:</p>

										<ul style={{textAlign: "justify"}}>
											<li>General purpose: Julia,C, C++, CUDA, Python, Matlab/Octave, Mathematica</li>
											<li> Web: Javascript,Typescript, React, HTML, CSS, SASS Docker, MongoDB, MySQL</li>
											<li>MCU: C(AVR), Arduino</li>
										</ul>

<p>Specialized in numerical analysis, creating software applications allowing to solve
engineering and scientific problems in the fields of:</p>
<ul style={{textAlign: "justify"}}>
<li> Heat Flows </li>
<li>Electromagnetic fields</li>
<li>Forces occurring on overhead lines in case of short-circuit currents</li>
<li>Induced sheath voltages and sheath circulating currents problems</li>
</ul>
<p>Fascinated in Web Developing especially with MERN and PERN stacks. </p>
								</header>
								<a href="https://github.com/wiktorkujawa/" className="image main"><img src="assets/public/images/EM-field-3d.gif" alt="" /></a>
								<ul className="actions special">
									<li><a href="https://github.com/wiktorkujawa/" className="button large">Check out my github projects</a></li>
								</ul>
							</article>
						
							<section className="posts" id="posts">
								<article>
									<header>
										<h2><a href="https://github.com/wiktorkujawa/MagneticAndElectricField2D">Project 1<br />
										Magnetic and Electric Field 2D</a></h2>
									</header>
									<a href="https://vimeo.com/362665837" className="image fit"><img src="assets/public/images/electric-field-2d.gif" alt="" /></a>
									<p>Software which allow to calculate magnetic and electric field in two dimensional arrangement of three phase power lines or underground cables. written in Julia programming language and it uses Julia CImGui wrapper. </p>
									<ul className="actions special">
										<li><a href="https://github.com/wiktorkujawa/MagneticAndElectricField2D" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<h2><a href="https://travel-testing.com">Project 2<br />
										MERN page of example travel agency page</a></h2>
									</header>
									<a href="https://travel-testing.com" className="image fit"><img src="assets/public/images/travel-page.gif" alt="" /></a>
									<p>Web page implemented with MERN stack with own CMS, authentifications methods(login, registration, receiving password via email, changing passwords) using nodemailer and bcryptjs, crypto and jsonwebtoken, changable content with image uploading using gridfs and multer packages. Used React functional components, redux, axios and mongoDB Atlas Cluster.</p>
									<ul className="actions special">
										<li><a href="https://github.com/wiktorkujawa/travel-agency-page" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<h2><a href="https://github.com/wiktorkujawa/MagneticField3D">Project 3<br />
										Magnetic Field 3D</a></h2>
									</header>
									<a href="https://vimeo.com/362909878" className="image fit"><img src="assets/public/images/EM-field-3d.gif" alt="" /></a>
									<p>Software allow calculating Magnetic Field in three dimensional environment inducted by power lines, underground cables and cable poles. Written in Julia programming language and it uses Julia CImGui wrapper and calculating algorithm implemented with CUDA technology.</p>
									<ul className="actions special">
										<li><a href="https://github.com/wiktorkujawa/MagneticAndElectricField2D" className="button">Full Story</a></li>
									</ul>
								</article>
								<article>
									<header>
										<h2><a href="https://www.karmatt.pl">Project 4<br />
										Page for cleaning agency</a></h2>
									</header>
									<a href="https://www.karmatt.pl" className="image fit"><img src="assets/public/images/karmatt.gif" alt="" /></a>
									<p>Page created with MERN stack. Inludes authentication, password resseting and receiving, carousel, form contact, CMS, forwarded email and google maps connected with mongoDB database. Used React functional components, redux, axios, gridfs and mongoDB Atlas Cluster.
									</p>
									<ul className="actions special">
										<li><a href="https://www.karmatt.pl" className="button">Full Story</a></li>
									</ul>
								</article>
							</section>
              
</div>
  )
}
