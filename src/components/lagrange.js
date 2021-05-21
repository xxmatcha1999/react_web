import React from 'react'
import { Input } from 'antd'
import { Button } from 'antd'
import {Matrix2Input} from './Matrix'
import Lagranges from './lagranges'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
import '../css/lagrange.css'
import axios from 'axios'
let apiUrl = "http://localhost:4040/data/interpolation/lagrange_interpolation?key=45134Asd4864wadfad"

class Lagrange extends React.Component{

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
        let Matrix = this.state.Matrix
        let wow = new Lagranges(parseFloat(Matrix[0][0]), parseFloat(Matrix[0][1]), parseFloat(Matrix[1][0]), parseFloat(Matrix[1][1]));
        let index;
        let mid = (Matrix[0][0]+Matrix[1][0])/2;
        let Chart = [];
        for(let i = 2;i < Matrix.length;i++){
            index = wow.addPoint(parseFloat(Matrix[i][0]), parseFloat(Matrix[i][1]));
        }

        for(let i = Matrix[0][0];i <= Matrix[Matrix.length-1][0]+mid;i+=mid){
            let y = wow.valueOf(i);
            Chart.push({x: i,y: y});
        }

        this.setState({Answer : wow.valueOf(parseFloat(this.state.X)),Chart: Chart,Y: wow.valueOf(parseFloat(this.state.X))})

    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Lagrange interpolation</h2>
                <div>
                    <Button className='Button_' type="primary" onClick={this.AddMatrix}>Add Point</Button>
                    <Button className='Button_' type="primary" onClick={this.DelMatrix}>Delete Point</Button>
                    <Button className='Button_' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <span className="Text_Input_2"> X value : </span>
                <span><Input value={this.state.X} onChange={this.GetX} className="Input_2"/></span>
                <Matrix2Input row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.Answer}</div>
                <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" type="number" interval='preserveStart'/>
                    <YAxis />
                    <ReferenceLine x={parseFloat(this.state.X)} stroke="red" label={parseFloat(this.state.X)} />
                    <ReferenceLine y={parseFloat(this.state.Y)} label={parseFloat(this.state.Y)} stroke="red" />
                    </LineChart>
            </div>
        )
    }
}
export default Lagrange;