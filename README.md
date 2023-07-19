# 원티드 프리온보딩 인턴십 11차 4주차 개인 과제 autocomplete-search

## 자동완성 최적화

1. input debounce와 onkeyup 으로 마지막 keyboard event로부터 0.7초 지나면 검색 로직 시작
2. 검색 로직 : 검색어[0] 이라는 key 를 가지는 cache 가 존재하는지 확인
3. 존재하면 cache의 데이터를 자동완성Div 에 props 로 넘겨줌
4. 존재하지 않으면 검색어[0] 으로 api 호출해서 cache에 검색어[0] 이라는 이름으로 저장
5. 이후에는 cache의 데이터를 가지고 다시 filter(e => e.includes(검색어))로 추천 검색어 리스트를 갱신
