import { useEffect, useState } from "react";
import { AutoComplete } from "../AutoComplete";
import { CacheAPI } from "../CacheAPI";
import styles from "./InputComponent.module.css";

export const InputComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recommend, setRecommend] = useState<any>();
  const [view, setView] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const processChanges = debounce(async () => {
    const word = searchValue[0];
    const now = await CacheAPI.getCache(word);
    if (now !== "nothing") {
      setRecommend(now);
    } else
      CacheAPI.createCache(word).then((response) => {
        setRecommend(response);
      });
  });
  useEffect(() => {
    processChanges();
  }, [searchValue]);

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

const debounce = (func: any) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any) => {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, 500);
  };
};
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
