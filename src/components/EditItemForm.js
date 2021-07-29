import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Input, Form, Textarea } from './styled';

//Form handles POST and
function EditItemForm({ items, setItems }) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  let history = useHistory();
  const id = useParams().id;

  useEffect(() => {
    async function fetchItem() {
      const res = await fetch(`http://localhost:3001/items/${id}`);
      const item = await res.json();
      setItemName(item.item_name);
      setPrice(item.price);
      setImageUrl(item.image_url);
      setDescription(item.description);
    }
    fetchItem();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const itemData = {
      store_id: 1,
      item_name: itemName,
      description,
      image_url: image,
      price
    };
    const res = await fetch(`http://localhost:3001/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });
    const item = await res.json();

    setItems(
      items.map((i) => {
        return i.id === parseInt(id) ? item : i;
      })
    );
    history.push('/');
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Edit Item</h1>
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
          type="float"
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
        <Input submit type="submit" value="Post" />
      </Form>
    </div>
  );
}

export default EditItemForm;
