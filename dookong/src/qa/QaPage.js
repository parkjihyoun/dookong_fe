import React, { useState } from 'react';
import './QaPage.css';
import { Link } from 'react-router-dom';

import back from '../assets/back.png';
import kong from '../assets/kong.png';
import noticeimg from '../assets/notice.png';
import qnaimg from '../assets/qna.png';

const Header = () => (
    <div className="qaheader">
      <Link to="/" className="qaheader-back">
          <img src={back} alt="back" />
      </Link>
      <div className="qaheader-title">고객센터</div>
      <Link to="/my" className="qaheader-point">
          <img src={kong} alt="kong" />
      </Link>
    </div>

);

const NoticeItem = ({ link, title, date }) => (
  <Link to={link} className="notice-item">
    <div className="noticeicon">
      <img src={noticeimg} alt="noticeimg" />
    </div>
    <div className="text">
      <h2>{title}</h2>
      <p className="date">{date}</p>
    </div>
  </Link>
);

const QnaItem = () => (
    <Link to="/Mail" className="qna-item">
      <div className="qnaicon">
        <img src={qnaimg} alt="qnaimg" />
      </div>
      <div className="text">
        <h2>관리자에게 문의하기</h2>
        <p className="email">dookong@gmail.com</p>
      </div>
    </Link>
  );

const Content = () => (
  <div className="qa-content">
    <div className="notice">
      <div className="item">공지사항</div>
      <NoticeItem link="/Notice1" title="dookong 이용 안내" date="2024.09.22" />
      <NoticeItem link="/Notice2" title="서비스 점검 안내" date="2024.09.22" />
    </div>
    <div className="qna">
      <div className="item">문의하기</div>
      <QnaItem />
    </div>
  </div>
);

const QaPage = () => (
  <div className="qa-container">
    <Header />
    <div className="explain">
      불편하시거나<br />궁금하신 점이 있으신가요?
    </div>
    <Content />
    <div className="qa-container__background"></div>
  </div>
);

export default QaPage;
