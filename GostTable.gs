﻿/******************************
********* ГОСТ 2708-75 ********
*******************************/
function getGostValue_(length, diameter) {
  if (typeof(length) != "string") {
    throw new Error("Параметр length не является строковым: " + typeof(length));
  }
  if (typeof(diameter) != "string") {
    throw new Error("Параметр diameter не является строковым: " + typeof(diameter));
  }

  if (!(length in gostValues)) {
    throw new Error("Длина " + length + " отсутствует в таблице кубатур.");
  }

  if (!(diameter in gostValues[length])) {
    throw new Error("Диаметр " + diameter + " для длины " + length + " отсутствует в таблице кубатур.");
  }

  return gostValues[length][diameter];
}

var gostValues = {
  "2,50": {
    "8,00":  "0,014",
    "9,00":  "0,018",
    "10,00": "0,022",
    "11,00": "0,027",
    "12,00": "0,031",
    "13,00": "0,036",
    "14,00": "0,043",
    "15,00": "0,0495",
    "16,00": "0,056",
    "17,00": "0,0635",
    "18,00": "0,071",
    "19,00": "0,079",
    "20,00": "0,087",
    "21,00": "0,097",
    "22,00": "0,107",
    "23,00": "0,1185",
    "24,00": "0,13",
    "25,00": "0,142",
    "26,00": "0,154",
    "27,00": "0,167",
    "28,00": "0,18",
    "29,00": "0,19",
    "30,00": "0,2",
    "31,00": "0,215",
    "32,00": "0,23",
    "33,00": "0,245",
    "34,00": "0,26",
    "35,00": "0,275",
    "36,00": "0,29",
    "37,00": "0,305",
    "38,00": "0,32",
    "39,00": "0,34",
    "40,00": "0,36",
    "41,00": "0,375",
    "42,00": "0,39",
    "43,00": "0,41",
    "44,00": "0,43",
    "45,00": "0,45",
    "46,00": "0,47",
    "47,00": "0,49",
    "48,00": "0,51",
    "49,00": "0,535",
    "50,00": "0,56",
    "51,00": "0,585",
    "52,00": "0,61",
    "53,00": "0,635",
    "54,00": "0,66",
    "55,00": "0,69",
    "56,00": "0,72"
  },
  "2,70": {
    "8,00":  "0,015",
    "9,00":  "0,02",
    "10,00": "0,024",
    "11,00": "0,029",
    "12,00": "0,034",
    "13,00": "0,04",
    "14,00": "0,047",
    "15,00": "0,054",
    "16,00": "0,061",
    "17,00": "0,069",
    "18,00": "0,077",
    "19,00": "0,086",
    "20,00": "0,095",
    "21,00": "0,1055",
    "22,00": "0,116",
    "23,00": "0,128",
    "24,00": "0,14",
    "25,00": "0,153",
    "26,00": "0,166",
    "27,00": "0,18",
    "28,00": "0,194",
    "29,00": "0,207",
    "30,00": "0,22",
    "31,00": "0,235",
    "32,00": "0,25",
    "33,00": "0,265",
    "34,00": "0,28",
    "35,00": "0,3",
    "36,00": "0,32",
    "37,00": "0,335",
    "38,00": "0,35",
    "39,00": "0,365",
    "40,00": "0,38",
    "41,00": "0,4",
    "42,00": "0,42",
    "43,00": "0,44",
    "44,00": "0,46",
    "45,00": "0,485",
    "46,00": "0,51",
    "47,00": "0,53",
    "48,00": "0,55",
    "49,00": "0,575",
    "50,00": "0,6",
    "51,00": "0,63",
    "52,00": "0,66",
    "53,00": "0,69",
    "54,00": "0,72",
    "55,00": "0,75",
    "56,00": "0,78"
  },
  "3,00": {
    "8,00":  "0,017",
    "9,00":  "0,021",
    "10,00": "0,026",
    "11,00": "0,032",
    "12,00": "0,038",
    "13,00": "0,045",
    "14,00": "0,052",
    "15,00": "0,0605",
    "16,00": "0,069",
    "17,00": "0,0775",
    "18,00": "0,086",
    "19,00": "0,0965",
    "20,00": "0,107",
    "21,00": "0,1185",
    "22,00": "0,13",
    "23,00": "0,1435",
    "24,00": "0,157",
    "25,00": "0,171",
    "26,00": "0,185",
    "27,00": "0,2025",
    "28,00": "0,22",
    "29,00": "0,235",
    "30,00": "0,25",
    "31,00": "0,265",
    "32,00": "0,28",
    "33,00": "0,3",
    "34,00": "0,32",
    "35,00": "0,34",
    "36,00": "0,36",
    "37,00": "0,375",
    "38,00": "0,39",
    "39,00": "0,41",
    "40,00": "0,43",
    "41,00": "0,45",
    "42,00": "0,47",
    "43,00": "0,495",
    "44,00": "0,52",
    "45,00": "0,545",
    "46,00": "0,57",
    "47,00": "0,595",
    "48,00": "0,62",
    "49,00": "0,645",
    "50,00": "0,67",
    "51,00": "0,7",
    "52,00": "0,73",
    "53,00": "0,765",
    "54,00": "0,8",
    "55,00": "0,83",
    "56,00": "0,86"
  },
  "5,00": {
    "8,00" : "0,035",
    "9,00" : "0,043",
    "10,00": "0,051",
    "11,00": "0,062",
    "12,00": "0,073",
    "13,00": "0,085",
    "14,00": "0,097",
    "15,00": "0,11",
    "16,00": "0,124",
    "17,00": "0,14",
    "18,00": "0,156",
    "19,00": "0,173",
    "20,00": "0,19",
    "21,00": "0,21",
    "22,00": "0,23",
    "23,00": "0,25",
    "24,00": "0,27",
    "25,00": "0,295",
    "26,00": "0,32",
    "27,00": "0,345",
    "28,00": "0,37",
    "29,00": "0,395",
    "30,00": "0,42",
    "31,00": "0,45",
    "32,00": "0,48",
    "33,00": "0,51",
    "34,00": "0,54",
    "35,00": "0,57",
    "36,00": "0,6",
    "37,00": "0,635",
    "38,00": "0,67",
    "39,00": "0,705",
    "40,00": "0,74",
    "41,00": "0,775",
    "42,00": "0,81",
    "43,00": "0,85",
    "44,00": "0,89",
    "45,00": "0,935",
    "46,00": "0,98",
    "47,00": "1,02",
    "48,00": "1,06",
    "49,00": "1,105",
    "50,00": "1,15",
    "51,00": "1,2",
    "52,00": "1,25",
    "53,00": "1,3",
    "54,00": "1,35",
    "55,00": "1,405",
    "56,00": "1,46"
  },
  "5,40": {
    "8,00":  "0,039",
    "9,00":  "0,048",
    "10,00": "0,057",
    "11,00": "0,069",
    "12,00": "0,081",
    "13,00": "0,095",
    "14,00": "0,108",
    "15,00": "0,12",
    "16,00": "0,137",
    "17,00": "0,1535",
    "18,00": "0,17",
    "19,00": "0,19",
    "20,00": "0,21",
    "21,00": "0,23",
    "22,00": "0,25",
    "23,00": "0,27",
    "24,00": "0,29",
    "25,00": "0,32",
    "26,00": "0,35",
    "27,00": "0,375",
    "28,00": "0,4",
    "29,00": "0,43",
    "30,00": "0,46",
    "31,00": "0,49",
    "32,00": "0,52",
    "33,00": "0,555",
    "34,00": "0,59",
    "35,00": "0,625",
    "36,00": "0,66",
    "37,00": "0,695",
    "38,00": "0,73",
    "39,00": "0,765",
    "40,00": "0,8",
    "41,00": "0,845",
    "42,00": "0,89",
    "43,00": "0,93",
    "44,00": "0,97",
    "45,00": "1,015",
    "46,00": "1,06",
    "47,00": "1,105",
    "48,00": "1,15",
    "49,00": "1,205",
    "50,00": "1,26",
    "51,00": "1,31",
    "52,00": "1,36",
    "53,00": "1,415",
    "54,00": "1,47",
    "55,00": "1,53",
    "56,00": "1,59"
  },
  "6,00": {
    "8,00":  "0,045",
    "9,00":  "0,055",
    "10,00": "0,065",
    "11,00": "0,08",
    "12,00": "0,093",
    "13,00": "0,108",
    "14,00": "0,123",
    "15,00": "0,139",
    "16,00": "0,155",
    "17,00": "0,174",
    "18,00": "0,194",
    "19,00": "0,212",
    "20,00": "0,23",
    "21,00": "0,255",
    "22,00": "0,28",
    "23,00": "0,305",
    "24,00": "0,33",
    "25,00": "0,36",
    "26,00": "0,39",
    "27,00": "0,42",
    "28,00": "0,45",
    "29,00": "0,485",
    "30,00": "0,52",
    "31,00": "0,555",
    "32,00": "0,59",
    "33,00": "0,625",
    "34,00": "0,66",
    "35,00": "0,7",
    "36,00": "0,74",
    "37,00": "0,78",
    "38,00": "0,82",
    "39,00": "0,86",
    "40,00": "0,9",
    "41,00": "0,95",
    "42,00": "1,00",
    "43,00": "1,045",
    "44,00": "1,09",
    "45,00": "1,14",
    "46,00": "1,19",
    "47,00": "1,245",
    "48,00": "1,3",
    "49,00": "1,355",
    "50,00": "1,41",
    "51,00": "1,47",
    "52,00": "1,53",
    "53,00": "1,59",
    "54,00": "1,65",
    "55,00": "1,715",
    "56,00": "1,78"
  }
};