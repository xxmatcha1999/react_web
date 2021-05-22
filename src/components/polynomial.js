import React from 'react'
import '../css/polynomial.css'
import { Input } from 'antd'
import { Button } from 'antd'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';


import axios from 'axios'
let apiUrl = "http://localhost:4040/data/interpolation/polynomial?key=45134Asd4864wadfad"

class Polynomial extends React.Component{

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
            this.setState({result : "Not Sync"})
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

    MakeMatrix = (e) => {
        let rows = this.state.rows;
        rows = parseInt(rows);
        let columns = 2;

        let wow = [];
        let i,j
        for(i= 0;i < rows;i++){
            for(j = 0; j < columns;j++){
                wow.push(<span className="Matrix"><input name={i.toString()+','+j.toString()} onChange={this.Getvalue} className="Matrix" style={{margin: '5px'}} value={this.state.Matrix[i][j]}/></span>)
            }
            wow.push(<div></div>)
        }
        return(wow);
    }

    Getvalue = (e) => {
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseFloat(arr[0])][parseFloat(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }

    GetX = (e) =>{
        let X = this.state.X;
        X = e.target.value;
        this.setState({X: X})
    }

    Calculate = (e) =>{

        var interpolatingPolynomial = require('interpolating-polynomial')

        let Matrix = this.state.Matrix;
        let rows = this.state.rows;
        rows = parseInt(rows);

        let X = this.state.X;
        X = parseFloat(X)
        let Chart = [];
        let i,f,Answer
        let max = parseFloat(Matrix[0][0]);
        let min = parseFloat(Matrix[0][0]);
        for(i = 0;i < rows;i++){
            Matrix[i][0] = parseFloat(Matrix[i][0]);
            if(Matrix[i][0] > max){
                max = Matrix[i][0];
            }
            if(Matrix[i][0] < min){
                min = Matrix[i][0];
            }
            Matrix[i][1] = parseFloat(Matrix[i][1]);
        }

        f = interpolatingPolynomial(Matrix);

        for(i = min;i <= max+0.5;i+=0.5){
            let y = f(i);
            Chart.push({x: i,y: y});
        }

        for(i = 0;i < Matrix.length ;i++){
            Chart.push({x: parseFloat(Matrix[i][0]),Ty: parseFloat(Matrix[i][1])});
        }

        Answer = f(X)

        this.setState({Answer: "f(x) : "+Answer.toString(),Chart: Chart,Y: Answer})
    }

    render(){
        return(
            <div >
                <h2 className="MakeButton">Newton interpolating</h2>
                <div className="MakeButton">
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add Point</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete Point</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className="MakeButton">
                    X : <input onChange={this.GetX}  className="Input_2" value={this.state.X} style={{margin: '5px' ,  width: 150}} width/>
                </div>
                <div className="Mid">{this.MakeMatrix()}</div>
                
                <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    {/* <Line type="monotone" dataKey="fx" stroke="#FF0000" /> */}
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <Line type="monotone" dataKey="Ty" stroke="#00FF00"/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" type="number" interval='preserveStart'/>
                    <YAxis />
                    <ReferenceLine x={parseFloat(this.state.X)} stroke="red" label={parseFloat(this.state.X)} />
                    <ReferenceLine y={parseFloat(this.state.Y)} label={parseFloat(this.state.Y)} stroke="red" />
                    </LineChart>
                    {this.state.Answer}
            </div>
        )
    }
}

export default Polynomial