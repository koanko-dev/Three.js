import styled from "styled-components";
import MainCanvas from "./components/MainCanvas";
import { RecoilRoot } from "recoil";

function App() {
  return (
    // RecoilRoot: Context Provider와 같은 역할. 하위에서 상태를 사용할 수 있도록 함
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
