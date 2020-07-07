/** @OnlyCurrentDoc */

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();

var lengthRow = 7; // ����� ������ � ������ �����
var valueRowStart = 9; // ����� ������ ������ ���������� �������� ��������/����������
var valueRowEnd = 56; // ����� ��������� ������ ���������� �������� ��������/����������
var expectedFormat = "#,##0.00"; // ��������� ������ �������� ������

/**
* ��������� �������� ��� ��������� ������� columnName. ��� ���������� ������ ���������� ���������� ��������� �������:
* 1) ������� � ������ ��������� � ������� � 9 �� 56 ��������
* 2) ������� columnName � ������ 7 ������ ��������� ����� �����
* 3) ������� columnName � ������� c 9 �� 56 ������ ��������� ���������� ����� ���������� � ������� � ��������
*
* @param {string} - ������� � ����������� ����� �� ���������
* @param {boolean} - �������� ���������� ���������� � ������ ������ ��������� ��������
* @return - ���������� ���� ������ ��������� ��������, ���� ���������� ������
* @customfunction
*/
function ��������(columnName, debug) {
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

// �������� ������� columnName
// 1. ���� � ������� [valueRowStart, valueRowEnd] �� ����� - ���������� ������
// 2. ��� emptyAllowed == true ��������� ������� ������ ����� � ������� �������
function checkColumn_(columnName, emptyAllowed) {
  for (var i = valueRowStart; i <= valueRowEnd; i++) {
    var cellName = columnName + i;
    value = sheet.getRange(cellName).getValue();

    if (value == "") {
      if (emptyAllowed) {
        continue;
      } else {
        throw new Error("������ " + cellName + " �� ����� ���� ������");
      }
    }

    if (!isNumber_(cellName)) {
      throw new Error("���������� ������ " + cellName + " �� �������� ������");
    }
  }
}

// �������� ������ columnName + lengthRow
// 1. ������ ��������� � ��������� ��������
// 2. ���������� ������ ������������� � �����
function getLengthAsString_(columnName) {
  var cellName = columnName + "" + lengthRow;
  
  var cell = sheet.getRange(cellName);
  var cellType = cell.getNumberFormat();
  if (cellType != expectedFormat) {
    throw new Error("���������� ������ " + cellName + " � ������ ����� �� �������� ������");
  }

  if (!isNumber_(cellName)) {
    throw new Error("���������� ������ " + cellName + " � ������ ����� �� �������� ������");
  }

  return cell.getDisplayValue();
}

// ��������, ��� � ������� ������� ���� ����������� ��������:
// 1. ��������� ������� - ������� �, ������ � valueRowStart �� valueRowEnd
// 2. �������� ������� �� ������� ������� ���������� �� �������� ����� � ��������
function checkGostTable_(length) {
  for (var i = valueRowStart; i <= valueRowEnd; i++) {
    var diameter = sheet.getRange("A" + i).getDisplayValue();
    var volume = getGostValue_(length, diameter);
    if (isNaN(parseFloat(volume)) || isFinite(volume)) {
      throw new Error("�������� ��� ����� " + length + " � �������� " + diameter + " �� ���������� � �������.");
    }
  }
}

//
//
function CalculateVolume_(columnName, lengthString, debug) {
  var lengthFloat = commaStringToFloat_(lengthString);
  var dbgString = "";
  if (debug) {
    dbgString += "�����: " + lengthString + "\n";
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
      dbgString += "D=" + diameterString + ", �3=" + volumeOfOneString + ". ���-��=" + cellDisplayValue + ", �3=" + volumeOfMany + "\n";
    }
  }

  if (debug) {
    dbgString += "�������� �3=" + summary;
    return dbgString;
  }

  return summary;
}

/******************************
*** ��������������� ������� ***
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
    throw new Error("�������� ������ �� �������� �������: " + cellName);
  }
  if (cellName == "") {
    throw new Error("�������� ������ �� ����� ���� ������ �������");
  }

  var range = sheet.getRange(cellName);
  var value = range.getValue();
  return typeof value;
}

function commaStringToFloat_(str) {
  return parseFloat(str.replace(',', '.'));
}