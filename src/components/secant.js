import React from 'react'
import { Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import axios from 'axios' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let apiUrl = "http://localhost:4040/data/root/Secant?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"

class secant extends React.Component{

    state = {
        Equation: "",
        X_1: '',
        X_2: '',
        ERROR: '',
        result: '',
        Chart: ''
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],X_1: data["x1"],X_2: data["x2"],ERROR: data["error"]})

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
    
    getX = (e) => {
        this.setState({
            X_1: e.target.value,
        });
    };

    getX_2 = (e) => {
        this.setState({
            X_2: e.target.value,
        });
    };

    show_value = (e) =>{
      var table = document.getElementById("output");
      var n = 0;
        try{
            const Parser = require('expr-eval').Parser;

        let i = 1;
        let arr = [];

        let Equation = this.state.Equation;
        let X_1 = this.state.X_1;
        X_1 = parseFloat(X_1);
        let X_2 = this.state.X_2;
        X_2 = parseFloat(X_2);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);
        let Chart = [];

        var expression = Parser.parse(Equation);

        let d = X_1 - X_2;
        let Fan,Xnew;
        let err_ = 1;

        while(err_ > ERROR){
          n++;
            var row = table.insertRow(n);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML =  n ;
            cell1.setAttribute("id", "cell");
            cell2.innerHTML =  X_1 ;
            cell2.setAttribute("id", "cell");
            cell3.innerHTML =  X_2 ;
            cell3.setAttribute("id", "cell");
            cell4.innerHTML =   "";
            cell4.setAttribute("id", "cell");
            cell5.innerHTML =  "" ;
            cell5.setAttribute("id", "cell");
            X_2 = X_1 + d;
            Fan = - ((expression.evaluate({x: X_2})*(X_1-X_2))/(expression.evaluate({x: X_1})-expression.evaluate({x: X_2})))
            Xnew = X_2 + Fan;

            err_ = Math.abs((Xnew-X_1)/Xnew);
            arr.push(<div className='result' key={i}>Iteration {i} : {Xnew}</div>);
            X_1 = Xnew;
            i++;
        }

        for(i = parseFloat(this.state.X_1)-0.1;i <= parseFloat(this.state.X_1)+1;i=i+0.1){
            let P_X = expression.evaluate({ x: i })

            Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
        }

        this.setState({result: arr,Chart: Chart})
        } catch(e){
            this.setState({result : "No data"})
        }
        

    }

    render() {
        return (
          <div className="site-card-wrapper">
            <Row gutter={24}>
              <Col span={10}>
                <Card title="Secant" bordered={false}>
                  <form>
                    <p>Input Equal</p>
                    <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/></span>
                    <br />
                    <br />
                    <p>X1</p>
                    <Input onChange={this.getX} className="Input_2" value={this.state.X_1} />
                    <br />
                    <br />
                    <p>X2</p>
                    <span><Input onChange={this.getX_2} className="Input_2"  value={this.state.X_2}/></span>
                    <br />
                    <br />
                    <p>ERROR</p>
                    <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR} /></span>
                    <br />
                    <br />
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={ false } />
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
                <XAxis dataKey="x" />
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
                      X_1
                    </th>
                    <th width="25%">
                      X_2
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
export default secant