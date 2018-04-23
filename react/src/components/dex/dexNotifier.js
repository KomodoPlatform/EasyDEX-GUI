import React from 'react';
import translate from '../../translate/translate';

class DexNotifier extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  // states, append to class notifier
  // 'notifier-error': errors.length > 0,
  // 'notifier-critical': this.state.isCritical

  render() {
    return (
      <div className="notifier">
        <div className="notifier-title">
          <i className="notifier-title-icon">
            <svg style={{ enableBackground: 'new 0 0 48 48' }} version="1.1" viewBox="0 0 48 48">
              <g className="st0" id="Padding__x26__Artboard"></g>
              <g id="Icons">
                <g>
                  <g>
                    <circle className="st1-angry" cx="24" cy="24" r="12.244"></circle>
                  </g>
                  <g>
                    <path className="st1-angry" d="M15.15215,24.5226c0,0,2.00649,1.63687,6.99631,1.58407"></path>
                    <path className="st2-angry" d="M19.50464,25.96163c0.17131,0.19669,0.27283,0.45049,0.27283,0.72332 c0,0.62815-0.50125,1.1294-1.12939,1.1294c-0.6218,0-1.1294-0.50125-1.1294-1.1294c0-0.41876,0.22842-0.78042,0.57104-0.97077 l0.47932,0.09953C18.56904,25.81371,19.43601,25.95249,19.50464,25.96163z"></path>
                    <path className="st1-angry" d="M32.84785,24.5226c0,0-2.00649,1.63687-6.99631,1.58407"></path>
                    <path className="st2-angry" d="M29.91028,25.71417c0.34262,0.19035,0.57104,0.55201,0.57104,0.97077 c0,0.62815-0.50759,1.1294-1.1294,1.1294c-0.62815,0-1.12939-0.50125-1.12939-1.1294c0-0.27283,0.10152-0.52663,0.27283-0.72332 L29.91028,25.71417z"></path>
                    <ellipse className="st2-angry" cx="24.12855" cy="30.68728" rx="3.48496" ry="0.48842"></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </i>
          <h1 className="notifier-title-text">{ this.state.isCritical ? 'That\'s bad!' : 'Sorry!'}</h1>
        </div>
        <ul className="notifier-items">
          <span>Errors here</span>
          <small className="notifier-appversion">version 1.3.5</small>
          <button className="notifier-close">OK / Retry</button>
        </ul>
      </div>
    );
  }
}

export default DexNotifier;