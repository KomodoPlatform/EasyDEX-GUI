import React from 'react';
import ReactTable from 'react-table';
import TablePaginationRenderer from './pagination';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import sortByDate from '../../../util/sort';
import formatValue from '../../../util/formatValue';
import Config from '../../../config';
import { triggerToaster } from '../../../actions/actionCreators';
import Store from '../../../store';
import { secondsToString } from '../../../util/time';

const BOTTOM_BAR_DISPLAY_THRESHOLD = 15;

class DexSwapsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      filteredItemsList: [],
      itemsListColumns: this.generateItemsListColumns(),
      defaultPageSize: 20,
      pageSize: 20,
      showPagination: true,
      searchTerm: null,
      loading: false,
    };
  }

  // https://react-table.js.org/#/custom-sorting
  tableSorting(a, b) { // ugly workaround, override default sort
    if (Date.parse(a)) { // convert date to timestamp
      a = Date.parse(a);
    }
    if (Date.parse(b)) {
      b = Date.parse(b);
    }
    // force null and undefined to the bottom
    a = (a === null || a === undefined) ? -Infinity : a;
    b = (b === null || b === undefined) ? -Infinity : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
    return 0;
  }

  generateItemsListColumns(itemsCount) {
    let columns = [];
    let _col;

    _col = [{
      id: 'direction',
      Header: translate('INDEX.DIRECTION'),
      Footer: translate('INDEX.DIRECTION'),
      className: 'colum--direction',
      headerClassName: 'colum--direction',
      footerClassName: 'colum--direction',
      accessor: (item) => (item.iambob === 0) ? 'Buyer' : 'Seller',
    },
    {
      id: 'pair',
      Header: 'Pair',
      Footer: 'Pair',
      className: 'colum--pair',
      headerClassName: 'colum--pair',
      footerClassName: 'colum--pair',
      accessor: (item) => (item.iambob === 0) ? `${item.alice}/${item.bob}` : `${item.bob}/${item.alice}`,
    },
    {
      id: 'sent',
      Header: 'Sent',
      Footer: 'Sent',
      className: 'colum--sent',
      headerClassName: 'colum--sent',
      footerClassName: 'colum--sent',
      accessor: (item) => (item.iambob === 0) ? `${formatValue(parseFloat(item.values[3]) + parseFloat(item.values[6]))} ${item.alice}` : `${formatValue(parseFloat(item.values[0]) + parseFloat(item.bobtxfee))} ${item.bob}`,
    },
    {
      id: 'received',
      Header: 'Received',
      Footer: 'Recevied',
      className: 'colum--received',
      headerClassName: 'colum--received',
      footerClassName: 'colum--received',
      accessor: (item) => (item.iambob === 0) ? `${formatValue(item.srcamount)} ${item.bob}` : `${formatValue(item.values[3])} ${item.alice}`,
    },
    {
      id: 'rate',
      Header: 'Rate',
      Footer: 'Rate',
      className: 'colum--rate',
      headerClassName: 'colum--rate',
      footerClassName: 'colum--rate',
      accessor: (item) => (item.iambob === 0) ? `${formatValue(parseFloat(parseFloat(item.values[3]) + parseFloat(item.values[6])) / parseFloat(item.srcamount))} (${parseFloat(item.values[3]) + parseFloat(item.values[6])} ${item.alice} / ${item.srcamount} ${item.bob})`: `${formatValue(parseFloat(item.values[3]) / parseFloat(parseFloat(item.values[0]) + parseFloat(item.bobtxfee)))} (${formatValue(item.values[3])} ${item.bob} / ${formatValue(parseFloat(item.values[0]) + parseFloat(item.bobtxfee))} ${item.bob})`,
    },
    {
      id: 'finishtime',
      Header: translate('INDEX.TIME'),
      Footer: translate('INDEX.TIME'),
      accessor: (item) => secondsToString(item.finishtime),
    }];

    if (itemsCount <= BOTTOM_BAR_DISPLAY_THRESHOLD) {
      delete _col[0].Footer;
      delete _col[1].Footer;
      delete _col[2].Footer;
      delete _col[3].Footer;
    }

    columns.push(..._col);

    return columns;
  }

  componentWillMount() {
    if (this.props.Dex.swaps &&
        this.props.Dex.swaps.swaps) {
      const _swaps = this.props.Dex.swaps.swaps.filter(swap => swap.alice && swap.finishtime);

      this.setState({
        itemsList: _swaps,
        filteredItemsList: this.filterData(_swaps, this.state.searchTerm),
        showPagination: _swaps && _swaps.length >= this.state.defaultPageSize,
        itemsListColumns: this.generateItemsListColumns(_swaps.length),
      });
    }
  }

  componentWillReceiveProps(props) {
    console.warn('table will receive props');

    this.setState({
      itemsList: this.props.Dex.swaps.swaps,
      filteredItemsList: this.filterData(this.props.Dex.swaps.swaps, this.state.searchTerm),
      showPagination: this.props.Dex.swaps.swaps && this.props.Dex.swaps.swaps.length >= this.state.defaultPageSize,
      itemsListColumns: this.generateItemsListColumns(this.props.Dex.swaps.swaps.length),
    });

    console.warn(this.state);
  }

  onPageSizeChange(pageSize, pageIndex) {
    this.setState(Object.assign({}, this.state, {
      pageSize: pageSize,
      showPagination: this.state.itemsList && this.state.itemsList.length >= this.state.defaultPageSize,
    }))
  }

  onSearchTermChange(newSearchTerm) {
    this.setState(Object.assign({}, this.state, {
      searchTerm: newSearchTerm,
      filteredItemsList: this.filterData(this.state.itemsList, newSearchTerm),
    }));
  }

  filterData(list, searchTerm) {
    return list.filter(item => this.filterDataByProp(item, searchTerm));
  }

  filterDataByProp(item, term) {
    if (!term) {
      return true;
    }

    return this.contains(item.alice.toLowerCase(), term) ||
            this.contains(item.bob.toLowerCase(), term) ||
            this.contains(secondsToString(item.finishtime).toLowerCase(), term);
  }

  contains(value, property) {
    return (value + '').indexOf(property) !== -1;
  }

  render() {
    return (
      <div className="dex-table">
        <input
          className="form-control"
          onChange={ e => this.onSearchTermChange(e.target.value) }
          placeholder={ translate('DASHBOARD.SEARCH') } />
        <ReactTable
          data={ this.state.filteredItemsList }
          columns={ this.state.itemsListColumns }
          minRows="0"
          sortable={ true }
          className="-striped -highlight"
          PaginationComponent={ TablePaginationRenderer }
          nextText={ translate('INDEX.NEXT_PAGE') }
          previousText={ translate('INDEX.PREVIOUS_PAGE') }
          showPaginationBottom={ this.state.showPagination }
          pageSize={ this.state.pageSize }
          defaultSortMethod={ this.tableSorting }
          defaultSorted={[{ // default sort
            id: 'finishtime',
            desc: true,
          }]}
          onPageSizeChange={ (pageSize, pageIndex) => this.onPageSizeChange(pageSize, pageIndex) } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Dex: state.Dex,
  };
};

export default connect(mapStateToProps)(DexSwapsTable);