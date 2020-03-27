import React from 'react';
import { formatter, TotalMoney } from '../mixin/mixin';

const Row = ({element, date}) => {
  return (
    <tr>
      <td>{element.id}</td>
      <td>{date}</td>
      <td>{formatter.format(TotalMoney(element.cart)+TotalMoney(element.cart)/10)}</td>
      <td className={"-"+element.status}>{element.status}</td>
    </tr>
  )
}

export default Row;