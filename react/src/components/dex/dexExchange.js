import React from 'react';
import translate from '../../translate/translate';

class DexExchange extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  // copy orders render from dexSwapHistory

  renderWallet() {
    return (
      <div className="trade trade-wallet">
        <section className="trade-body">
          <ul className="trade-type">
            <li className="trade-type-item trade-type-item-buy">
              <button>
                <div>
                  <i>
                    <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                      <path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9 c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1 c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5 H399V448l81-81.4l-81-83.2V330.4z"></path>
                    </svg>
                  </i>
                  <small>Exchange</small>
                </div>
              </button>
            </li>
            <li className="trade-type-item trade-type-item-wallet">
              <button>
                <div>
                  <i>
                    <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                      <path d="M10,4H6C4.895,4,4,4.895,4,6v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2V6C12,4.895,11.105,4,10,4z M10,10H6V6h4V10z M9,9 H7V7h2V9z"></path>
                      <path d="M10,18H6c-1.105,0-2,0.895-2,2v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2v-4C12,18.895,11.105,18,10,18z M10,24H6v-4h4 V24z M9,23H7v-2h2V23z"></path>
                      <path d="M24,4h-4c-1.105,0-2,0.895-2,2v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M24,10h-4V6h4V10z M23,9h-2V7h2V9z"></path>
                      <rect height="2" width="2" x="14" y="6"></rect>
                      <rect height="2" width="2" x="14" y="10"></rect>
                      <rect height="2" width="2" x="14" y="14"></rect>
                      <rect height="2" width="2" x="10" y="14"></rect>
                      <rect height="2" width="2" x="6" y="14"></rect>
                      <rect height="2" width="2" x="18" y="14"></rect>
                      <rect height="2" width="2" x="22" y="14"></rect>
                      <rect height="2" width="2" x="16" y="16"></rect>
                      <rect height="2" width="2" x="20" y="16"></rect>
                      <rect height="2" width="2" x="18" y="18"></rect>
                      <rect height="2" width="2" x="14" y="18"></rect>
                      <rect height="2" width="2" x="16" y="20"></rect>
                      <rect height="2" width="2" x="18" y="22"></rect>
                      <rect height="2" width="2" x="16" y="24"></rect>
                      <rect height="2" width="2" x="24" y="16"></rect>
                      <rect height="2" width="2" x="24" y="20"></rect>
                      <rect height="2" width="2" x="20" y="20"></rect>
                      <rect height="2" width="2" x="20" y="24"></rect>
                      <rect height="2" width="2" x="22" y="22"></rect>
                      <rect height="2" width="2" x="22" y="18"></rect>
                      <rect height="2" width="2" x="14" y="22"></rect>
                    </svg>
                  </i>
                  <small>Wallet</small>
                </div>
              </button>
            </li>
            <li className="trade-type-item trade-type-item-orders">
              <button>
                <div>
                  <i>
                    <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                      <path d="M7,22 V4h18v18c0,2.209-1.791,4-4,4" style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}></path>
                      <path d="M17,22 L17,22H4l0,0c0,2.209,1.791,4,4,4h13C18.791,26,17,24.209,17,22z" style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}></path>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="13" y2="13"></line>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="13" y2="13"></line>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="17" y2="17"></line>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="17" y2="17"></line>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="9" y2="9"></line>
                      <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="9" y2="9"></line>
                      <path d="M17,22L17,22H4l0,0c0,2.209,1.791,4,4,4h13C18.791,26,17,24.209,17,22z"></path>
                    </svg>
                  </i>
                  <small>Orders</small>
                </div>
              </button>
            </li>
          </ul>
          <section className="balance-action">
            <section className="balance-deposit">
              <div className="balance-deposit-body KMD">
                <section className="balance-qr">
                  <canvas height="124" width="124" style={{ height: '124px', width: '124px' }}></canvas>
                </section>
                <section className="balance-deposit-address">
                  <span className="label"><strong className="label-title">Your smartaddress</strong></span>
                  <button className="Clipboard action lefttext normaltext dark">
                    <span>RDbGxL8QYdEp8sMULaVZS2E6XThcTKT9Jd</span>
                    <i className="Clipboard-icon">
                      <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                        <g>
                          <polygon points="304,96 288,96 288,176 368,176 368,160 304,160 "></polygon>
                          <path d="M325.3,64H160v48h-48v336h240v-48h48V139L325.3,64z M336,432H128V128h32v272h176V432z M384,384H176V80h142.7l65.3,65.6V384 z"></path>
                        </g>
                      </svg>
                    </i>
                  </button>
                </section>
              </div>
            </section>
            <div className="deposit-withdraw">
              <section className="trade-amount_input_address">
                <span className="label"><strong className="label-title">Withdraw to</strong></span>
                <div className="trade-amount_input-wrapper"><input type="text" name="form-amount" placeholder="address" value="" style={{ fontSize: '18px' }} /></div>
              </section>
              <section className="trade-amount_input_amount">
                <span className="label"><strong className="label-title">Amount</strong></span>
                <div className="trade-amount_input-wrapper"><input type="number" step="any" min="0" name="form-amount" placeholder="0.00" value="0" style={{ fontSize: '18px' }} /><button className="trade-setMax">Max</button></div>
              </section>
              <section className="trade-button-wrapper KMD">
                <button className="trade-button withBorder action primary coin-bg" disabled="">
                  <div className="trade-action-amountRel">
                    <small className="trade-action-amountRel-title">
                      VALIDATION
                    </small>
                    enter amount to continue
                  </div>
                  <i>
                    <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                      <polygon points="28,15 18,15 5.338,12.885 4,11 4,5 6.994,3.266 27.391,14.079 "></polygon>
                      <circle cx="27" cy="15" r="1"></circle>
                      <circle cx="6" cy="11" r="2"></circle>
                      <circle cx="6" cy="5" r="2"></circle>
                      <polygon points="28,15 18,15 5.338,17.115 4,19 4,25 6.994,26.734 27.391,15.921 "></polygon>
                      <circle cx="6" cy="19" r="2"></circle>
                      <circle cx="6" cy="25" r="2"></circle>
                    </svg>
                  </i>
                </button>
              </section>
            </div>
          </section>
        </section>
      </div>
    );
  }

  render() {
    return (
      <section className="wallet-wrapper">
        <section className="wallet wallet-ready">
          <header className="wallet-wallets-header component-header component-header-centered component-header-withBack">
            <a className="wallet-wallets-header-back action primary right dark" href="#/">
              <i className="wallet-wallets-list-item_action">
                <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                  <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                </svg>
              </i>
            </a>
            <h2 className="KMD">
              <div className="wallet-icon coin-colorized">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.8 226.8" width="24" height="24" fill="currentColor">
                  <path d="M113.4 0C50.8 0 0 50.8 0 113.4s50.8 113.4 113.4 113.4S226.8 176 226.8 113.4 176 0 113.4 0zm54.991 164.274l-3.878 3.878c-17.035 7.13-34.055 14.299-51.113 21.374-17.058-7.074-34.078-14.243-51.113-21.374l-3.878-3.878-21.142-50.879 21.142-50.879 3.878-3.878c11.93-4.994 23.858-9.997 35.792-14.982l9.842-4.12 2.725-1.13 2.754-1.141 2.753 1.141 2.725 1.13 9.842 4.12c11.934 4.985 23.862 9.988 35.792 14.982l3.878 3.878 21.142 50.879-21.141 50.879z"></path>
                  <path d="M113.4 68.322L81.528 81.524l-13.202 31.871 13.202 31.872 31.872 13.202 31.871-13.202 13.202-31.872-13.202-31.871L113.4 68.322zm22.536 67.61l-22.537 9.336-22.536-9.336-9.335-22.536 9.335-22.536 22.536-9.336 22.537 9.336 9.335 22.536-9.335 22.536z"></path>
                </svg>
              </div>
              <div className="wallet-coinName">Komodo</div>
              <div className="wallet-balance">10.87586947 KMD</div>
            </h2>
          </header>
          <section className="wallet-trade">
            <div className="wallet-exchange">
              { /* toggle, trade-wallet, trade-orders */}
              <div className="trade trade-buy">
                <section className="trade-body">
                  <ul className="trade-type">
                    <li className="trade-type-item trade-type-item-buy">
                      <button>
                        <div>
                          <i>
                            <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                              <path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9 c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1 c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5 H399V448l81-81.4l-81-83.2V330.4z"></path>
                            </svg>
                          </i>
                          <small>Exchange</small>
                        </div>
                      </button>
                    </li>
                    <li className="trade-type-item trade-type-item-wallet">
                      <button>
                        <div>
                          <i>
                            <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                              <path d="M10,4H6C4.895,4,4,4.895,4,6v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2V6C12,4.895,11.105,4,10,4z M10,10H6V6h4V10z M9,9 H7V7h2V9z"></path>
                              <path d="M10,18H6c-1.105,0-2,0.895-2,2v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2v-4C12,18.895,11.105,18,10,18z M10,24H6v-4h4 V24z M9,23H7v-2h2V23z"></path>
                              <path d="M24,4h-4c-1.105,0-2,0.895-2,2v4c0,1.105,0.895,2,2,2h4c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M24,10h-4V6h4V10z M23,9h-2V7h2V9z"></path>
                              <rect height="2" width="2" x="14" y="6"></rect>
                              <rect height="2" width="2" x="14" y="10"></rect>
                              <rect height="2" width="2" x="14" y="14"></rect>
                              <rect height="2" width="2" x="10" y="14"></rect>
                              <rect height="2" width="2" x="6" y="14"></rect>
                              <rect height="2" width="2" x="18" y="14"></rect>
                              <rect height="2" width="2" x="22" y="14"></rect>
                              <rect height="2" width="2" x="16" y="16"></rect>
                              <rect height="2" width="2" x="20" y="16"></rect>
                              <rect height="2" width="2" x="18" y="18"></rect>
                              <rect height="2" width="2" x="14" y="18"></rect>
                              <rect height="2" width="2" x="16" y="20"></rect>
                              <rect height="2" width="2" x="18" y="22"></rect>
                              <rect height="2" width="2" x="16" y="24"></rect>
                              <rect height="2" width="2" x="24" y="16"></rect>
                              <rect height="2" width="2" x="24" y="20"></rect>
                              <rect height="2" width="2" x="20" y="20"></rect>
                              <rect height="2" width="2" x="20" y="24"></rect>
                              <rect height="2" width="2" x="22" y="22"></rect>
                              <rect height="2" width="2" x="22" y="18"></rect>
                              <rect height="2" width="2" x="14" y="22"></rect>
                            </svg>
                          </i>
                          <small>Wallet</small>
                        </div>
                      </button>
                    </li>
                    <li className="trade-type-item trade-type-item-orders">
                      <button>
                        <div>
                          <i>
                            <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                              <path d="M7,22 V4h18v18c0,2.209-1.791,4-4,4" style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}></path>
                              <path d="M17,22 L17,22H4l0,0c0,2.209,1.791,4,4,4h13C18.791,26,17,24.209,17,22z" style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}></path>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="13" y2="13"></line>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="13" y2="13"></line>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="17" y2="17"></line>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="17" y2="17"></line>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="15" x2="21" y1="9" y2="9"></line>
                              <line style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="11" x2="13" y1="9" y2="9"></line>
                              <path d="M17,22L17,22H4l0,0c0,2.209,1.791,4,4,4h13C18.791,26,17,24.209,17,22z"></path>
                            </svg>
                          </i>
                          <small>Orders</small>
                        </div>
                      </button>
                    </li>
                  </ul>
                  <section className="trade-action">
                    <section className="trade-action-wrapper">
                      <div className="trade-amount">
                        <section className="trade-amount_input">
                          <section className="trade-amount_input_price">
                            <span className="label"><strong className="label-title">Price</strong></span>
                            <div className="trade-amount_input-wrapper">
                              <input type="number" step="any" min="0" name="form-price" placeholder="0.00" value="0" style={{ fontSize: '18px' }} />
                              <section className="modal modal-open">
                                <header className="modal-header">
                                  <h1></h1>
                                  <button className="modal-btn-close withBorder">
                                    <i className="modal-btn-close-icon">
                                      <svg style={{ enableBackground: 'new 0 0 32 32' }} id="Layer_1" version="1.1" viewBox="0 0 32 32">
                                        <g>
                                          <polyline fill="none" points=" 649,137.999 675,137.999 675,155.999 661,155.999 " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                          <polyline fill="none" points=" 653,155.999 649,155.999 649,141.999 " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                          <polyline fill="none" points=" 661,156 653,162 653,156 " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                        </g>
                                        <g>
                                          <path d="M11.312,12.766c0.194,0.195,0.449,0.292,0.704,0.292c0.255,0,0.51-0.097,0.704-0.292c0.389-0.389,0.389-1.02,0-1.409 L4.755,3.384c-0.389-0.389-1.019-0.389-1.408,0s-0.389,1.02,0,1.409L11.312,12.766z"></path>
                                          <path d="M17.407,16.048L28.652,4.793c0.389-0.389,0.389-1.02,0-1.409c-0.389-0.389-1.019-0.561-1.408-0.171L15.296,15 c0,0-0.296,0-0.296,0s0,0.345,0,0.345L3.2,27.303c-0.389,0.389-0.315,1.02,0.073,1.409c0.194,0.195,0.486,0.292,0.741,0.292 s0.528-0.097,0.722-0.292L15.99,17.458l11.249,11.255c0.194,0.195,0.452,0.292,0.706,0.292s0.511-0.097,0.705-0.292 c0.389-0.389,0.39-1.02,0.001-1.409L17.407,16.048z"></path>
                                        </g>
                                      </svg>
                                    </i>
                                  </button>
                                </header>
                              { /* to toggle set class to modal-content-overlay modal-display-content */}
                                <content className="modal-content">
                                  <button className="action noTransformTranslate arrow-down">
                                    <span className="MNZ">
                                      <span className="trade-base-icon coin-colorized">
                                        <i className="coin-icon-svg MNZ">
                                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 148 50' }}>
                                            <g>
                                              <path className="st1" d="M15.9,17.9"></path>
                                              <path d="M39.9,34.5c-0.2-1.2-0.6-2.4-0.9-3.5c-0.3-1.2-0.6-2.4-0.9-3.6c-0.8-3-1.6-6-2.4-9c-0.2-0.7-0.3-1.4-0.5-2.1 c-0.1-0.3-0.2-0.7-0.5-0.9c-0.3-0.1-0.6-0.1-0.9-0.1c-0.4,0-0.8,0-1.2,0c-0.8,0-1.7,0-2.5,0c-0.6,0-1.1,0-1.7,0.1 c-0.5,0.1-1,0.4-1.2,0.9c-0.1,0.2,0,0.5,0.2,0.6c0.1,0.1,0.3,0,0.4-0.1c0.1,0,0.4-0.3,0.5-0.3l4.7,17.3l0,0c0,0,0,0.1,0,0.1 c0.1,0.4,0.3,0.8,0.6,0.9c0.2,0.1,0.4,0.2,0.7,0.2h0.5h0.8h2.4h1.3C39.6,35.1,40,34.9,39.9,34.5z"></path>
                                              <path d="M28.3,34.5c-0.2-1.2-0.6-2.4-0.9-3.5c-0.3-1.2-0.6-2.4-0.9-3.6c-0.8-3-1.6-6-2.4-9c-0.2-0.7-0.3-1.4-0.5-2.1 c-0.1-0.3-0.2-0.7-0.5-0.9c-0.3-0.1-0.6-0.1-0.9-0.1c-0.4,0-0.8,0-1.2,0c-0.8,0-1.7,0-2.5,0c-0.6,0-1.1,0-1.7,0.1 c-0.5,0.1-1,0.4-1.2,0.9c-0.1,0.2,0,0.5,0.2,0.6c0.1,0.1,0.3,0,0.4-0.1c0.1,0,0.4-0.3,0.5-0.3l4.7,17.3l0,0c0,0,0,0.1,0,0.1 c0.1,0.4,0.3,0.8,0.6,0.9c0.2,0.1,0.4,0.2,0.7,0.2h0.5h0.8h2.4h1.3C28,35.1,28.4,34.9,28.3,34.5z"></path>
                                              <path d="M19.1,30.7l-3.2-12.5h0c0-0.2-0.2-0.4-0.5-0.4c-0.2,0-0.4,0.2-0.5,0.4l0,0L10.7,34l0,0c0,0.1,0,0.2,0,0.2 c0,0.5,0.4,1,1,1H17c0.4,0,0.8-0.3,0.9-0.7l0,0L19.1,30.7z"></path>
                                              <path d="M30.9,30.4l-3.5-12.6h0c0-0.2-0.2-0.3-0.4-0.3c-0.2,0-0.4,0.1-0.4,0.3h0l-0.7,2.5l3.5,12.2l0,0l0,0 c0.1,0.2,0.2,0.3,0.4,0.3c0.2,0,0.3-0.1,0.4-0.3l0,0L30.9,30.4z"></path>
                                            </g>
                                          </svg>
                                        </i>
                                      </span>
                                      <strong>Monaize</strong>
                                    </span>
                                    <i>
                                      <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                                        <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                                      </svg>
                                    </i>
                                  </button>
                                  <div className="modal-content-overlay">
                                    <ul className="coinList-list singleColumn coin-colorized-reset">
                                      <li className="coinList-coin MNZ">
                                        <div className="coinList-coin_icon coin-colorized">
                                          <i className="coin-icon-svg MNZ">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 148 50' }}>
                                              <g>
                                                <path className="st1" d="M15.9,17.9"></path>
                                                <path d="M39.9,34.5c-0.2-1.2-0.6-2.4-0.9-3.5c-0.3-1.2-0.6-2.4-0.9-3.6c-0.8-3-1.6-6-2.4-9c-0.2-0.7-0.3-1.4-0.5-2.1 c-0.1-0.3-0.2-0.7-0.5-0.9c-0.3-0.1-0.6-0.1-0.9-0.1c-0.4,0-0.8,0-1.2,0c-0.8,0-1.7,0-2.5,0c-0.6,0-1.1,0-1.7,0.1 c-0.5,0.1-1,0.4-1.2,0.9c-0.1,0.2,0,0.5,0.2,0.6c0.1,0.1,0.3,0,0.4-0.1c0.1,0,0.4-0.3,0.5-0.3l4.7,17.3l0,0c0,0,0,0.1,0,0.1 c0.1,0.4,0.3,0.8,0.6,0.9c0.2,0.1,0.4,0.2,0.7,0.2h0.5h0.8h2.4h1.3C39.6,35.1,40,34.9,39.9,34.5z"></path>
                                                <path d="M28.3,34.5c-0.2-1.2-0.6-2.4-0.9-3.5c-0.3-1.2-0.6-2.4-0.9-3.6c-0.8-3-1.6-6-2.4-9c-0.2-0.7-0.3-1.4-0.5-2.1 c-0.1-0.3-0.2-0.7-0.5-0.9c-0.3-0.1-0.6-0.1-0.9-0.1c-0.4,0-0.8,0-1.2,0c-0.8,0-1.7,0-2.5,0c-0.6,0-1.1,0-1.7,0.1 c-0.5,0.1-1,0.4-1.2,0.9c-0.1,0.2,0,0.5,0.2,0.6c0.1,0.1,0.3,0,0.4-0.1c0.1,0,0.4-0.3,0.5-0.3l4.7,17.3l0,0c0,0,0,0.1,0,0.1 c0.1,0.4,0.3,0.8,0.6,0.9c0.2,0.1,0.4,0.2,0.7,0.2h0.5h0.8h2.4h1.3C28,35.1,28.4,34.9,28.3,34.5z"></path>
                                                <path d="M19.1,30.7l-3.2-12.5h0c0-0.2-0.2-0.4-0.5-0.4c-0.2,0-0.4,0.2-0.5,0.4l0,0L10.7,34l0,0c0,0.1,0,0.2,0,0.2 c0,0.5,0.4,1,1,1H17c0.4,0,0.8-0.3,0.9-0.7l0,0L19.1,30.7z"></path>
                                                <path d="M30.9,30.4l-3.5-12.6h0c0-0.2-0.2-0.3-0.4-0.3c-0.2,0-0.4,0.1-0.4,0.3h0l-0.7,2.5l3.5,12.2l0,0l0,0 c0.1,0.2,0.2,0.3,0.4,0.3c0.2,0,0.3-0.1,0.4-0.3l0,0L30.9,30.4z"></path>
                                              </g>
                                            </svg>
                                          </i>
                                        </div>
                                        <div className="coinList-coin_balance"><strong className="coinList-coin_name">Monaize</strong><small>20.35808051 MNZ</small></div>
                                        <span className="coinList-coin_action">
                                          <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                                            <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                                          </svg>
                                        </span>
                                        <span className="coinList-coin_action_loader">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-flickr" style={{ background: 'none' }}>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx2}}" cy="50" ng-attr-fill="{{config.c2}}" ng-attr-r="{{config.radius}}" cx="48.6667" fill="#000" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="0s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                              <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" ng-attr-dur="{{config.speed}}s" repeatCount="indefinite" dur="2s"></animate>
                                            </circle>
                                          </svg>
                                        </span>
                                      </li>
                                      <li className="coinList-coin REVS">
                                        <div className="coinList-coin_icon coin-colorized">
                                          <i className="coin-icon-placeholder REVS">R</i>
                                        </div>
                                        <div className="coinList-coin_balance"><strong className="coinList-coin_name">REVS</strong><small>1.29442594 REVS</small></div>
                                        <span className="coinList-coin_action">
                                          <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                                            <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                                          </svg>
                                        </span>
                                        <span className="coinList-coin_action_loader">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-flickr" style={{ background: 'none' }}>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx2}}" cy="50" ng-attr-fill="{{config.c2}}" ng-attr-r="{{config.radius}}" cx="48.6667" fill="#000" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="0s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                              <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" ng-attr-dur="{{config.speed}}s" repeatCount="indefinite" dur="2s"></animate>
                                            </circle>
                                          </svg>
                                        </span>
                                      </li>
                                      <li className="coinList-coin JUMBLR">
                                        <div className="coinList-coin_icon coin-colorized">
                                          <i className="coin-icon-placeholder JUMBLR">J</i>
                                        </div>
                                        <div className="coinList-coin_balance"><strong className="coinList-coin_name">JUMBLR</strong><small>0.00 JUMBLR</small></div>
                                        <span className="coinList-coin_action">
                                          <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                                            <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                                          </svg>
                                        </span>
                                        <span className="coinList-coin_action_loader">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-flickr" style={{ background: 'none' }}>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx2}}" cy="50" ng-attr-fill="{{config.c2}}" ng-attr-r="{{config.radius}}" cx="48.6667" fill="#000" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="0s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                              <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" ng-attr-dur="{{config.speed}}s" repeatCount="indefinite" dur="2s"></animate>
                                            </circle>
                                          </svg>
                                        </span>
                                      </li>
                                      <li className="coinList-coin BTC">
                                        <div className="coinList-coin_icon coin-colorized">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 226.777 226.777" fill="currentColor">
                                            <path d="M135.715 122.244c-2.614-1.31-8.437-3.074-15.368-3.533-6.934-.458-15.828 0-15.828 0v30.02s9.287.198 15.503-.26c6.21-.458 12.621-2.027 15.826-3.795 3.203-1.766 7.063-4.513 7.063-11.379 0-6.869-4.579-9.745-7.196-11.053zm-19.555-17.465c5.104-.197 10.532-1.373 14.453-3.532 3.925-2.158 6.148-5.557 6.02-10.66-.134-5.102-3.532-9.418-9.287-11.186-5.757-1.766-9.613-1.897-13.998-1.962-4.382-.064-8.83.328-8.83.328v27.012c.001 0 6.541.197 11.642 0z"></path>
                                            <path d="M113.413 0C50.777 0 0 50.776 0 113.413c0 62.636 50.777 113.413 113.413 113.413s113.411-50.777 113.411-113.413C226.824 50.776 176.049 0 113.413 0zm46.178 156.777c-8.44 5.887-17.465 6.935-21.455 7.456-1.969.259-5.342.532-8.959.744v22.738h-13.998v-22.37h-10.66v22.37H90.522v-22.37H62.987l2.877-16.812h8.371c2.814 0 3.989-.261 5.166-1.372 1.177-1.113 1.439-2.812 1.439-4.188V85.057c0-3.628-.295-4.61-1.963-6.473-1.668-1.867-5.591-2.112-7.8-2.112h-8.091V61.939h27.535V39.505h13.996v22.434h10.66V39.505h13.998v22.703c10.435.647 18.203 2.635 24.983 7.645 8.766 6.475 8.306 17.724 8.11 20.406-.195 2.682-1.372 7.85-3.729 11.183-2.352 3.337-8.108 6.673-8.108 6.673s6.801 1.438 11.578 5.036c4.771 3.598 8.307 9.941 8.106 19.229-.192 9.288-2.088 18.511-10.524 24.397z"></path>
                                          </svg>
                                        </div>
                                        <div className="coinList-coin_balance"><strong className="coinList-coin_name">Bitcoin</strong><small>0.002 BTC</small></div>
                                        <span className="coinList-coin_action">
                                          <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                                            <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                                          </svg>
                                        </span>
                                        <span className="coinList-coin_action_loader">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-flickr" style={{ background: 'none' }}>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx2}}" cy="50" ng-attr-fill="{{config.c2}}" ng-attr-r="{{config.radius}}" cx="48.6667" fill="#000" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="0s" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="51.3333" fill="#FFF" r="20">
                                              <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="2" begin="-1s" repeatCount="indefinite"></animate>
                                              <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" ng-attr-dur="{{config.speed}}s" repeatCount="indefinite" dur="2s"></animate>
                                            </circle>
                                          </svg>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </content>
                              </section>
                            </div>
                          </section>
                          <section className="trade-amount_input_amount">
                            <span className="label"><strong className="label-title">Amount</strong></span>
                            <div className="trade-amount_input-wrapper">
                              <input type="number" step="any" min="0" name="form-amount" placeholder="0.00" value="0" style={{ fontSize: '18px' }} />
                            </div>
                          </section>
                        </section>
                      </div>
                    </section>
                    <section className="trade-button-wrapper KMD">
                      <button className="trade-button withBorder action primary coin-bg" disabled="">
                        <div className="trade-action-amountRel">
                          <small className="trade-action-amountRel-title">
                            VALIDATION
                          </small>
                          enter amount to continue
                        </div>
                        <i>
                          <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                            <path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9 c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1 c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5 H399V448l81-81.4l-81-83.2V330.4z"></path>
                          </svg>
                        </i>
                      </button>
                    </section>
                  </section>
                </section>
              </div>
            </div>
          </section>
        </section>
        <section className="wallet-orderbooks">
          <section className="wallet-orderbooks-chart">
            <h3>no chart data</h3>
          </section>
          <section className="trade-orderbook">
            <div className="ReactTable -striped -highlight" style={{ height: '339.5px' }}>
              <div className="rt-table">
                <div className="rt-thead -header" style={{ minWidth: '600px' }}>
                  <div className="rt-tr">
                    <div className=" rt-resizable-header -sort-asc -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">asks MNZ</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Max KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Min KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Total KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Age</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">UTXOs</div>
                      <div className="rt-resizer"></div>
                    </div>
                  </div>
                </div>
                <div className="rt-tbody" style={{ minWidth: '600px' }}>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-noData">KMD/MNZ orderbook</div>
              <div className="-loading">
                <div className="-loading-inner">Loading...</div>
              </div>
            </div>
            <div className="ReactTable -striped -highlight" style={{ height: '339.5px' }}>
              <div className="rt-table">
                <div className="rt-thead -header" style={{ minWidth: '600px' }}>
                  <div className="rt-tr">
                    <div className=" rt-resizable-header -sort-asc -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">bids MNZ</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Max KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Min KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Total KMD</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">Age</div>
                      <div className="rt-resizer"></div>
                    </div>
                    <div className=" rt-resizable-header -cursor-pointer rt-th" style={{ flex: '100 0 auto', width: '100px' }}>
                      <div className="rt-resizable-header-content">UTXOs</div>
                      <div className="rt-resizer"></div>
                    </div>
                  </div>
                </div>
                <div className="rt-tbody" style={{ minWidth: '600px' }}>
                  <div className="rt-tr-group">
                    <div className="rt-tr -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>2</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.16</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          5.816<span className="depth" style={{ width: '30%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>28</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>54</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.05842712</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.024</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          2.792<span className="depth" style={{ width: '14.4017%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>49</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>43</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.13186539</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.024</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          1.456<span className="depth" style={{ width: '7.51032%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>19</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>42</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.13186539</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.016</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          1.8<span className="depth" style={{ width: '9.28473%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>24</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>43</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.13186539</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.024</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          2.152<span className="depth" style={{ width: '11.1004%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>29</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>44</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.13186539</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.024</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          2.448<span className="depth" style={{ width: '12.6272%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>27</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>37</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.13195896</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.024</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          1.12<span className="depth" style={{ width: '5.77717%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>14</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>43</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.14115095</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.016</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          0.776<span className="depth" style={{ width: '4.00275%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>3</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>33</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.18795244</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.016</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          0.264<span className="depth" style={{ width: '1.36176%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>27</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>33</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>6.18795244</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>0.016</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>
                        <span className="bids">
                          0.512<span className="depth" style={{ width: '2.64099%' }}></span>
                        </span>
                      </div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>5</div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}>31</div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -odd">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                  <div className="rt-tr-group">
                    <div className="rt-tr -padRow -even">
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                      <div className="rt-td" style={{ flex: '100 0 auto', width: '100px' }}><span>&nbsp;</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-loading">
                <div className="-loading-inner">Loading...</div>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default DexExchange;