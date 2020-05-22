import { isEmpty } from 'lodash';

const removeDuplicateItemAddCount = (cart) => {
    if (isEmpty(cart)) {
      return [];
    }
    return (cart.filter((v, i, a) => {
      let count = 0;
      a.findIndex((t) => { if (t.id === v.id) { count += 1; v.count = count; } }); return v;
    })).filter((v, i, a) => a.findIndex((t) => (t.id === v.id)) === i);
  };

  export default removeDuplicateItemAddCount;