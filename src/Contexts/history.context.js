import React, {Component} from 'react';

export const HistoryContext = React.createContext();  //exporting context object
export class HistoryProvider extends Component {
state = {history: "some data"}
render() {
        return (
            <HistoryContext.Provider value={
            {   state: this.state,
                setHistory: (value) => this.setState({
                            history: value })}}>
            {this.props.children}   
            </HistoryContext.Provider>)
    }
}