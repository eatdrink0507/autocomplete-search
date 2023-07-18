import { useState } from "react";
import { AutoComplete } from "../AutoComplete";
import { CacheAPI } from "../getCache";
import styles from "./InputComponent.module.css";

export const InputComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recommend, setRecommend] = useState<any>();
  const [view, setView] = useState(false);

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
          onBlur={() => setView(false)}
          placeholder="질환명을 입력해 주세요."
          onKeyUp={() => processChanges()}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        ></input>
      </div>
      {view && (
        <AutoComplete
          recommend={searchValue.length && recommend}
          searchValue={searchValue}
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
