import ItemCard from './ItemCard.js';
import { Grid } from './styled';

function ItemContainer({ items, setItems }) {
  return (
    <>
      <h1>Items</h1>
      <Grid>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            items={items}
            setItems={setItems}
          />
        ))}
      </Grid>
    </>
  );
}

export default ItemContainer;
