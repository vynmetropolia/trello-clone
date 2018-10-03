import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, } from 'react-beautiful-dnd';

import AddColumn from 'Column/components/AddColumn';
import {history, paths,} from 'utils/routes';

class BoardView extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    boardView: PropTypes.object,
    fetchAllBoards: PropTypes.func,
    setBoardView: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.boardView && !this.props.boardsList.length && nextProps.boardsList.length) {
      for (let i = 0; i < nextProps.boardsList.length; i++) {
        if (nextProps.boardsList[i].id === this.props.match.params.board_id) {
          this.props.setBoardView(nextProps.boardsList[i]);
          break;
        }
      }
    }
    return true;
  }

  componentDidMount() {
    if (!this.props.boardView) {
      this.props.fetchAllBoards();
    }
  }

  onDragEnd = () => {}

  render() {
    const {boardView,} = this.props;

    if (!boardView) {
      return null;
    }
    return (
      <div className='board-view'>
        <button onClick={() => {history.push(paths.allBoard);}}>View all boards</button>
        <h4>{boardView.name}</h4>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='board-wrapper'>
            {boardView.columns && boardView.columns.map((column, index) => (
              <div key={index}>{ column.name }</div>
            ))}
            <AddColumn />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default BoardView;
