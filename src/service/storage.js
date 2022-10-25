const MAX_KEYWORDS_LENGTH = 10; //최근 검색어 저장 가능한 최대 길이

export const storage = localStorage;

/** 최근 검색어 목록 가져오기 */
export const getSelectedKeywords = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

/**
 * 최근 검색어 목록 변경
 * - 이미 등록된 검색어 중 하나를 삭제한 경우
 */
export const setSelectedKeywords = (key, values) => {
  try {
    storage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.log(error);
  }
};

/**
 * 최근 검색어 목록 변경
 * - 새로운 검색어 추가
 * - 이미 등록된 검색어를 검색한 경우
 */
export const setSelectedKeyword = (key, value) => {
  let selectedKeywords = getSelectedKeywords(key, []);
  let deleteIndex = -1; //이미 등록된 검색어의 index

  for (let idx in selectedKeywords) {
    const keyword = selectedKeywords[idx];
    if (keyword === value) {
      deleteIndex = idx;
    }
  }

  if (deleteIndex >= 0) {
    selectedKeywords = removeSelectedKeyword(key, deleteIndex);
  }

  //저장 가능한 최근검색어 길이 제한
  if (selectedKeywords.length >= MAX_KEYWORDS_LENGTH) {
    selectedKeywords = removeSelectedKeyword(key, MAX_KEYWORDS_LENGTH - 1);
  }

  try {
    storage.setItem(key, JSON.stringify([value, ...selectedKeywords]));
  } catch (error) {
    console.log(error);
  }
};

/** 인덱스(deleteIndex)에 해당하는 최근검색어 삭제 */
export const removeSelectedKeyword = (key, deleteIndex) => {
  const nextSelectedKeywords = getSelectedKeywords(key, []);
  if (deleteIndex > -1) {
    nextSelectedKeywords.splice(deleteIndex, 1);
  }
  return nextSelectedKeywords;
};
