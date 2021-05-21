import React, { Component ,PureComponent } from "react";
import { Input, Button } from "antd";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import { create, all } from "mathjs";
import axios from 'axios' 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Parser = require('expr-eval').Parser; 
let apiUrl = "http://localhost:4040/data/root/One-point_iteration?key=45134Asd4864wadfad"
//api
class one_point extends React.Component{

    state = {
        Equation: '',
        X: '',
        ERROR: '',
        result: '',
        Chart: ''
      };

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
    
    getX = (e) => {
        this.setState({
            X: e.target.value,
        });
    };

    show_value = (e) =>{

        try {
            const Parser = require('expr-eval').Parser;

        let i = 1;
        let arr = [];

        let Equation = this.state.Equation;
        let X = this.state.X;
        X = parseFloat(X);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        var expression = Parser.parse(Equation);

        let x1,error_1;
        let err = 99999999;
        
        let chart = [];

        while(err > ERROR){
            x1 = expression.evaluate({ x: X })
            error_1 = Math.abs((x1-X)/x1)

            if(err === error_1){
                break;
            }
            let Y = expression.evaluate({ x: x1 })
            chart.push({data: x1,y: Y});
            arr.push(<div className='result' key={i}>Iteration {i} : {x1}</div>);
            i++;

            err = error_1;
            X = x1;
        }
        if(arr.length === 0){
            this.setState({result: 'Is Diverge'})
        }
        else{
            this.setState({result: arr,Chart: chart})
        }
        } catch(e){
            this.setState({result : "No data"})
        }

        
    }

    render() {
        return (
          <div className="site-card-wrapper">
            <Row gutter={24}>
              <Col span={10}>
                <Card title="One Point" bordered={false}>
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
            {this.state.result}
            <br />
            </div>
        );
      }
    }
export default one_point;