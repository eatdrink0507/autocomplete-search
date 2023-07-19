# 원티드 프리온보딩 인턴십 11차 4주차 개인 과제 autocomplete-search

## 사용 스택
React
TypeScript
Axios
vite(개발 셋팅)
yarn(패키지 매니저)

## 로컬 실행 방법

1. yarn install
2. yarn run dev

** vite 를 사용했기 때문에 env의 변수는 VITE_APP 로 시작하는 이름을 가져야 합니다.
** src 내에서 환경변수를 사용할 경우 process.env.REACT_APP 이 아니라 import.meta.env.VITE_APP 로 호출해야 합니다.

## API 호출 로직

1. input debounce와 onkeyup 으로 마지막 keyboard event로부터 500ms 지나면 검색 시작
2. 검색어[0] 이라는 이름을 가지는 cache 가 존재하는지 확인
3. 존재하면 cache의 데이터를 자동완성Div 에 props 로 넘겨줌
4. 존재하지 않으면 검색어[0] 으로 api 호출해서 cache에 검색어[0] 이라는 이름으로 저장
5. 이후에는 cache의 데이터를 가지고 다시 filter(e => e.includes(검색어))로 추천 검색어 리스트를 갱신

콘솔창 + Cache Storage 
![api sample](https://github.com/eatdrink0507/autocomplete-search/assets/111216062/c846825e-726e-434c-9b1e-0288416789f8)

콘솔창 + 네트워크 
![searchview](https://github.com/eatdrink0507/autocomplete-search/assets/111216062/e393897b-549c-4693-8d0e-955665d1a2e2)


GIF : '조' 로 검색 시작할 경우, 우선 'ㅈ' 로 api 1회 호출, 그다음 '조'로 api 1회 호출 (여기까지 총 2회 호출)
'조'로 검색한 api 응답값을 cache에 '조' 라는 이름으로 저장
이후에는 조로 시작하는 단어라면 api를 더이상 호출 하지 않음.
GIF 에서 확인할 수 있듯이, '조'를 한번 검색한 이후에는 '조기'나 '조직'으로 검색해도 api 호출이 일어나지 않음

```
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
```

```
// searchValue 는 input값 //
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
```

## 로컬 캐싱

CacheAPI.tsx
```
import axios from "axios";

export class CacheAPI {
  static async getCache(data: string) {
    const cache = await caches.match(data);
    return cache ? cache.json().then((r) => r) : "nothing";
  }

  static createCache(str: string) {
    return axios
      .get(`${import.meta.env.VITE_APP_API}/sick`, {
        params: { q: str },
      })
      .then(async (res) => {
        console.info("calling api");

        if (res.data.length) {
          (await caches.open(str)).put(str, new Response(JSON.stringify(res)));
          return res;
        }
      });
  }
}
```
CacheAPI.getCache(string) 은 string이라는 이름을 가지는 로컬 캐시가 있는지 확인하여 없으면 'nothing' 이라는 문자열을 반환, 있으면 캐시의 데이터값을 반환합니다.
CacheAPI.createCache(string) 은 /sick?q=string 경로로 api를 호출합니다. 호출한 후, response가 빈 객체가 아니라면 string이라는 이름으로 캐시를 로컬에 저장합니다.
더불어, response의 값을 return 합니다.


## 키보드로 추천 검색어 리스트 이동

![keyboard](https://github.com/eatdrink0507/autocomplete-search/assets/111216062/502838c0-459b-411d-b93a-97cd189e618e)

```
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
```
```
const [autoIndex, setAutoIndex] = useState(0);

...

<input
 onKeyUp={(e) => {
   KeyMove(e, setAutoIndex)}} />
```
```
<div className={i === autoIndex ? style.selected : ""} key={i}>
 { ... 추천 검색어 }
</div>
```

KeyMove 함수는 키보드 이벤트를 감지하여, ⬇️ 가 눌렸을 경우 callback에서 prev값을 -1 하고 ⬆️가 눌렸을 경우 prev값을 +1 합니다.
추천 검색어를 감싸는 div 에서 key 값과 autoIndex 값이 일치할때만 class속성을 부여하여 background color에 변화를 줍니다.
