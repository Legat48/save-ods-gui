interface Schema {
  [key: string]: any;
}

const resolveRef = (schema: Schema, definitions: Schema): Schema => {
  if (typeof schema === 'object' && schema !== null) {
    if ('$ref' in schema) {
      const refPath = schema['$ref'].split('#/definitions/');
      let resolved = definitions;

      // Проход по пути до определения в definitions
      for (let part of refPath.slice(1)) {
        if (resolved == null || !(part in resolved)) {
          console.warn(`Reference not found: ${schema['$ref']}`);
          return {}; // Вернуть пустой объект, если ссылка не найдена
        }
        resolved = resolved[part];
      }

      // Рекурсивно разрешаем ссылки внутри найденного определения
      return resolveRef(resolved, definitions);
    } else {
      const newSchema: Schema = Array.isArray(schema) ? [] : {};
      for (const key in schema) {
        // Проверяем массивы и другие элементы
        newSchema[key] = resolveRef(schema[key], definitions);
      }
      return newSchema;
    }
  } else if (Array.isArray(schema)) {
    return schema.map((item: Schema) => resolveRef(item, definitions));
  } else {
    return schema; // Возвращаем оригинальное значение для примитивов
  }
};

const removeRefs = (schema: Schema): Schema => {
  const schemaCopy: Schema = JSON.parse(JSON.stringify(schema)); // Создание глубокой копии
  let definitions: Schema = {};

  // Извлечение definitions (если они есть)
  if ('definitions' in schemaCopy) {
    definitions = schemaCopy.definitions; // Сохраняем definitions перед удалением
  }

  // Разрешение ссылок в схеме
  const resolvedSchema = resolveRef(schemaCopy, definitions);

  // Удаляем definitions из схемы
  if ('definitions' in schemaCopy) {
    delete schemaCopy.definitions;
  }

  return resolvedSchema;
};


export { removeRefs };