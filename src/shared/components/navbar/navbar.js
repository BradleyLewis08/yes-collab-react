import React from "react";
import "./navbar.scss";
import { Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavLinkDropdown from "./navbar-dropdown";
import { ReactComponent as Logo } from "shared/images/logo.svg"

const headers = [
    {
        name: 'Students',
        subheaders: [
            {
                title: 'I\'m a student', 
                to: '/students',
                emoji: '🧑‍🎓',
            },
            {
                title: 'Apply',
                to: '/apply',
                emoji: '💻',
            },
            {
                title: 'FAQ',
                to: '/students-faq',
                emoji: '❓',
            }
        ]
    },
    {
        name: 'Start-ups',
        subheaders: [
            {
                title: 'I\'m a start-up',
                to: '/partners',
                emoji: '💡',
            },
            {
                title: 'Our Network',
                to: '/our-network',
                emoji: '🌐',
            },
            {
                title: 'Join Us',
                to: '/join-us',
                emoji: '🚀',
            },
            {
                title: 'FAQ',
                to: '/partners-faq',
                emoji: '❓',
            }
        ]
    },
    {
        name: 'Learn More',
        subheaders: [
            {
                title: 'About',
                to: '/about',
                emoji: '👥',
            },
            {
                title: 'Campus Partners',
                to: '/campus',
                emoji: '🤝',
            },
        ]
    },
    {
        to: '/catalog',
        name: 'Catalog'
    },
]

/**
 * See here for navbar stuff: https://css-tricks.com/scroll-fix-content/
 * Had to use Component instead of hooks to take advantage of 
 * componentWillUnmount
 */
export class Navigation extends React.Component {

    constructor(props) {
        super(props)
        this.limit = props.limit
        this.state = {
            scroll: "top",
            expanded: false,
            isOpen: false
        }

        this.scrollEvent = this.scrollEvent.bind(this)
        this.setExpandState = this.setExpandState.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    componentDidMount() {
        document.addEventListener("scroll", this.scrollEvent, true)
    }

    scrollEvent(e) {
        var scrolled = document.scrollingElement.scrollTop
        if (scrolled >= this.limit) {
            if (this.state.scroll !== "scrolled") {
                this.setState({
                    scroll: "scrolled"
                })
            }
        } else {
            if (this.state.scroll !== "top") {
                this.setState({
                    scroll: "top"
                })
            }
        }
    }

    setExpandState(val) {
        this.setState({
            expanded: val
        })
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.scrollEvent, true)
    }

    closeNav() {
        this.setExpandState(false)
    }

    handleOpen() {
        this.setState({ isOpen: true })
    }

    handleClose() {
        this.setState({ isOpen: false })
    }


    render() {
        return (
            <Navbar className={`navigation-container ${this.state.scroll === "scrolled" ? "navigation-scrolled" : ""}`}
                collapseOnSelect
                expand="lg"
                onToggle={this.setExpandState}
                expanded={this.state.expanded}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-spec-toggle" onClick={() => this.setExpandState(this.state.expanded ? false : "expanded")} />
                <Navbar.Collapse className="navigation-collapse" id="responsive-navbar-nav">
                    <div className="navigation-pages-container">
                        <Nav onClick={() => this.closeNav()}>
                            <Navbar.Brand>
                                <li className="navbar-reg-brand logo-container">
                                    <NavLink exact activeClassName="navbar__link--active" to="/">
                                        <Logo className="home-logo" />
                                        <span className="home-text">Home</span>
                                    </NavLink>
                                </li>
                            </Navbar.Brand>
                            {headers.map(({ to, name, main, subheader, subheaders }, index) => {
                                return subheaders != null
                                    ? <NavLinkDropdown key={index} to={to} name={name} main={main} subheader={subheader} subheaders={subheaders} />
                                    : <Navbar.Brand key={index} ><li className="navbar-reg-brand"><NavLink exact activeClassName="navbar__link--active" to={to} title={name}>{name}</NavLink></li></Navbar.Brand>
                            })}
                            {/* <Navbar.Brand>
                                <li className="applications-brand"><a href="https://bit.ly/YES-Internships-Apply-S22" target="_blank" rel="noreferrer noopener">Apply Here!</a></li>
                            </Navbar.Brand> */}
                        </Nav>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-bar-toggle"><div></div></Navbar.Toggle>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
