import React from "react";

const TableRow = ({ row, rowNumber, showRegularRank }) => (
  <tr>
    <th scope="row">{rowNumber} {showRegularRank ? <span style={{fontWeight: "normal", fontStyle: "italic"}}>({row.rank})</span> : null}</th>
    <td>{row.name}</td>
    <td><b>{row.score}</b></td>
    <td>{row.wins}</td>
    <td>{row.draws}</td>
    <td>{row.losses}</td>
  </tr>
);

class Table extends React.Component {
  render() {
    let showRegularRank = false;

    if (!(this.props.w == 1 && this.props.d == 0.5 && this.props.l == 0)) {
      showRegularRank = true;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col" title="Classical wins">Wins</th>
            <th scope="col" title="Classical draws">Draws</th>
            <th scope="col" title="Classical losses">Losses</th>
          </tr>
        </thead>
        <tbody>
          {this.props.players.map((item, key) => (
            <TableRow key={key} row={item} rowNumber={key + 1} showRegularRank={showRegularRank} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
