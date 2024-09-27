// Импортируем библиотеку clipboard.js

/**
 * Копирует текст в буфер обмена.
 *
 * @param {string} text - Текст для копирования.
 * @returns {Promise<boolean>} - Промис, который разрешается в `true`, если копирование прошло успешно, и в `false` в противном случае.
 */
export default function copyToClipboard (text: string): Promise<boolean> {
  return new Promise((resolve) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)

    // Эмулируем клик на созданный элемент textarea
    textarea.select()
    document.execCommand('copy')

    document.body.removeChild(textarea) // Удаляем временно созданный элемент textarea

    resolve(true) // Разрешаем промис в случае успешного копирования
  })
}
