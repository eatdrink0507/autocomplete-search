import { useState } from "react";
import { AutoComplete } from "../AutoComplete";
import { CacheAPI } from "../CacheAPI";
import styles from "./InputComponent.module.css";

export const InputComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recommend, setRecommend] = useState<any>();
  const [view, setView] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const processChanges = debounce(async () => {
    const keyword = searchValue;
    const isCachethere = await CacheAPI.getCache(keyword[0]);
    if (isCachethere === "nothing" && keyword.length === 1) {
      CacheAPI.createCache(keyword[0]);
    } else {
      setRecommend(isCachethere);
    }
  });

  return (
    <>
      <div className={styles.Div}>
        <input
          onFocus={() => setView(true)}
          onBlur={() => {
            setView(false);
            setAutoIndex(0);
          }}
          placeholder="질환명을 입력해 주세요."
          onKeyUp={(e) => {
            processChanges();
            KeyMove(e, setAutoIndex);
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        ></input>
      </div>
      {view && (
        <AutoComplete
          recommend={searchValue.length && recommend}
          searchValue={searchValue}
          autoIndex={autoIndex}
        />
      )}
    </>
  );
};
function debounce(func: { (): void; apply?: any }, timeout = 700) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(args);
    }, timeout);
  };
}

const KeyMove = (
  e: React.KeyboardEvent,
  callback: React.Dispatch<React.SetStateAction<number>>
) => {
  if (e.key === "ArrowDown") {
    callback((prev) => prev + 1);
  } else if (e.key === "ArrowUp") {
    callback((prev) => prev - 1);
  }
};
