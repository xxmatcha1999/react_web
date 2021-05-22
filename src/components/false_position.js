import React, { Component ,PureComponent } from "react";
import { Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import { create, all } from "mathjs";
import axios from 'axios' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Parser = require('expr-eval').Parser; 
let apiUrl = "http://localhost:4040/data/root/False_position?key=45134Asd4864wadfad"
//api

class False_position extends React.Component{
    
    state = {
        Equation: '',
        XL: '',
        XR: '',
        ERROR: '',
        result: '',
        Chart: ''
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
        var table = document.getElementById("output");
        var n = 0;
        try{
            const Parser = require('expr-eval').Parser; // ฟั่งชั้นแปลงสมการ
        let i;
        let arr = [];
        let err = 1;
        let Xnew;

        let Equation = this.state.Equation;
        let XL = this.state.XL;
        XL = parseFloat(XL);
        let XR = this.state.XR;
        XR = parseFloat(XR);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        let Chart = [];

        var expression = Parser.parse(Equation);

        let X = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))
        
        for(i = parseFloat(this.state.XL)-0.1;i <= parseFloat(this.state.XR)+0.1;i=i+0.1){
            let P_X = expression.evaluate({ x: i })

            Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
        }

        if(expression.evaluate({ x: X }) > 0){
            XR = X;
        }
        else{
            XL = X;
        }

        //(expression.evaluate({ x: X }) > 0) ? (XR = X) : (XL = X)
        i = 1;
        while(err > ERROR){
            n++;
            var row = table.insertRow(n);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            Xnew = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))

            if(expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })){
                XR = Xnew
            }
            else{
                XL = Xnew
            }
            cell1.innerHTML =  n ;
            cell1.setAttribute("id", "cell");
            cell2.innerHTML =  XL ;
            cell2.setAttribute("id", "cell");
            cell3.innerHTML =  XR ;
            cell3.setAttribute("id", "cell");
            cell4.innerHTML =   "";
            cell4.setAttribute("id", "cell");
            cell5.innerHTML =  "" ;
            cell5.setAttribute("id", "cell");

            //((expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })) > 0) ? (XR = Xnew) : (XL = Xnew)
            //arr.push(<div className='result' key={i}>Iteration {i} : {Xnew}</div>);
            err = Math.abs((Xnew-X)/Xnew);
            X = Xnew;
            i++;
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
                <Card title="False Position" bordered={false}>
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
                    {this.state.result}
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
             <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={false}/>
            <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
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
                      X<sub>L</sub>
                    </th>
                    <th width="25%">
                      X<sub>R</sub>
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
        {this.state.result}
        <br />
        </div>
    );
  }
}
export default False_position;