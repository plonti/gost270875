/** @OnlyCurrentDoc */

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();

var lengthRow = 7; // номер строки с длиной брёвен
var valueRowStart = 9; // номер первой строки содержащей значения диаметра/количества
var valueRowEnd = 56; // номер последней строки содержащей значения диаметра/количества
var expectedFormat = "#,##0.00"; // ожидаемый формат числовой ячейки

/**
* Вычисляет кубатуру для заданного столбца columnName. Для правильной работы необходимо выполнение следующих условий:
* 1) Столбец А должен содержать в строках с 9 по 56 диаметры
* 2) Столбец columnName в строке 7 должен содержать длину брёвен
* 3) Столбец columnName в строках c 9 по 56 должен содержать количество брёвен указанного в столбце А диаметра
*
* @param {string} - Столбец с количеством брёвен по диаметрам
* @param {boolean} - Выводить отладочную информацию в ячейку вместо суммарной кубатуры
* @return - Возвращает либо строку суммарной кубатуры, либо отладочную строку
* @customfunction
*/
function КУБАТУРА(columnName, debug) {
  checkColumn_("A", false);
  checkColumn_(columnName, true);
  
  var lengthString = getLengthAsString_(columnName);
  var lengthFloat = commaStringToFloat_(lengthString);

  checkGostTable_(lengthString);

  if (debug != null) {
    debug = true;
  }
  var volume = CalculateVolume_(columnName, lengthString, debug);

  return volume;
}

// Проверка столбца columnName
// 1. Если в строках [valueRowStart, valueRowEnd] не числа - генерирует ошибку
// 2. Для emptyAllowed == true допускает наличие пустых ячеек в строках столбца
function checkColumn_(columnName, emptyAllowed) {
  for (var i = valueRowStart; i <= valueRowEnd; i++) {
    var cellName = columnName + i;
    value = sheet.getRange(cellName).getValue();

    if (value == "") {
      if (emptyAllowed) {
        continue;
      } else {
        throw new Error("Ячейка " + cellName + " не может быть пустой");
      }
    }

    if (!isNumber_(cellName)) {
      throw new Error("Содержимое ячейки " + cellName + " не является числом");
    }
  }
}

// Проверка ячейки columnName + lengthRow
// 1. Формат совпадает с ожидаемым цифровым
// 2. Содержимое ячейке преобразуется в число
function getLengthAsString_(columnName) {
  var cellName = columnName + "" + lengthRow;
  
  var cell = sheet.getRange(cellName);
  var cellType = cell.getNumberFormat();
  if (cellType != expectedFormat) {
    throw new Error("Содержимое ячейки " + cellName + " с длиной брёвен не является числом");
  }

  if (!isNumber_(cellName)) {
    throw new Error("Содержимое ячейки " + cellName + " с длиной брёвен не является числом");
  }

  return cell.getDisplayValue();
}

// Проверка, что в таблице кубатур есть необходимые значения:
// 1. Вычисляем диаметр - столбец А, строки с valueRowStart по valueRowEnd
// 2. Пытаемся извлечь из таблицы кубатур информацию по заданной длине и диаметру
function checkGostTable_(length) {
  for (var i = valueRowStart; i <= valueRowEnd; i++) {
    var diameter = sheet.getRange("A" + i).getDisplayValue();
    var volume = getGostValue_(length, diameter);
    if (isNaN(parseFloat(volume)) || isFinite(volume)) {
      throw new Error("Кубатура для длины " + length + " и диаметра " + diameter + " не определена в таблице.");
    }
  }
}

//
//
function CalculateVolume_(columnName, lengthString, debug) {
  var lengthFloat = commaStringToFloat_(lengthString);
  var dbgString = "";
  if (debug) {
    dbgString += "Длина: " + lengthString + "\n";
  }
  
  var summary = 0;
  for (var i = valueRowStart; i <= valueRowEnd; i++) {
    var cellDisplayValue = sheet.getRange(columnName + i).getDisplayValue();
    if (cellDisplayValue == "") {
      continue;
    }
    
    var diameterString = sheet.getRange("A" + i).getDisplayValue();
    var volumeOfOneString = getGostValue_(lengthString, diameterString);
    var volumeOfOneFloat = commaStringToFloat_(volumeOfOneString);

    var amountFloat = commaStringToFloat_(cellDisplayValue);
    
    var volumeOfMany = volumeOfOneFloat * amountFloat;
    summary += volumeOfMany;
    
    if (debug) {
      dbgString += "D=" + diameterString + ", м3=" + volumeOfOneString + ". Кол-во=" + cellDisplayValue + ", м3=" + volumeOfMany + "\n";
    }
  }

  if (debug) {
    dbgString += "Кубатура м3=" + summary;
    return dbgString;
  }

  return summary;
}

/******************************
*** Вспомогательные функции ***
*******************************/

function isNumber_(cellName) {
  var cell = sheet.getRange(cellName);
  
  var cellFormat = cell.getNumberFormat();
  if (cellFormat != expectedFormat) {
    return false;
  }

  var cellValue = cell.getValue();
  if (!isNaN(parseFloat(cellValue)) && isFinite(cellValue)) {
    return true;
  } else {
    return false;
  }
}

function typeOfCellValue(cellName) {
  if (typeof(cellName) != "string") {
    throw new Error("Название ячейки не является строкой: " + cellName);
  }
  if (cellName == "") {
    throw new Error("Название ячейки не может быть пустой строкой");
  }

  var range = sheet.getRange(cellName);
  var value = range.getValue();
  return typeof value;
}

function commaStringToFloat_(str) {
  return parseFloat(str.replace(',', '.'));
}