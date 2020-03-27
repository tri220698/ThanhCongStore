import React from 'react';
import { formatter, TotalMoney, formatDate } from '../../mixin/mixin';
import { DropdownList } from 'react-widgets';
import { updateCart } from '../../../database/db';
import { useTranslation } from 'react-i18next';

const ListCarts = ({items}) => {
  const status = ["pending","delivered","cancelled"];
  const { t } = useTranslation();

  let ValueInput = ({ item }) => (
    <span>
      <strong className={"-"+item}></strong>{item}
    </span>
  );

  return (
    <React.Fragment>
      {items.map((item, index) => {
        let date = new Date();
        date.setTime(item.timeOrder)
        return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{formatDate(date)}</td>
          <td>{formatter.format(TotalMoney(item.cart)+TotalMoney(item.cart)/10)}</td>
          <td>
            <DropdownList data={status} defaultValue={item.status} style={{ height: '50px' }} valueComponent={ValueInput} onChange={async (value) => {
              item.status = value;
              await updateCart(item)
              alert(t('dashboard.carts.6'))
            }}/>
          </td>
        </tr>
      )})}
    </React.Fragment>
  )
}

export default ListCarts;