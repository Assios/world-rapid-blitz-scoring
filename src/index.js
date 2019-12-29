import React from "react";
import ReactDOM from "react-dom";
import Table from "./table.js";
import rapid from "./data/results_rapid.json";
import blitz from "./data/results_blitz.json";

import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], w: 1, d: 0.5, l: 0, tc: "rapid" };

    this.handleClassicalWinChange = this.handleClassicalWinChange.bind(this);
    this.handleClassicalDrawChange = this.handleClassicalDrawChange.bind(this);
    this.handleClassicalLossesChange = this.handleClassicalLossesChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTimeControlSelectChange = this.handleTimeControlSelectChange.bind(this);
  }

  componentDidMount() {
    if (this.state.tc === "blitz") {
      this.setState({players: blitz});
    } else {
      this.setState({players: rapid});      
    }
  }

  handleClassicalWinChange(event) {
    this.setState({ w: event.target.value });
  }

  handleClassicalDrawChange(event) {
    this.setState({ d: event.target.value });
  }

  handleClassicalLossesChange(event) {
    this.setState({ l: event.target.value });
  }

  handleSelectChange(event) {
    switch(event.target.value) {
      case "regular":
        this.setState({ w: 1, d: 0.5, l: 0});
        break;
      case "football":
        this.setState({ w: 3, d: 1, l: 0 });
        break;
    }
  }

  handleTimeControlSelectChange(event) {
    switch(event.target.value) {
      case "blitz":
        this.setState({...this.state, tc: "blitz", players: blitz});
        break;
      case "rapid":
        this.setState({...this.state, tc: "rapid", players: rapid});
        break;
    }
  }

  render() {
    const title = this.state.tc === "blitz" ? "World Blitz Championship 2019" : "World Rapid Championship 2019";
    const updatedText = this.state.tc === "blitz" ? "Updated after round 12" : "Updated after the final round";

    const p = this.state.players.map(function(player) {
      return {
        ...player,
        score:
        player.wins * this.state.w +
        player.draws * this.state.d +
        player.losses * this.state.l
      };
    }, this).
    sort((a, b) => b.score - a.score);

    return (
      <div className="wrapper">
        <h3>{title} <span className="badge badge-secondary">{updatedText}</span></h3>
        <div className="form-inline">
          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for win</div>
            </div>
            <input type="number" className="form-control" value={this.state.w} onChange={this.handleClassicalWinChange} />
          </div>

          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for draw</div>
            </div>
            <input type="number" className="form-control" value={this.state.d} onChange={this.handleClassicalDrawChange} />
          </div>

          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for loss</div>
            </div>
            <input type="number" className="form-control" value={this.state.l} onChange={this.handleClassicalLossesChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"><b>Time control</b></label>
          <div className="col-sm-4">
            <select className="form-control mb-2 mr-sm-2" onChange={this.handleTimeControlSelectChange}>
              <option value="rapid">Rapid</option>
              <option value="blitz">Blitz</option>
            </select>
          </div>
          </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"><b>Scoring preset</b></label>
          <div className="col-sm-4">
            <select className="form-control mb-2 mr-sm-2" onChange={this.handleSelectChange}>
              <option value="regular">Regular</option>
              <option value="football">Football</option>
            </select>
          </div>
    </div>
        <Table players={p} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
