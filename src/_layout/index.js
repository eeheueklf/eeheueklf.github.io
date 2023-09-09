
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import "./style.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const { title, author } = data.site.siteMetadata;
  return (
    <body className="wrapper">
      <Header/>
      
      <main className="page-content">{children}</main>
      
      <footer>
          © {new Date().getFullYear()} &middot; 
          {` `}
          <a href="https://github.com/eeheueklf">Github</a>
        </footer>
      </body>
  )
}

export default Layout
