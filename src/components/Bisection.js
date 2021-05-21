import React, { Component ,PureComponent } from "react";
import { Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import { create, all } from "mathjs";
import axios from 'axios' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Parser = require('expr-eval').Parser; 
let apiUrl = "http://localhost:4040/data/root/Bisection?key=45134Asd4864wadfad"
//api

const math = create(all);

function bisection_cal( in_xl, in_xr, in_err,in_equa) {

  let arr = [];

  let Equation = in_equa;
  let XL = in_xl;
  XL = parseFloat(XL);
  let XR = in_xr;
  XR = parseFloat(XR);
  let ERROR = in_err;
  ERROR = parseFloat(ERROR);

  let Xmid = (XL+XR)/2;
  let XM = 0;
  let errer_sum = 1;

  var expression = Parser.parse(Equation);
  let result = expression.evaluate({ x: Xmid }) * expression.evaluate({ x: XR });

  (result < 0) ? (XL = Xmid) : XR = Xmid;

      while(errer_sum > ERROR){
          XM = (XL+XR)/2;
          result = expression.evaluate({ x: XM }) * expression.evaluate({ x: XR });
          (result < 0) ? (XL = XM) : (XR = XM);
          errer_sum = Math.abs((XM-Xmid)/XM);
          Xmid = XM;
          arr.push([XL,XR,XM,errer_sum]);
      }
      return arr;
}
class Bisection extends React.Component {
  state = {
    Equation: '',
    XL: '',
    XR: '',
    ERROR: '',
    result: '',
  };
  
async gatdata() { // ฟังชั้นเรียก api
    try {

        const data = await axios.post(apiUrl).then(e => (
            e.data
        ))
        
        this.setState({Equation: data["eqtion"],XL: data["xl"],XR: data["xr"],ERROR: data["error"]})

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

getXL = (e) => {
    this.setState({
        XL: e.target.value,
    });
};

getXR = (e) => {
    this.setState({
        XR: e.target.value,
    });
};

getERR= (e) => {
    this.setState({
        ERROR: e.target.value,
    });
};

show_value = (e) =>{
  try{
      const Parser = require('expr-eval').Parser;
      let Equation = this.state.Equation;

      var expression = Parser.parse(Equation);

      let data = bisection_cal(this.state.XL,this.state.XR,this.state.ERROR,this.state.Equation);
      let i;
      let arr = [];
      let Chart = [];
      for(i = 0; i < data.length;i++){
          arr.push(<div className='result' key={i}>Iteration {i+1} : {data[i][1]}</div>);
      }

      for(i = parseFloat(this.state.XL)-0.1;i <= parseFloat(this.state.XR)+0.1;i=i+0.1){
          let P_X = expression.evaluate({ x: i })
        
          Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
      }

      this.setState({result: arr ,Chart: Chart});

  } catch(error) {
      this.setState({result : "No data"})
  }
  
}
  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={10}>
            <Card title="Bisection" bordered={false}>
              <form>
                <p>Input Equal</p>
                <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation} /></span>
                <br />
                <br />
                <p>Number Start (XL)</p>
                <Input onChange={this.getXL} className="Input_2" value={this.state.XL}/>
                <br />
                <br />
                <p>Numer End (XR)</p>
                <Input onChange={this.getXR} className="Input_2"  value={this.state.XR} />
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}></LineChart>
          <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={ false } />
          <Line type="monotone" dataKey="y" stroke="#0000FF" dot={ false } />
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
                  <tr style={{ textAlign: "center" }}>
                    <th width="20%">Iteration</th>
                    <th width="25%">
                      X<sub>L</sub>
                    </th>
                    <th width="25%">
                      X<sub>R</sub>
                    </th>
                    <th width="30%">
                      X<sub>M</sub>
                    </th>
                    <th width="30%">Error</th>
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
        {this.state.result}
        <br />
        </div>
    );
  }
}
export default Bisection;