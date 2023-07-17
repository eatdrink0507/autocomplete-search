import { useState } from "react";

export const InputComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  return (
    <div>
      <input
        placeholder="질환명을 입력해 주세요."
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
};
