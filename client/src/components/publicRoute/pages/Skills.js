import React from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

export const Skills = () => {
  return (
    <div id="main">
							<section className="post">
	
								<header className="major">
									<h1>Main fields</h1>
								</header>
								<ul>
									<li><b>Web developing</b>(
										<Link style={{cursor:"pointer"}} smooth={true} offset={-50} duration={1000} to="web">more...</Link>
										)
										
										 and <b>software engineering</b>(
											<Link style={{cursor:"pointer"}} smooth={true} offset={-50} duration={1500} to="programming">more...</Link>
											)</li>
										
									<li>Well known with <b>Cigre/EPRI</b> books and many engeneering standards and magazines</li>
									<li>Mathematics, Theoretical and
										Technical Physics: Mathematical
										Analysis, Electromagne
                    tic, Heat
										and photovoltaics phenomena,
										Circuit theory etc.</li>
								</ul>

								<header className="major" id="web">
									<h2 style={{fontSize: "xx-large"}}>Web programming</h2>
								</header>
								<ul>
									<li> <b>Frontend</b>: Javascript/Typescript, React, Apollo, node, codegen, CSS/Sass, Bootstrap/Reactstrap, HTML, Redux </li>
									<li><b>Backend</b>: Express, Typeorm, Graphql, Node, Databases: MongoDB, Postgres, MySQL </li>
									<li><b>Deployment</b>: Heroku, GithubPages, Namecheap, Cloudflare, ForwardEmail, Mailgun</li>
								</ul>
								

								<header className="major" id="programming">
									<h2 style={{fontSize: "xx-large"}}>General purpose programming</h2>
								</header>
								<ul>
									<li><b>Julia</b>: Creating sofware using
										Julia and C/C++/Python/Matlab
										based packages</li>
									<li><b>Python</b>: Python: Quick-written
										application, pyplots</li>
									<li> <b>C</b>: CUDA, Microcontrollers,
										console applications, CImGui,
										openGL </li>
									<li><b>Matlab/Octave</b>: Creating scripts
										with plots, colormaps etc. </li>
									<li><b>C++</b>: object oriented C++,
										CUDA, openGL, SFML, ImGui</li>
								</ul>

								
							</section>

					</div>
  )
}

