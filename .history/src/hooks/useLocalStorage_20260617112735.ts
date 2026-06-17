import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // we pass an arrow function () => {} inside useState. Why? Reading from the browser's hard drive (localStorage.getItem) is "slow". By wrapping it in an arrow function, we tell React: "Only do this expensive read operation ONE time when the component first loads, and never do it again on re-renders.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // 1. Try to find the item in local storage
      // 2. If it exists, parse the JSON and return it
      // 3. If it doesn't exist, return the initialValue you provided
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 1. Update the React State
      // 2. Update the Browser's Local Storage
      setStoredValue((prevState) => {
        //A function: setFavorites((prev) => [...prev, id])
        //A direct value: setTheme("dark")
        const valueToStore =
          typeof value === "function" ? (value as any)(prevState) : value;

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }

        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
