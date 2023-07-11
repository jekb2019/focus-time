// Function to set a value in local storage
export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

// Function to get a value from local storage
export function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}
