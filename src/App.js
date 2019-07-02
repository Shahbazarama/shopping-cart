import React from 'react';

const CartHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Shopping Cart</a>
    </nav>
  )
}

const CartFooter = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">&copy; {props.copyright}</a>
    </nav>
  )
}

const CartItemComponent = (props) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-md-8">{props.product}</div>
        <div className="col-md-2">{`$${(props.price/100).toFixed(2)}`}</div>
        <div className="col-md-2">{props.quantity}</div>
      </div>
    </div>
  )
}

const CartItems = ({items}) => {
  console.log(items)
  let itemList = items.map(item => <CartItemComponent key={item.id} product={item.product.name} price={item.product.priceInCents} quantity={item.quantity} />)

  return (
    <div className="container">
      <h1>Cart Items</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-8">Product</div>
            <div className="col-md-2">Price</div>
            <div className="col-md-2">Quantity</div>
          </div>
        </div>
        {itemList}
      </div>
    </div>
  )
}

const TotalPrice = ({price}) => {
  return (
    <div className="container">
      <p>
        Total Price: {`$${(price/100).toFixed(2)}`}
      </p>
    </div>

  )
}

class AddItem extends React.Component {

  itemList = this.props.items.map(item => <option>{item.name}</option>)

  state = {}

  onSubmit = (e) => {
    e.preventDefault()

    let indexOfAddedItem = this.props.items.findIndex(i => i.name === this.state.product);

    let idOfAddedItem = this.props.items[indexOfAddedItem]['id']
    let priceOfAddedItem = this.props.items[indexOfAddedItem]['priceInCents']

    let itemFormatted = {
      product: {
        id: idOfAddedItem,
        name: this.state.product,
        priceInCents: priceOfAddedItem
      },
      quantity: this.state.quantity
    }
    this.props.onItemAdded(itemFormatted)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={ this.onSubmit }>
          <div className="form-group">
            <label htmlFor="quantityEntry">
              Quantity
            </label>
            <input type="number" className="form-control" onChange={ (e) => this.setState({quantity: e.target.value})} required />
          </div>
          <div className="form-group">
            <label htmlFor="productLIst">
              Products
            </label>
            <select className="form-control" onChange={ (e) => this.setState({product: e.target.value})} required>
              <option disabled>Select an Option...</option>
            {this.itemList}
            </select>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    )
  }
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
        { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
        { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
        { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
        { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
        { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
        { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
        { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
        { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
      ],
      cartItemsList: [
        {
          id: 1,
          product: {
            id: 40,
            name: 'Mediocre Iron Watch',
            priceInCents: 399
          },
          quantity: 1
          },
        {
          id: 2,
          product: {
            id: 41,
            name: 'Heavy Duty Concrete Plate',
            priceInCents: 499
          },
          quantity: 2
          },
        {
          id: 3,
          product: {
            id: 42,
            name: 'Intelligent Paper Knife',
            priceInCents: 1999
          },
          quantity: 1
        },
      ],
      totalPrice: 3396
    }
  }

  itemAdded = (item) => {
    this.setState((state, props) => ({
        products: state.products,
        cartItemsList: state.cartItemsList.concat(item),
        totalPrice: state.totalPrice += (item.product.priceInCents * item.quantity)
    }))
  }



  render() {
    return (
      <div>
        <CartHeader />
        <CartItems items={this.state.cartItemsList}/>
        <TotalPrice price={this.state.totalPrice} />
        <AddItem items={this.state.products} onItemAdded={this.itemAdded}/>
        <CartFooter copyright = "2019"/>
      </div>
    );
  }

}

export default App;
