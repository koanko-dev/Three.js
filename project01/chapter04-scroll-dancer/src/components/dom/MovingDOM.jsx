import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../../stores";
import { useRef } from "react";
import { Scroll, useScroll } from "@react-three/drei";
import styled from "styled-components";
import { useFrame } from "@react-three/fiber";

const MovingDOM = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  // DOM 요소를 적용하기 위해 scroll 가져오기
  const scroll = useScroll();

  const fixed = document.getElementById("fixed");

  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  const article08Ref = useRef(null);

  useFrame(() => {
    if (
      !isEntered ||
      !fixed ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article08Ref.current
    )
      return;

    // range 함수: 첫번째 파라미터는 시작점, 두번째 파라미터는 시작점으로부터 원하는 끝점까지의 거리
    // range 함수는 첫번째 처음에서 0을 리턴하게 만들고, 끝에서 1을 리턴하게 만든다.
    // 1에서 빼주었기 때문에, opacity는 처음엔 1, 범위가 끝날때 0이 된다.
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
    article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`;
    // 커브는 중간이 1을 리턴한다. 처음과 끝에서는 0을 리턴한다.
    article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`;
    article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`;

    if (scroll.visible(4 / 8, 3 / 8)) {
      fixed.style.display = "flex";
      fixed.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
    } else {
      fixed.style.display = "none";
    }

    article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`;
  });

  if (!isEntered) return null;

  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}>
        <LeftBox>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
        </LeftBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
        </RightBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article03Ref}>
        Threejs R3F Drei Cannon
      </ArticleWrapper>

      <ArticleWrapper ref={article04Ref} className="height-4">
        <RightBox>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
          <span>Interactive Web Site</span>
        </RightBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article08Ref}>
        {`You've mastered the basics of R3F.`}
        <Footer>
          {`You've mastered the basics of R3F.`}
          {`You've mastered the basics of R3F.`}
          {`You've mastered the basics of R3F.`}
        </Footer>
      </ArticleWrapper>
    </Scroll>
  );
};

export default MovingDOM;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  &.height-4 {
    height: 400vh;
  }
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  padding: 40px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > span:nth-child(1) {
    font-size: 32px;
  }
  & > span:nth-child(2) {
    font-size: 48px;
  }
  & > span:nth-child(3) {
    font-size: 16px;
  }
  & > span:nth-child(4) {
    font-size: 24px;
  }
  & > span:nth-child(5) {
    font-size: 28px;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > span:nth-child(1) {
    font-size: 32px;
    font-weight: 400;
  }
  & > span:nth-child(2) {
    font-size: 32px;
    font-weight: 500;
  }
  & > span:nth-child(3) {
    font-size: 32px;
    font-weight: 600;
  }
  & > span:nth-child(4) {
    font-size: 32px;
    font-weight: 700;
  }
  & > span:nth-child(5) {
    font-size: 32px;
    font-weight: 800;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 8px;
`;
