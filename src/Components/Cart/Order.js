import React from 'react';
import { BreadCrum } from '../mixin/mixin'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { formatter, TotalMoney, TotalQuan } from '../mixin/mixin'
import { removeCart } from '../../action/action'
import { updateHistory, updatePro, updateUser } from '../../database/db'


const Order = () => {

  const { t } = useTranslation();
  const order = JSON.parse(sessionStorage.getItem('order'))
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const handeConfirm = async (e) => {
    e.preventDefault();
    await upUser(cart, user)
    await updateBought(cart)
    await UpdateHistory(cart, user)
    user.cart = []
    dispatch(removeCart())
    await move()
  }

  const UpdateHistory = async (cart, user) => {
    let history =  Object
    history = {
      cart: cart,
      username: user.username,
      status: "pending",
      timeOrder: (new Date()).getTime()
    }
    await updateHistory(history)
  }

  const updateBought = async (cart) => {
    for (let item of cart) {
      let orderData = {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        votes: item.votes,
        countRate: item.countRate,
        bought: item.bought + TotalQuan(cart),
        timeActive: (new Date()).getTime(),
        category: item.category,
        addNewDate: item.addNewDate
      }
      await updatePro(orderData)
    }
  }

  const upUser = async (cart, user) => {
    let upU = {
      id: user.id,
      username: user.username,
      name: user.name,
      mail: user.mail,
      phone: user.phone,
      addrres: user.addrres,
      password: user.password,
      role: user.role,
      cart: [],
      sumPro: user.sumPro + TotalQuan(cart),
      sumPay: user.sumPay + TotalMoney(cart) + TotalMoney(cart) / 10
    }
    sessionStorage.setItem('userData', JSON.stringify(upU.username))
    await updateUser(upU)
  }

  const move = async () => {
    window.location.pathname = ('/confirm')
  }

  if (order) {
    return (
      <React.Fragment>
        <BreadCrum path="Xác nhận" />
        <section className="main__user">
          <div className="container">
            <div className="row">
              <form action="" className="form__regis">
                <div className="confirm__text" style={{ textAlign: 'center' }}>
                  <h4>{t('header.hello')} {user.name}</h4>
                  <h5>{t('order.1')}<span>{TotalQuan(cart)}</span> {t('order.2')} <span>{formatter.format(TotalMoney(cart) + TotalMoney(cart) / 10)}</span></h5>
                </div>
                <div className="item__button" style={{ margin: '0 auto' }}>
                  <Link className="-right" to="/cart">{t('button.back')}</Link>
                  <Link className="-left" to="/confirm" onClick={e => handeConfirm(e)}>{t('button.confirm')}</Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <BreadCrum path="Xác nhận" />
        <section className="main__user">
          <div className="container">
            <div className="row">
              <form action="" className="form__regis">
                <div className="confirm__text" style={{ textAlign: 'center' }}>
                  <h5>{t('order.3')}</h5>
                </div>
                <div className="item__button" style={{ margin: '0 auto' }}>
                  <Link className="-left" to="/cart">{t('button.cart')}</Link>
                  <Link className="-right" to="/">{t('button.back')}</Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Order