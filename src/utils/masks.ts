export const maskPhone = (value: string) => {
  let v = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
  if (v.length > 11) v = v.substring(0, 11); // Max 11 digitos

  if (v.length <= 10) {
    // Fixo (XX) XXXX-XXXX
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Celular (XX) XXXXX-XXXX
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
  }
  return v;
};

export const maskCPF = (value: string) => {
  let v = value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v;
};

export const maskCNPJ = (value: string) => {
  let v = value.replace(/\D/g, '');
  if (v.length > 14) v = v.substring(0, 14);
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');
  return v;
};

export const maskDocument = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 11) {
    return maskCPF(cleanValue);
  }
  return maskCNPJ(cleanValue);
};
