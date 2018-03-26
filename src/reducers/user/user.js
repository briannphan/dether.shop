import config from '../../constants/config';

const initialState = {
  balance: {
    eth: 0,
    dth: 0
  },
  isCertified: false,
  ethAddress: null
};

/**
 * userReducer
 */
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_BALANCE':
      return { ...state, balance: payload };
    case 'SET_USER_CERTIFIED':
      return { ...state, isCertified: payload };
    case 'SET_ETH_ADDRESS':
      return { ...state, ethAddress: payload };
    default:
      return state;
  }
};

/**
 * hasBalance
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasBalance = ({ balance }) => balance && (balance.eth !== 0 || balance.dth !== 0);

export const hasEnoughDthToAddShop = ({ dth }) => (!!dth && dth >= config.licensePrice);
export const hasEnoughEthToAddShop = ({ eth }) => (!!eth && eth >= config.gasPrice.simpleTransac);

/**
 * hasEnoughMoneyToAddShop
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasEnoughMoneyToAddShop = ({ balance }) =>
  hasBalance({ balance }) && hasEnoughDthToAddShop(balance) && hasEnoughEthToAddShop(balance);

/**
 * hasEnougthMoneyToRemoveShop
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasEnougthMoneyToRemoveShop = ({ balance }) =>
  hasBalance({ balance }) && balance.eth >= config.gasPrice.simpleTransac;

export default userReducer;
