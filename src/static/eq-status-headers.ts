interface Header {
  key: string;
  name: string;
}

export const headersBunker:Header[] = [
  { key: 'eq_name', name: 'Оборудование' },
  { key: 'material_name', name: 'Материал ССМ' },
  { key: 'batch_no', name: 'Партия' },
  { key: 'batch_no_extra', name: 'Номер бухты' },
  { key: 'remain_wgt', name: 'Остаток веса (рас.)' },
  { key: 'remain_len', name: 'Остаток длины (ур. 2)' },
  { key: 'run_m_wgt', name: 'Масса п/м материала' },
  { key: 'run_m_wgt_fill', name: 'Масса п/м наполнителя' },
  { key: 'coil_net_wgt', name: 'Вес по документу' },
  { key: 'coil_len', name: 'Длина по документу' },
  { key: 'remain_wgt_pim', name: 'Остаток веса по ПиМ' },
  { key: 'remain_len_pim', name: 'Остаток длины по ПиМ' }
]
export const headersTA:Header[] = [
  { key: 'eq_name', name: 'Оборудование' },
  { key: 'material_name', name: 'Материал ССМ' },
  { key: 'batch_no', name: 'Партия' },
  { key: 'batch_no_extra', name: '№ биг-бэга | Насыпа кюбеля' },
  { key: 'bin_net_wgt', name: 'Вес по документу' },
  { key: 'remain_wgt', name: 'Остаток веса' },
  { key: 'remain_wgt_pim', name: 'Остаток веса по ПиМ' }
]