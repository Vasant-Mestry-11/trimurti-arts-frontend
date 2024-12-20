import { Radio } from "antd";
import PropTypes from "prop-types";
import { Prices } from "../Prices";

const PriceFilter = ({ handleRadioChange }) => {
  return (
    <>
      <h4 className="text-center mt-4">Filter By Price</h4>

      <div className="d-flex flex-column">
        <Radio.Group onChange={(e) => handleRadioChange(e)}>
          {Prices.map(({ _id, name, values }) => {
            return (
              <div key={_id}>
                <Radio key={_id} value={values}>
                  {name}
                </Radio>
                ;
              </div>
            );
          })}
        </Radio.Group>
      </div>
    </>
  );
};

export default PriceFilter;

PriceFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape),
  handleRadioChange: PropTypes.func,
};
