import weblogo from "./assets/weblogo.jpg";
import document from "./assets/document.png";
import forum from "./assets/forum.png";
import searching from "./assets/searching.jpg"
import questioning from "./assets/questioning.jpg"
import personalizing from "./assets/personalizing.jpg"
import startgif from "./assets/star.gif"
export default function Homepage() {
    return (
        <div>
            <section id="carousel-intro" style={{
                width: "100%",
                height: "100vh",
                background: "#000",
                overflow: "hidden",
                position: "relative"
            }}>
                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}>
                    <div class="carousel-indicators" style={{
                        position: "absolute",
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div class="carousel-inner" role="listbox" style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}>
                        <div class="carousel-item active" style={{
                            background: "rgba(0,0,0,1)", position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0
                        }}>
                            <div class="carousel-caption d-none d-md-block" style={{ transform: "translateY(-50%)", bottom: "initial", top: "50%", overflow: "hidden" }}>
                                <h2>Welcome to CSFunction</h2><br />
                                <h4>A Cheat Sheet of Built-in Functions Website</h4>
                                <a class="btn btn-success rounded-pill mt-4 mt-lg-4 mt-md-4 mt-xl-4" href="#about" role="button" style={{ fontSize: "120%" }}>Get Started</a>
                            </div>

                        </div>
                        <div class="carousel-item" style={{
                            background: "rgba(0,0,0,1)", position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0
                        }}>
                            <img src={searching} class="d-block w-100" alt="searching" style={{
                                opacity: 0.3, width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                            <div class="carousel-caption d-none d-md-block" style={{ transform: "translateY(-50%)", bottom: "initial", top: "50%" }}>
                                <h2>One-page Programming Language Functions</h2><br />
                                <h5>We offer a one-page UI for each programming languages' lists of functions to help you save time of searching and reduce reloading effort</h5>
                                <a class="btn btn-success rounded-pill mt-4 mt-lg-4 mt-md-4 mt-xl-4" href="#about" role="button" style={{ fontSize: "120%" }}>Get Started</a>
                            </div>
                        </div>
                        <div class="carousel-item" style={{
                            background: "rgba(0,0,0,1)", position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0
                        }}>
                            <img src={questioning} class="d-block w-100" alt="questioning" style={{
                                opacity: 0.3, width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                            <div class="carousel-caption d-none d-md-block" style={{ transform: "translateY(-50%)", bottom: "initial", top: "50%" }}>
                                <h2>Feel Free to Ask</h2><br />
                                <h5>Our categorized small discussion forums for each topic give you a high chance ask and get answer as soon as possible</h5>
                                <a class="btn btn-success rounded-pill mt-4 mt-lg-4 mt-md-4 mt-xl-4" href="#about" role="button" style={{ fontSize: "120%" }}>Get Started</a>
                            </div>
                        </div>
                        <div class="carousel-item" style={{
                            background: "rgba(0,0,0,1)", position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0
                        }}>
                            <img src={personalizing} class="d-block w-100" alt="personalizing" style={{
                                opacity: 0.3, width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                            <div class="carousel-caption d-none d-md-block" style={{ transform: "translateY(-50%)", bottom: "initial", top: "50%" }}>
                                <h2>Personalized Cheat Sheet</h2><br />
                                <h5>Be our user, you could save and customize your own cheat sheet right on your personal page</h5>
                                <a class="btn btn-success rounded-pill mt-4 mt-lg-4 mt-md-4 mt-xl-4" href="#about" role="button" style={{ fontSize: "120%" }}>Get Started</a>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <section id="about" style={{ backgroundColor: "#fda47e", paddingBottom: "5%", paddingTop: "3%" }}>
                <h1 className="text-center">ABOUT US</h1>
                <div class="section-header-break text-center">--------<img src={startgif} alt= "stargif" class="img-fluid" style={{ maxWidth: "1.2%", maxHeight: "1.2%" }} />--------</div>
                <br />
                <div className="text-center ms-5 me-5">
                    <p>For the past several years, technology has been growing so rapidly. With the purpose of helping human life have much more convenience, there are a lot of high-tech products such as websites, mobile applications, robotics, etc., produced every month. In order to produce those products, especially the software, the programming languages are invented to write up the program for the software. With the growth of the creation of many software, the demand for software engineers also increases. To be able to become a software engineer, people have to learn several programming languages to make the required products. However, with the huge amount of programming languages and each language has various of knowledge such as design, built-in functions, etc., it’s impossible for developers to remember all of them with human mind. Therefore, each programming language creator has made a documentation for them listing out every detail about it. Not only that, but there are also some organizations come up with the tutorials to support developer to make a start or remind them about the syntax, the built-in functions definition, how to use those functions, etc. Aside from the tutorials, nowadays, most people like the idea of sharing our knowledge and information with other people, so that many forum websites are developed so as to serve that preference. There are also several forum websites for developers, whose levels range from beginners to experts, to help each other solve problem and update information about technology such as Stack Overflow, GitHub, etc.</p>
                    <p>Both the documentations and the forums are beneficial for developers so that there are a lot of users using them. However, aside their advantages, there are still complaints from user about those tools. Some users say that the official documentations sometimes are not updated regularly, make it insistent with the new features of practical technology. Furthermore, the documentation’s wording is sometime confusing and hard to understand so that every time the user has problem, they usually go to the forum page to ask the questions. Aside from the forum, some websites offer a cheat sheet containing all of the built-in functions so that user could get what they want easier than accessing the documentations and users tend to prefer this one because sometimes they just want to know lists of built-in functions that the programming language have so that they could use directly. Acknowledged the preference of the cheat sheet and the forum format, we have come up with the idea of integrating both of them into our website, CSFunction.</p>
                    <img src={weblogo} alt = "weblogo" class="img-fluid mt-3"/>
                </div>
            </section>

            <section id="services" style={{ backgroundColor: "#8c8a8b", paddingBottom: "5%", paddingTop: "3%" }}>
                <h1 className="text-center">OUR SERVICES</h1>
                <div class="section-header-break text-center">--------<img src={startgif} alt= "stargif" class="img-fluid" style={{ maxWidth: "1.2%", maxHeight: "1.2%" }} />--------</div>
                <br />
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <div class="card text-center rounded-3" style={{ backgroundColor: "#f2efdb" }}>
                            <div class="card-body">
                                <img src={document} class="img-fluid w-25 h-25" alt="document" /><br /><br />
                                <h5 class="card-title">Cheat Sheet Documentation</h5>
                                <p class="card-text">Offer organized lists of built-in functions</p>
                                <a href="/client/cheatsheet/624bfee26f2c17b5768ef2a6" class="btn btn-outline-secondary" style={{ backgroundColor: "#8c8a8b", outlineColor: "#8c8a8b", color: "#f2efdb" }}>Go Explore</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card text-center rounded-3" style={{ backgroundColor: "#f2efdb" }}>
                            <div class="card-body">
                                <img src={forum} class="img-fluid w-25 h-25" alt="forum" /><br /><br />
                                <h5 class="card-title">Discussion Forum</h5>
                                <p class="card-text">Feel free to post questions here</p>
                                <a href="/client/discussion/624bfee26f2c17b5768ef2a6/general" class="btn btn-outline-secondary" style={{ backgroundColor: "#8c8a8b", outlineColor: "#8c8a8b", color: "#f2efdb" }}>Go Explore</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </section>

            <section id="contact" style={{ paddingBottom: "5%", paddingTop: "3%" }}>
                <h1 className="text-center" style={{color: "#ffc13b"}}>CONTACT US</h1>
                <div class="section-header-break text-center" style={{color: "#ffc13b"}}>--------<img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Light_Yellow_Star_pulsating.gif?20130713190110" alt= "stargif" class="img-fluid" style={{ maxWidth: "1.2%", maxHeight: "1.2%" }} />--------</div>
                <br />
                <div class="container-fluid">
                    <div class="row d-flex justify-content-evenly">

                        <div class="col-md-4 text-center">
                            <div class="contact-address">
                            <img src="https://img.icons8.com/ios/50/ffc13b/address--v1.png"/>                               
                                <h3 style={{color: "#ffc13b"}}>Address</h3>
                                <address style={{color: "#ffc13b"}}>82 Hai Ba Trung Street, District 1, Ho Chi Minh City, Vietnam</address>
                            </div>
                        </div>

                        <div class="col-md-4 text-center border-start border-dark">
                            <div class="contact-phone">
                                <img src="https://img.icons8.com/ios/50/ffc13b/phone.png"  alt="phoneIcon"/>
                                <h3 style={{color: "#ffc13b"}}>Phone Number</h3>
                                <p style={{color: "#ffc13b"}}>(+84) 028 456 190</p>
                            </div>
                        </div>

                        <div class="col-md-4 text-center border-start border-dark">
                            <div class="contact-email">
                                <img src="https://img.icons8.com/ios/50/ffc13b/envelope-dots.png" alt="emailIcon"/>
                                <h3 style={{color: "#ffc13b"}}>Email</h3>
                                <p style={{color: "#ffc13b"}}>csfunctionservices@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    )
}