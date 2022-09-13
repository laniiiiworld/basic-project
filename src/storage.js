const MAX_KEYWORDS_LENGTH = 10;

export const storage = localStorage;

export const getSelectedKeywords = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setSelectedKeywords = (key, values) => {
  try {
    storage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.log(error);
  }
};

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
    selectedKeywords = removeSelectedKeyword(key, 0);
  }

  try {
    storage.setItem(key, JSON.stringify(selectedKeywords.concat([value])));
  } catch (error) {
    console.log(error);
  }
};

export const removeSelectedKeyword = (key, deleteIndex) => {
  const nextSelectedKeywords = getSelectedKeywords(key, []);
  if (deleteIndex > -1) {
    nextSelectedKeywords.splice(deleteIndex, 1);
  }
  return nextSelectedKeywords;
};
