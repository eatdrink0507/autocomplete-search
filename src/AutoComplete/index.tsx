import style from "./AutoComplete.module.css";
import { useState, useEffect } from "react";

export const AutoComplete = ({ recommend, searchValue }: Props) => {
  const [list, setList] = useState<any>();

  useEffect(() => {
    const r = recommend?.data?.filter(
      (e: Object) =>
        e.sickCd.includes(searchValue) || e.sickNm.includes(searchValue)
    );
    setList(r);
  }, [searchValue]);

  return (
    <div className={style.Div}>
      <div className={style.InnerDiv}>
        {!list?.length && "검색어 없음"}
        {list?.map((e: Object, i: number) => (
          <div key={i}>
            <span className={style.code}>{e.sickCd}</span> {e.sickNm}
          </div>
        ))}
      </div>
    </div>
  );
};

type Props = {
  recommend: { data: [Object] };

  searchValue: string;
};

type Object = {
  sickCd: string;
  sickNm: string;
};
