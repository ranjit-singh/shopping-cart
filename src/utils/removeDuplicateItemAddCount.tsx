import { isEmpty } from 'lodash';

export default(cart: any[]) => {
    if (isEmpty(cart)) {
      return [];
    }
    return (cart.filter((v: { count: number; id: any; }, i: number, a: any[]) => {
      let count = 0;
      a.findIndex((t: { id: any; }) => { if (t.id === v.id) { count += 1; v.count = count; } }); return v;
    })).filter((v: { id: any; }, i: any, a: any[]) => a.findIndex((t: { id: any; }) => (t.id === v.id)) === i);
  }