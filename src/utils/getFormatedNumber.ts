export default function getFormatedNumber(num : number|undefined|null, precision = 2) {
  const result = new Intl.NumberFormat('en-US', { minimumFractionDigits: precision, maximumFractionDigits: precision }).format(num ?? 0);
  if(Number(result) == 0 && result.startsWith('-')){
    return result.slice(1);
  }

  return result;
}

export function getPriceNumber(num : number|undefined|null, precision = 2) {
  const result = getFormatedNumber(num, 2);
  return result.startsWith('-') ? `-$${result.slice(1)}` : `$${result}`;
}

export function parseCurrency(currencyString: string) {
  const cleanedString = currencyString.replace(/[$,]/g, '');
  
  const numberValue = parseFloat(cleanedString);
  
  return isNaN(numberValue) ? 0 : numberValue;
}

export function roundDown(num: number){
  return getFormatedNumber(Math.floor(num * 100) / 100);
}