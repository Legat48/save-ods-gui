interface SortableItem {
  [key: string]: number | string | Date;
}

export function sortArray<T extends SortableItem>(
  array: T[],
  sortKey: string,
  sortDirection: number
): T[] {
  return [...array].sort((a, b) => {
    // Добавляем проверку на тип данных и соответствующую сортировку
    if (typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number') {
      return sortDirection * (a[sortKey] - b[sortKey]);
    } else if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
      return sortDirection * a[sortKey].localeCompare(b[sortKey], 'ru-RU', { numeric: true });
    } else if (typeof a[sortKey] === 'object' && typeof b[sortKey] === 'object') {
      // Добавляем обработку дат
      const aDate = new Date(a[sortKey]);
      const bDate = new Date(b[sortKey]);
      return sortDirection * (aDate.getTime() - bDate.getTime());
    } else {
      return 0;
    }
  });
}