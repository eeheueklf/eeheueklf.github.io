import React from "react"
import { Link } from "gatsby"

import "./style.css"

function Header() {
return (
    <header>
        {/* <div className="header__profile">
            <img src="https://avatars.githubusercontent.com/u/92643238?v=4"></img>
        </div>
        <div className="header__menu">
            <Link className="header__menu-link" to="/index">
                Home
            </Link>
            <Link className="header__menu-link" to="/posts">
                Posts
            </Link>
        </div> */}
<div class="links">
      <a href="/" class="link_text">네이버를 시작페이지로</a>
      <a href="/" class="link_text">쥬니어네이버</a>
      <a href="/" class="link_text">해피빈</a>
    </div>
    <a href="/"><img src="images/naver_logo.png" class="img_logo"/></a>
    <form>
      <fieldset>
        <legend class="visually-hidden">검색</legend>
        <div class="search_box">
          <input type="text" maxlength="225" tabindex="1" />
          <button type="submit" tabindex="2">
            검색
          </button>
        </div>
      </fieldset>
    </form>
    <nav>
      <div class="nav_items">
        <ul>
      	  <li><a href="/">메일</a></li>
          <li><a href="/">카페</a></li>
          <li><a href="/">블로그</a></li>
          <li><a href="/">지식iN</a></li>
          <li><a href="/">쇼핑</a></li>
          <li><a href="/">Pay</a></li>
          <li><a href="/">TV</a></li>
          <li><a href="/">사전</a></li>
          <li><a href="/">뉴스</a></li>
          <li><a href="/">증권</a></li>
          <li><a href="/">부동산</a></li>
          <li><a href="/">지도</a></li>
          <li><a href="/">영화</a></li>
          <li><a href="/">뮤직</a></li>
          <li><a href="/">책</a></li>
          <li><a href="/">웹툰</a></li>
          <li><a href="/">더보기</a></li>
        </ul>

        </div>
    </nav>
    </header>
    );
}

export default Header