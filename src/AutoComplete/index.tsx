import style from "./AutoComplete.module.css";
import { useState, useEffect } from "react";

export const AutoComplete = ({ recommend, searchValue, autoIndex }: Props) => {
  const [list, setList] = useState<any>();

  useEffect(() => {
    const r = recommend?.data?.filter(
      (e: Object) =>
        e.sickCd.includes(searchValue) || e.sickNm.includes(searchValue)
    );
    setList(r);
  }, [recommend, searchValue]);

  return (
    <div className={style.Div}>
      <div className={style.InnerDiv}>
        <span> {list?.length ? "추천 검색어" : "검색어 없음"}</span>
        {list?.map((e: Object, i: number) => (
          <div className={i === autoIndex ? style.selected : ""} key={i}>
            <span className={style.code}>{e.sickCd}</span> {e.sickNm}
          </div>
        ))}
      </div>
    </div>
  );
};

type Props = {
  recommend: { data: [Object] };
  autoIndex: number;
  searchValue: string;
};

type Object = {
  sickCd: string;
  sickNm: string;
};
