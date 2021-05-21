import React from 'react'
import '../css/Newton.css'

import {derivative} from 'mathjs'

import { Input } from 'antd';
import { Button } from 'antd';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import axios from 'axios'
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

    render(){
        return(
            <div className='allincompro'>
                <h2>Newton Raphson</h2>
                <div>
                <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                </div>
                <div>
                    <span className="Text_Input_2"> X เริ่มต้น : </span>
                    <span><Input onChange={this.getX} className="Input_2" value={this.state.X}/></span>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                </div>
                {this.state.result}
                <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    </LineChart>
            </div>
        )
    }
}

export default Newton_Raphson