import React from 'react'
import {derivative} from 'mathjs'
import { Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import axios from 'axios' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
let apiUrl = "http://localhost:4040/data/root/Newton_Raphson?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"


class Newton_Raphson extends React.Component{

    state = {
        Equation: "",
        X: '',
        ERROR: '',
        result: '',
        Chart: ''
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],X: data["x"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    getEquation = (e) => {
        this.setState({
            Equation: e.target.value,
        });
    };
    
    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

    getX = (e) => {
        this.setState({
            X: e.target.value,
        });
    };

    show_value = (e) =>{
      var table = document.getElementById("output");
      var n = 0;
        try {
            const Parser = require('expr-eval').Parser;
            let i = 1;
            let arr = [];
            let Equation = this.state.Equation;
            let Equation_def = derivative(Equation,"x").toString();
            // console.log(Equation_def);
            let X = this.state.X;
            X = parseFloat(X);
            let ERROR = this.state.ERROR;
            ERROR = parseFloat(ERROR);
            let chart = [];
            var expression_1 = Parser.parse(Equation);
            var expression_2 = Parser.parse(Equation_def);
            let X_new = X - (expression_1.evaluate({x : X})/expression_2.evaluate({x : X}));
            let error_ = Math.abs((X_new-X)/X);
            while(error_ > ERROR){
              n++;
              var row = table.insertRow(n);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              cell1.innerHTML =  n ;
              cell1.setAttribute("id", "cell");
              cell2.innerHTML =  X_new ;
              cell2.setAttribute("id", "cell");
              cell3.innerHTML =  ERROR ;
              cell3.setAttribute("id", "cell");
              cell4.innerHTML =   "";
              cell4.setAttribute("id", "cell");
              cell5.innerHTML =  "" ;
              cell5.setAttribute("id", "cell");
                X_new = X - (expression_1.evaluate({x : X})/expression_2.evaluate({x : X}));
                error_ = Math.abs((X_new-X)/X);
                X = X_new;
                let Y = expression_1.evaluate({ x: X_new })
                chart.push({data: X_new,y: Y});
                arr.push(<div className='result' key={i}>Iteration {i} : {X_new}</div>);
                i++;
                
            }
            this.setState({result: arr, Chart: chart})
        } catch(e) {
            this.setState({result : "No data"})
        }
    }
    render() {
        return (
          <div className="site-card-wrapper">
            <Row gutter={24}>
              <Col span={10}>
                <Card title="Newton Raphson" bordered={false}>
                  <form>
                    <p>Input Equal</p>
                    <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/></span>
                    <br />
                    <br />
                    <p>Number Start (X)</p>
                    <Input onChange={this.getX} className="Input_2"value={this.state.X}/>
                    <br />
                    <br />
                    <p>Numer Error (ERROR)</p>
                    <Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/>
                  </form>
                  <center>
                  <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                  <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                   &nbsp;&nbsp;
                    <br />
                    <br />
                  </center>
                </Card>
              </Col>
              <Col span={12}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}></LineChart>
              <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
              <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="data" />
                <YAxis />
            </LineChart>
          </ResponsiveContainer>
              </Col>
            </Row>
            <Row gutter={24}>
          <Col span={24}>
            <Card title="Output" bordered={false}>
              <table
                id="output"
                style={{ padding: "0px 8px" }}
                className="table table-hover"
              >
                <tbody>
                  <tr>
                    <th width="20%">Iteration</th>
                    <th width="25%">
                      X_new
                    </th>
                    <th width="25%">
                      Error
                    </th>
                    <th width="30%">
                     
                    </th>
                    <th width="30%"> </th>
                  </tr>
                  <tr className="list-data">
                    <td
                      width="20%"
                      id="Iteration"
                      style={{ textAlign: "center" }}
                    />
                    <td width="25%" id="xl1" />
                    <td width="25%" id="xr1" />
                    <td width="30%" id="x" />
                    <td width="30%" id="error" />
                  </tr>
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>
        <br />
        </div>
    );
  }
}
export default Newton_Raphson