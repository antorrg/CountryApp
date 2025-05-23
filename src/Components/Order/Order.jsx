import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../Redux/filters/filterActions';

const Order = () => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  const handleChange = (e) => {
    dispatch(setOrder(e.target.value));
  };

  return (
    <div>
      <select id="order" value={order} onChange={handleChange} className="form-select form-select-sm ms-1 me-2">
        <option value="asc"> Asc. </option>
        <option value="desc"> Desc. </option>
      </select>
    </div>
  );
};

export default Order;
