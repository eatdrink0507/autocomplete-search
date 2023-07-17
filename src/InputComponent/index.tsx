import { useState } from "react";
import { AutoComplete } from "../AutoComplete";

export const InputComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div>
      <input
        placeholder="질환명을 입력해 주세요."
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <AutoComplete searchValue={searchValue} />
    </div>
  );
};
