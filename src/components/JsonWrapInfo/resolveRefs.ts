interface Schema {
  [key: string]: any;
}
const cleanRefs = (schema: Schema): Schema => {
  if (Array.isArray(schema)) {
    return schema.map(item => cleanRefs(item));
  } else if (typeof schema === 'object' && schema !== null) {
    const cleanedSchema: Schema = { ...schema };
    delete cleanedSchema['$ref']; // Удаляем $ref, если он есть

    for (const key in cleanedSchema) {
      cleanedSchema[key] = cleanRefs(cleanedSchema[key]);
    }

    return cleanedSchema;
  }

  return schema; // Возвращаем оригинальное значение для примитивов
};
const resolveRef = (schema: Schema, definitions: Schema): Schema => {
  if (Array.isArray(schema)) {
    return schema.map(item => resolveRef(item, definitions));
  } else if (typeof schema === 'object' && schema !== null) {
    if ('$ref' in schema) {
      const refPath = schema['$ref'].split('#/definitions/');
      let resolved = definitions;

      // Проход по пути до определения в definitions
      for (let part of refPath.slice(1)) {
        if (resolved == null || !(part in resolved)) {
          console.warn(`Reference not found: ${schema['$ref']}`);
          return schema; // Вернуть оригинальный объект, если ссылка не найдена
        }
        resolved = resolved[part];
      }

      // Если `$ref` находится внутри `items`, возвращаем полностью раскрытое определение
      if (schema.hasOwnProperty('items')) {
        return { ...resolved }; // Возвращаем раскрытое определение вместо замены `$ref` на свойства
      } else {
        // Смешиваем свойства найденного определения с оригинальным объектом
        return { ...resolved, ...schema };
      }
    } else {
      const newSchema: Schema = Array.isArray(schema) ? [] : {};
      for (const key in schema) {
        // Проверяем массивы и другие элементы
        newSchema[key] = resolveRef(schema[key], definitions);
      }
      return newSchema;
    }
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

  // 1. Сначала разрешаем ссылки в definitions
  for (const key in definitions) {
    definitions[key] = resolveRef(definitions[key], definitions);
  }

  // 2. Разрешение ссылок в схеме
  const resolvedSchema = resolveRef(schemaCopy, definitions);

  // Удаляем definitions из схемы
  if ('definitions' in schemaCopy) {
    delete schemaCopy.definitions;
  }

  return cleanRefs(resolvedSchema);
};

export { removeRefs };