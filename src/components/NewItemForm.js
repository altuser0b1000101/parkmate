import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Form, Textarea } from './styled';

//Form handles POST and
function NewItemForm({ items, setItems }) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const itemData = {
      store_id: 1,
      item_name: itemName,
      description,
      image_url: image,
      price
    };
    const res = await fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });
    const json = await res.json();

    setItems([...items, json]);
    history.push('/');
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>New Item</h1>
        <Input
          type="text"
          placeholder="Item Name"
          value={itemName}
          name="itemName"
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Image Url"
          value={image}
          name="image"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          type="number"
          placeholder="price"
          value={price}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Textarea
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <Input submit type="submit" value="Post Item" />
      </Form>
    </div>
  );
}

export default NewItemForm;
