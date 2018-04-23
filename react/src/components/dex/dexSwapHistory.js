import React from 'react';
import { connect } from 'react-redux';
import translate from '../../translate/translate';
import DexSwapsTable from './table/dexSwapsTable';

class DexSwapHistory extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  renderSwapHistory() {
    const _swaps = this.props.Dex.swaps.swaps;
    let _items = [];

    for (let i = 0; i < _swaps.length; i++) {
      _items.push(
        <li className="orders-item">
          <div className="orders-item-wrapper">
            <div className="orders-item-details">
              <div className="orders-item-details-coins">
                <section className="orders-item-details-coin KMD">
                  <span className="orders-item-details-coin-amount">
                    0.00397501
                  </span>
                  <div className="orders-item-details-coin-icon coin-colorized">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.8 226.8" width="24" height="24" fill="currentColor">
                      <path d="M113.4 0C50.8 0 0 50.8 0 113.4s50.8 113.4 113.4 113.4S226.8 176 226.8 113.4 176 0 113.4 0zm54.991 164.274l-3.878 3.878c-17.035 7.13-34.055 14.299-51.113 21.374-17.058-7.074-34.078-14.243-51.113-21.374l-3.878-3.878-21.142-50.879 21.142-50.879 3.878-3.878c11.93-4.994 23.858-9.997 35.792-14.982l9.842-4.12 2.725-1.13 2.754-1.141 2.753 1.141 2.725 1.13 9.842 4.12c11.934 4.985 23.862 9.988 35.792 14.982l3.878 3.878 21.142 50.879-21.141 50.879z"></path>
                      <path d="M113.4 68.322L81.528 81.524l-13.202 31.871 13.202 31.872 31.872 13.202 31.871-13.202 13.202-31.872-13.202-31.871L113.4 68.322zm22.536 67.61l-22.537 9.336-22.536-9.336-9.335-22.536 9.335-22.536 22.536-9.336 22.537 9.336 9.335 22.536-9.335 22.536z"></path>
                    </svg>
                  </div>
                </section>
                <div className="orders-item-details-type">
                  <span className="orders-item-details-type-label">finished</span>
                  <i className="orders-item-details-coins-tradeType">
                    <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9 c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1 c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5 H399V448l81-81.4l-81-83.2V330.4z"></path>
                    </svg>
                  </i>
                </div>
                <section className="orders-item-details-coin MNZ">
                  <div className="orders-item-details-coin-icon coin-colorized">
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
                  <span className="orders-item-details-coin-amount">
                   0.03048882
                  </span>
                </section>
              </div>
            </div>
          </div>
        </li>
      );
    }

    return (
      <section className="balance-action">
        <ul className="orders-list singleColumn noHover">
          { _items }
        </ul>
      </section>
    );
  }

/*
        <ul className="orders-list singleColumn noHover">
          <li className="orders-item">
            <div className="orders-item-wrapper">
              <div className="orders-item-details">
                <div className="orders-item-details-coins">
                  <section className="orders-item-details-coin KMD">
                    <span className="orders-item-details-coin-amount">
                      0.00397501
                    </span>
                    <div className="orders-item-details-coin-icon coin-colorized">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.8 226.8" width="24" height="24" fill="currentColor">
                        <path d="M113.4 0C50.8 0 0 50.8 0 113.4s50.8 113.4 113.4 113.4S226.8 176 226.8 113.4 176 0 113.4 0zm54.991 164.274l-3.878 3.878c-17.035 7.13-34.055 14.299-51.113 21.374-17.058-7.074-34.078-14.243-51.113-21.374l-3.878-3.878-21.142-50.879 21.142-50.879 3.878-3.878c11.93-4.994 23.858-9.997 35.792-14.982l9.842-4.12 2.725-1.13 2.754-1.141 2.753 1.141 2.725 1.13 9.842 4.12c11.934 4.985 23.862 9.988 35.792 14.982l3.878 3.878 21.142 50.879-21.141 50.879z"></path>
                        <path d="M113.4 68.322L81.528 81.524l-13.202 31.871 13.202 31.872 31.872 13.202 31.871-13.202 13.202-31.872-13.202-31.871L113.4 68.322zm22.536 67.61l-22.537 9.336-22.536-9.336-9.335-22.536 9.335-22.536 22.536-9.336 22.537 9.336 9.335 22.536-9.335 22.536z"></path>
                      </svg>
                    </div>
                  </section>
                  <div className="orders-item-details-type">
                    <span className="orders-item-details-type-label">finished</span>
                    <i className="orders-item-details-coins-tradeType">
                      <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9 c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1 c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5 H399V448l81-81.4l-81-83.2V330.4z"></path>
                      </svg>
                    </i>
                  </div>
                  <section className="orders-item-details-coin MNZ">
                    <div className="orders-item-details-coin-icon coin-colorized">
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
                    <span className="orders-item-details-coin-amount">
                     0.03048882
                    </span>
                  </section>
                </div>
              </div>
            </div>
          </li>
        </ul>
*/

  render() {
    return (
      <section className="balance-action">
        <DexSwapsTable />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Dex: state.Dex,
  };
};

export default connect(mapStateToProps)(DexSwapHistory);
