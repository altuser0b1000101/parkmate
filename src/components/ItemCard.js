import { Link, useHistory } from 'react-router-dom';
import { Card, Image, Button, Errors } from './styled';
import React, { useState } from 'react';

function ItemCard({ item, items, setItems }) {
  let history = useHistory();
  const [errors, setErrors] = useState(null);

  //Delete item
  async function deleteItem() {
    const res = await fetch(`http://localhost:3001/items/${item.id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setItems(items.filter((i) => i.id !== item.id));
    }
  }

  //Review POST
  async function orderItem() {
    const orderData = {
      user_id: 1,
      item_id: item.id
    };
    const res = await fetch(`http://localhost:3001/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      const order = await res.json();
      history.push(`/orders/${order.id}`);
    } else {
      const error = await res.json()
      setErrors(error.message)
    }
  }

  return (
    <Card>
      <Image src={item.image_url} alt={item.item_name} />
      <h2>{item.item_name}</h2>
      <h3>${parseFloat(item.price).toFixed(2)}</h3>
      <p>{item.description}</p>
      <Button red onClick={deleteItem}>
        Delete
      </Button>
      <Button green onClick={orderItem}>
        Order
      </Button>
      <Link to={`/items/${item.id}/edit`}>
        <Button grey>Edit</Button>
      </Link>
      <Errors>
        <p>{errors}</p>
      </Errors>
    </Card>
  );
}

export default ItemCard;
