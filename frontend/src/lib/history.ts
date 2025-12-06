export interface HistoryItem {
  id: string;
  url: string;
  risk: "SAFE" | "WARNING" | "DANGER";
  created_at: string;
}

const STORAGE_KEY = "guardnz_history";

export const loadHistory = (): HistoryItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveHistory = (item: HistoryItem) => {
  const history = loadHistory();
  history.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
