import React, { useEffect, useContext } from 'react'
import { HistoryContext } from '../Contexts/history.context';
import axios from 'axios';
import URL from '../config';


function History(props) {

    const historyContext = useContext(HistoryContext);

    const getHistory = () => {
        axios.get(`${URL}/items`)
              .then((res) => {
                  console.log(res)
                //   setData(res.data);
                  historyContext.setHistory(res.data);
              })
              .catch((error) => {
                  console.log(error)
                  alert("Invalid inputs")
              })
    }


    useEffect(() => {
        getHistory();
    }, []);

    return (
        <div className="wrapper" >
            <div>
                <table style={{color:'white'}} className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">InputType</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyContext.state.history.map(item => (
                            <tr>
                                <td>{item.type}</td>
                                <td>{item.inputType}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default History;