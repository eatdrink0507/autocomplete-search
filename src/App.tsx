import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { InputComponent } from "./InputComponent";
import { CacheAPI } from "./CacheAPI";

function App() {
  return (
    <>
      <div className="App">
        <h2>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h2>
        <div>
          <InputComponent />
        </div>
      </div>
    </>
  );
}

export default App;
