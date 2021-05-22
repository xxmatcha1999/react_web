import React from 'react'

import '../css/regression.css'

import { Input } from 'antd'

import {Matrix2Input} from './Matrix'
import regression from 'regression';
import { Button } from 'antd'

import { ComposedChart, Line ,XAxis , YAxis, CartesianGrid, Scatter, ReferenceLine} from 'recharts';

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/interpolation/Linear_regression?key=45134Asd4864wadfad"

class Linear extends React.Component{

    
    state = {
        rows: 2,
        Matrix: [[],[]],
        X: 0,
        Answer: '',
        Chart: '',
        Y: ''
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            let row = data["row"];

            if(row > parseInt(this.state.rows)){
                let r = parseInt(this.state.rows);
                for(let i = r;i < row;i++){
                    this.AddMatrix();
                }
            }
            else{
                let r = parseInt(this.state.rows);
                for(let i = r;i > row;i--){
                    this.DelMatrix();
                }
            }
                
            this.setState({Matrix: data["Matrix"],X: data["X"]})

          } catch (error) {
            this.setState({Answer : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    AddMatrix = (e) =>{
        let Matrix = this.state.Matrix;
        Matrix.push([]);
        this.setState({Matrix: Matrix})
        this.setState({rows: this.state.rows+1})
    }

    DelMatrix = (e) =>{
        if(this.state.rows > 2){
            this.setState({rows: this.state.rows-1})
            let Matrix = this.state.Matrix;
            Matrix.pop();
            this.setState({Matrix: Matrix})
        }
    }

    Input = (e) =>{
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseInt(arr[0])][parseInt(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }

    GetX = (e) =>{
        let X = this.state.X;
        X = e.target.value;
        this.setState({X: X})
    }

    Calculate = (e) =>{
        let Matrix = this.state.Matrix;
        let data = [];
        let Chart = [];
        
        for(let i =0;i < Matrix.length;i++){
            data.push([parseInt(Matrix[i][0]),parseInt(Matrix[i][1])])
        }

        let result = regression.linear(data);
        let a1 = parseFloat(result.equation[0]);
        let a0 = parseFloat(result.equation[1]);
        for(let i = 0;i < Matrix.length;i++){
            let y = a0+(a1*parseFloat(Matrix[i][0]));
            Chart.push({x: parseFloat(Matrix[i][0]),y: y,trueY: parseFloat(Matrix[i][1])});
        }
        this.setState({Answer: a0+(a1*parseFloat(this.state.X)),Chart: Chart,Y:a0+(a1*parseFloat(this.state.X))})
    }

    render(){
        return(
            <div >
                <h2 className="MakeButton">Linear regression</h2>
                <div  className="MakeButton">
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add Point</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete Point</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className="MakeButton">
                    X :  <span><input onChange={this.GetX} value={this.state.X} className="Input_2"/></span>
                </div>
                
                <div className="Mid"><Matrix2Input  row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/></div>
                
                <ComposedChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <XAxis dataKey="x" type="number" />
                    <YAxis />
                    <Scatter name="x" dataKey="trueY" fill="#FFB700" />
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <ReferenceLine x={parseFloat(this.state.X)} stroke="red" label={parseFloat(this.state.X)} />
                    <ReferenceLine y={parseFloat(this.state.Y)} label={parseFloat(this.state.Y)} stroke="red" />

                    </ComposedChart>
                    <div className="MakeButton">{this.state.Answer}</div>
            </div>
        )
    }
}

export default Linear;